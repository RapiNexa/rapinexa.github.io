import { useCallback, useEffect, useRef, useState } from "react";
import PhotoSwipe from "photoswipe";
import "photoswipe/dist/photoswipe.css";
import clsx from "clsx";
import type { BaseProps } from "src/types/utilities";

type WorkGalleryProps = BaseProps & {
  /** Image paths for this Work; empty/absent renders the `initials` placeholder. */
  screenshots?: string[];
  /** Used in alt text and the PhotoSwipe caption context. */
  clientName: string;
  /** Placeholder shown when there are no screenshots, e.g. "DJ". */
  initials: string;
};

type ImageSize = { w: number; h: number };

/**
 * A Work's screenshot gallery (ticket 06): tapping any screenshot opens a
 * PhotoSwipe lightbox at that index, swiping moves between the same Work's
 * screenshots, and closing returns to the page. Renders an initials
 * placeholder instead of a broken image when `screenshots` is empty — the
 * generic case future Works without images yet rely on — so this component
 * never assumes a Work has at least one screenshot.
 *
 * Ported from `docs/reactjs/src/app/components/ScreenshotGallery.tsx`,
 * dropped the embla-carousel-react swipeable preview (per spec: that
 * dependency isn't ported) in favour of a static cover + thumbnail strip;
 * PhotoSwipe alone provides the swipe-between-screenshots interaction once
 * open.
 */
export default function WorkGallery({
  className,
  screenshots = [],
  clientName,
  initials,
  ...props
}: WorkGalleryProps) {
  const [imageSizes, setImageSizes] = useState<Record<string, ImageSize>>({});
  const sizesRef = useRef(imageSizes);
  sizesRef.current = imageSizes;

  // Preload images to measure their natural dimensions, so PhotoSwipe can
  // size the lightbox correctly instead of guessing.
  useEffect(() => {
    screenshots.forEach((src) => {
      if (imageSizes[src]) return;
      const img = new Image();
      img.onload = () => {
        setImageSizes((prev) => ({
          ...prev,
          [src]: { w: img.naturalWidth, h: img.naturalHeight },
        }));
      };
      img.src = src;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenshots]);

  const openPhotoSwipe = useCallback(
    (index: number) => {
      const sizes = sizesRef.current;
      const pswp = new PhotoSwipe({
        dataSource: screenshots.map((src) => {
          const size = sizes[src];
          // All current Works ship 1440x1024 framed mockups; this default
          // only covers the brief gap before an image finishes preloading.
          return { src, w: size?.w ?? 1440, h: size?.h ?? 1024 };
        }),
        index,
        bgOpacity: 0.92,
        closeOnVerticalDrag: true,
        showHideAnimationType: "fade",
      });
      pswp.init();
    },
    [screenshots],
  );

  if (screenshots.length === 0) {
    return (
      <div
        className={clsx("relative flex items-center justify-center overflow-hidden", className)}
        style={{
          aspectRatio: "16/10",
          background: "linear-gradient(135deg, var(--bg2), var(--bg))",
        }}
        {...props}
      >
        <span
          aria-hidden="true"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 40,
            letterSpacing: 1,
            color: "var(--accent-text)",
            opacity: 0.85,
          }}
        >
          {initials}
        </span>
      </div>
    );
  }

  return (
    <div className={clsx("relative w-full", className)} {...props}>
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: "16/10",
          background: "linear-gradient(135deg, var(--bg2), var(--bg))",
        }}
      >
        <img
          src={screenshots[0]}
          alt={`Tangkapan layar ${clientName} 1`}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => openPhotoSwipe(0)}
        />
        {screenshots.length > 1 ? (
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
              padding: "3px 9px",
              borderRadius: 999,
              background: "rgba(0,0,0,0.55)",
              color: "#fff",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: 0.5,
            }}
          >
            +{screenshots.length - 1}
          </span>
        ) : null}
      </div>

      {screenshots.length > 1 ? (
        <div
          className="flex"
          style={{ gap: 8, marginTop: 8, padding: "0 2px", overflowX: "auto" }}
        >
          {screenshots.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Lihat tangkapan layar ${clientName} ${i + 1}`}
              onClick={() => openPhotoSwipe(i)}
              style={{
                flex: "0 0 auto",
                width: 64,
                height: 46,
                padding: 0,
                border: "1px solid var(--border)",
                borderRadius: 8,
                overflow: "hidden",
                cursor: "pointer",
                background: "none",
              }}
            >
              <img
                src={src}
                alt={`Tangkapan layar ${clientName} ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
