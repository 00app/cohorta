import { ImageResponse } from "next/og";
import { seo } from "@/content/site";

// Shared by opengraph-image.tsx and twitter-image.tsx — both need their
// own default export per Next's file convention, but there's no reason
// to build the card twice. Plain colour fills and text only (no embedded
// SVG paths, no external image fetch): Satori, the renderer behind
// ImageResponse, is most reliable with exactly that, and this doesn't
// need the icon mark to read as a share-card at a glance.
export function renderShareImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f1dbd0",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 96,
            color: "#241b16",
            fontWeight: 600,
          }}
        >
          cohorta.
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 36,
            color: "#6e1d17",
            letterSpacing: -0.5,
          }}
        >
          {seo.defaultTitle.replace("Cohorta — ", "")}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
