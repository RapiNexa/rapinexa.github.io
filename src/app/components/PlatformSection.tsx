import type { CSSProperties } from "react";
import { PLATFORM_SECTION, PLATFORMS, SECTION_IDS, type Platform } from "src/data/content";

/**
 * Platform section: a simple, responsive grid of monochrome Platform logos
 * (icon + name), sourced entirely from `PLATFORMS` in the content layer.
 * Adding or removing an entry there changes the rendered tiles with no
 * change to this component. See `.platform-tile` in app.css for the
 * text-colour → brandColor hover treatment.
 */
export default function PlatformSection() {
  return (
    <section
      id={SECTION_IDS.platform}
      className="mx-auto w-full"
      style={{ maxWidth: 1080, padding: "80px 20px" }}
    >
      <div className="text-center" style={{ marginBottom: 40 }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(24px,4vw,36px)",
            color: "var(--text)",
            margin: 0,
          }}
        >
          {PLATFORM_SECTION.heading}
        </h2>
        {PLATFORM_SECTION.subheading ? (
          <p
            className="mx-auto"
            style={{
              maxWidth: 520,
              marginTop: 12,
              color: "var(--muted)",
              fontSize: 15,
              lineHeight: 1.6,
            }}
          >
            {PLATFORM_SECTION.subheading}
          </p>
        ) : null}
      </div>

      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
          gap: 16,
          margin: 0,
          padding: 0,
        }}
      >
        {PLATFORMS.map((platform) => (
          <PlatformTile key={platform.id} platform={platform} />
        ))}
      </ul>
    </section>
  );
}

function PlatformTile({ platform }: { platform: Platform }) {
  const Icon = platform.icon;
  const tileStyle = {
    "--platform-brand": platform.brandColor ?? "var(--accent)",
  } as CSSProperties;

  return (
    <li className="platform-tile" style={tileStyle}>
      {Icon ? (
        <>
          <Icon aria-hidden="true" size={32} />
          <span className="platform-tile__name">{platform.name}</span>
        </>
      ) : (
        <span className="platform-tile__name platform-tile__name--fallback">
          {platform.name}
        </span>
      )}
    </li>
  );
}
