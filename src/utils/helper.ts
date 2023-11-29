import enviroment from "../enviroment";

export function isYouTubeURI(uri: string): boolean {
  return uri.includes("youtube");
}

export function getYouTubeEmbedURI(id: string): string {
  return `https://www.youtube.com/embed/${id}`;
}

export function getCloudinaryTransformedURI(uri: string): string {
  return `https://player.cloudinary.com/embed/?cloud_name=${enviroment.cloudinary_cloud_name}=&public_id=${uri}`;
}
