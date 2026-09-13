import type { PageHeroMedia } from "@/content/hero";
import { youtubeEmbedUrlFromLink } from "@/content/hero";

export type ApiHeroMedia = {
  media_type?: string | null;
  video_source?: string | null;
  video_url?: string | null;
  youtube_url?: string | null;
  youtube_embed_url?: string | null;
};

export function mapHeroMedia(hero: ApiHeroMedia | null | undefined): PageHeroMedia {
  if (hero?.media_type !== "video") return {};

  if (hero.video_source === "youtube" || hero.youtube_embed_url || hero.youtube_url) {
    const youtubeEmbedUrl = hero.youtube_embed_url?.trim() || youtubeEmbedUrlFromLink(hero.youtube_url);
    return youtubeEmbedUrl ? { youtubeEmbedUrl } : {};
  }

  const videoUrl = hero.video_url?.trim();
  return videoUrl ? { videoUrl } : {};
}
