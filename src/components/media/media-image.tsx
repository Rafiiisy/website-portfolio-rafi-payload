type MediaValue =
  | string
  | {
      url?: string | null;
      alt?: string | null;
      filename?: string | null;
    }
  | null
  | undefined;

type MediaImageProps = {
  media: MediaValue;
  alt?: string | null;
  className?: string;
  loading?: "lazy" | "eager";
};

export function getMediaUrl(media: MediaValue) {
  if (!media) return "";
  if (typeof media === "string") return media;
  return media.url || "";
}

export function getMediaAlt(media: MediaValue, fallback = "") {
  if (!media || typeof media === "string") return fallback;
  return media.alt || fallback;
}

export function MediaImage({ media, alt, className, loading }: MediaImageProps) {
  const src = getMediaUrl(media);
  if (!src) return null;

  const cls = ["media-img", className].filter(Boolean).join(" ");

  return (
    <img
      src={src}
      alt={alt || getMediaAlt(media)}
      className={cls}
      loading={loading ?? "lazy"}
      decoding="async"
    />
  );
}
