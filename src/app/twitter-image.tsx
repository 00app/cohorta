import { seo } from "@/content/site";
import { renderShareImage } from "@/lib/share-image";

export const alt = seo.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return renderShareImage();
}
