import clsx from "clsx";
import type { CSSProperties } from "react";
import { getPlatformsByIds, PLATFORM_SECTION, SECTION_IDS, type Platform } from "src/data/content";
import type { BaseProps } from "src/types/utilities";
import SectionHeader from "./SectionHeader";

/**
 * Teknologi: Platform logos (icon + name) grouped by purpose, sourced from
 * `PLATFORM_SECTION.groups` in the content layer. See `.platform-tile` in
 * app.css for the text-colour → brandColor hover treatment.
 */
export default function PlatformSection() {
  return (
    <section
      id={SECTION_IDS.platform}
      className="mx-auto w-full"
      style={{ maxWidth: 1080, padding: "80px 20px 40px" }}
    >
      <SectionHeader content={PLATFORM_SECTION} />

      <div className="grid gap-5 sm:grid-cols-2">
        {PLATFORM_SECTION.groups.map((group) => (
          <div
            key={group.title}
            style={{
              border: "1px solid var(--border)",
              background: "var(--surface)",
              borderRadius: 18,
              padding: "20px 22px 22px",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 16.5,
                color: "var(--text)",
                margin: "0 0 14px",
              }}
            >
              {group.title}
            </h3>
            <ul className="flex flex-wrap gap-3" style={{ margin: 0, padding: 0 }}>
              {getPlatformsByIds(group.platformIds).map((platform) => (
                <PlatformTile key={platform.id} className="w-24 min-h-20"platform={platform} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function PlatformTile({ className, platform }: BaseProps & { platform: Platform }) {
  const Icon = platform.icon;
  const tileStyle = {
    "--platform-brand": platform.brandColor ?? "var(--accent)",
    padding: "14px 8px",
  } as CSSProperties;

  return (
    <li className={clsx("platform-tile", className)} style={tileStyle}>
      {Icon ? (
        <>
          <Icon aria-hidden="true" size={26} />
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
