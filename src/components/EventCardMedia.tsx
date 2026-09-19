import { youtubeBackgroundSrc } from "@/content/hero";

export function EventCardMedia({
  title,
  image,
  videoUrl,
  youtubeEmbedUrl,
  className = "aspect-[16/10]",
  interactive = false,
}: {
  title: string;
  image?: string;
  videoUrl?: string;
  youtubeEmbedUrl?: string;
  className?: string;
  interactive?: boolean;
}) {
  if (youtubeEmbedUrl) {
    return (
      <div className={`relative overflow-hidden bg-navy ${className}`}>
        <iframe
          src={interactive ? youtubeEmbedUrl : youtubeBackgroundSrc(youtubeEmbedUrl)}
          title={title}
          className={
            interactive
              ? "size-full border-0"
              : "pointer-events-none absolute top-1/2 left-1/2 aspect-video min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 scale-125 border-0"
          }
          allow={
            interactive
              ? "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              : "autoplay; encrypted-media; picture-in-picture"
          }
          allowFullScreen={interactive}
        />
      </div>
    );
  }

  if (videoUrl) {
    return (
      <div className={`relative overflow-hidden bg-navy ${className}`}>
        <video
          className={interactive ? "size-full object-cover" : "absolute inset-0 size-full object-cover"}
          src={videoUrl}
          autoPlay={!interactive}
          muted={!interactive}
          loop={!interactive}
          controls={interactive}
          playsInline
          aria-label={title}
        />
      </div>
    );
  }

  if (!image) return null;

  return (
    <img
      src={image}
      alt=""
      width={interactive ? 1200 : 800}
      height={interactive ? 675 : 500}
      loading={interactive ? "eager" : "lazy"}
      decoding="async"
      className={interactive ? `w-full object-cover ${className}` : `card-zoom-img w-full object-cover ${className}`}
    />
  );
}
