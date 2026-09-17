/**
 * One-off dev tool (ticket 08 — branding assets) that derives every served
 * brand/icon/OG asset from the single source mark at
 * `public/assets/brand/rapinexa-mark.png` (ticket 07's transparent mark).
 *
 * Run with: node scripts/generate-brand-assets.mjs
 *
 * Uses `sharp` (devDependency only — never shipped in the production build)
 * to resize/convert images. `sharp` can rasterize PNG/WebP but has no native
 * `.ico` writer, so this script hand-rolls a minimal ICO container around a
 * single embedded 32x32 PNG image (the "PNG-in-ICO" format), which every
 * modern browser and OS accepts.
 *
 * Re-run this script whenever the source mark at
 * `public/assets/brand/rapinexa-mark.png` is replaced.
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const publicDir = path.join(repoRoot, "public");
const brandDir = path.join(publicDir, "assets", "brand");

const SOURCE_MARK = path.join(brandDir, "rapinexa-mark.png");

const DARK_BG = "#08080d";
const GOLD = "#d8b36a";

/**
 * Hand-rolls a single-image ICO file wrapping a PNG payload ("PNG-in-ICO").
 * Format: 6-byte ICONDIR header, one 16-byte ICONDIRENTRY, then the raw PNG
 * bytes. All modern browsers/OSes accept PNG-format ICO entries.
 */
function buildIcoFromPng(pngBuffer, size) {
  const headerSize = 6;
  const entrySize = 16;
  const dataOffset = headerSize + entrySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = icon
  header.writeUInt16LE(1, 4); // number of images

  const entry = Buffer.alloc(entrySize);
  entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 = 256)
  entry.writeUInt8(size >= 256 ? 0 : size, 1); // height (0 = 256)
  entry.writeUInt8(0, 2); // color palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(pngBuffer.length, 8); // image data size
  entry.writeUInt32LE(dataOffset, 12); // offset of image data

  return Buffer.concat([header, entry, pngBuffer]);
}

async function main() {
  console.log(`Reading source mark: ${SOURCE_MARK}`);
  const sourceBuffer = await readFile(SOURCE_MARK);
  const sourceMeta = await sharp(sourceBuffer).metadata();
  console.log(`Source mark: ${sourceMeta.width}x${sourceMeta.height}, alpha=${sourceMeta.hasAlpha}`);

  // 1) Served mark, resized to <=512x512, both PNG and WebP, alpha preserved.
  const markPngPath = path.join(brandDir, "rapinexa-mark.png");
  const markWebpPath = path.join(brandDir, "rapinexa-mark.webp");

  const resizedMark = sharp(sourceBuffer).resize(512, 512, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });

  const markPngBuffer = await resizedMark.clone().png({ compressionLevel: 9 }).toBuffer();
  await writeFile(markPngPath, markPngBuffer);
  console.log(`Wrote ${path.relative(repoRoot, markPngPath)}`);

  const markWebpBuffer = await resizedMark.clone().webp({ quality: 90, alphaQuality: 100 }).toBuffer();
  await writeFile(markWebpPath, markWebpBuffer);
  console.log(`Wrote ${path.relative(repoRoot, markWebpPath)}`);

  // 2) Apple touch icon: 180x180, opaque dark background behind the mark
  //    (Apple recommends an opaque icon; the dark brand bg keeps it legible
  //    on both light and dark iOS home screens).
  const appleTouchIconPath = path.join(publicDir, "apple-touch-icon.png");
  const appleTouchIconBuffer = await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: DARK_BG,
    },
  })
    .composite([
      {
        input: await sharp(sourceBuffer).resize(148, 148, { fit: "contain" }).toBuffer(),
        gravity: "center",
      },
    ])
    .png()
    .toBuffer();
  await writeFile(appleTouchIconPath, appleTouchIconBuffer);
  console.log(`Wrote ${path.relative(repoRoot, appleTouchIconPath)}`);

  // 3) 512x512 transparent web-app icon.
  const icon512Path = path.join(publicDir, "icon-512.png");
  const icon512Buffer = await sharp(sourceBuffer)
    .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toBuffer();
  await writeFile(icon512Path, icon512Buffer);
  console.log(`Wrote ${path.relative(repoRoot, icon512Path)}`);

  // 4) favicon: 32x32 PNG packed into a hand-rolled ICO container.
  const favicon32Buffer = await sharp(sourceBuffer)
    .resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const icoBuffer = buildIcoFromPng(favicon32Buffer, 32);
  const faviconPath = path.join(publicDir, "favicon.ico");
  await writeFile(faviconPath, icoBuffer);
  console.log(`Wrote ${path.relative(repoRoot, faviconPath)}`);

  // 5) 1200x630 Open Graph image: dark bg, mark centered-left, wordmark text
  //    in gold to the right, display/sans-serif font stack.
  const ogWidth = 1200;
  const ogHeight = 630;
  const ogMarkSize = 340;
  const ogMarkX = 120;
  const ogMarkY = Math.round((ogHeight - ogMarkSize) / 2);

  const ogMarkBuffer = await sharp(sourceBuffer)
    .resize(ogMarkSize, ogMarkSize, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const ogMarkDataUri = `data:image/png;base64,${ogMarkBuffer.toString("base64")}`;

  const textX = ogMarkX + ogMarkSize + 60;
  const svg = `
    <svg width="${ogWidth}" height="${ogHeight}" viewBox="0 0 ${ogWidth} ${ogHeight}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${ogWidth}" height="${ogHeight}" fill="${DARK_BG}" />
      <image x="${ogMarkX}" y="${ogMarkY}" width="${ogMarkSize}" height="${ogMarkSize}" href="${ogMarkDataUri}" />
      <text x="${textX}" y="${ogHeight / 2}" dominant-baseline="middle" text-anchor="start"
        font-family="'Space Grotesk', Arial, sans-serif" font-weight="700" font-size="96" fill="${GOLD}">RapiNexa</text>
    </svg>
  `;

  const ogImagePath = path.join(brandDir, "og-image.png");
  const ogImageBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  await writeFile(ogImagePath, ogImageBuffer);
  console.log(`Wrote ${path.relative(repoRoot, ogImagePath)}`);

  // Sanity-check dimensions of everything produced.
  const checks = [
    [markPngPath, 512, 512],
    [markWebpPath, 512, 512],
    [appleTouchIconPath, 180, 180],
    [icon512Path, 512, 512],
    [ogImagePath, 1200, 630],
  ];
  for (const [filePath, expectedW, expectedH] of checks) {
    const meta = await sharp(filePath).metadata();
    const ok = meta.width === expectedW && meta.height === expectedH;
    console.log(
      `${ok ? "OK" : "MISMATCH"}: ${path.relative(repoRoot, filePath)} -> ${meta.width}x${meta.height} (expected ${expectedW}x${expectedH})`,
    );
    if (!ok) process.exitCode = 1;
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
