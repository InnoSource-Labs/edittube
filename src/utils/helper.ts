import enviroment from "../enviroment";

export function isYouTubeURI(uri: string): boolean {
  return uri.includes("youtube");
}

export function getCloudinaryTransformedURI(uri: string): string {
  return `https://player.cloudinary.com/embed/?cloud_name=${enviroment.cloudinary_cloud_name}=&public_id=${uri}&cloudinary%5Bcname%5D=myCname&player%5Bloop%5D=true&source%5Bsource_types%5D%5B0%5D=mp4%2Fh265&source%5Bsource_types%5D%5B1%5D=mp4&source%5Btransformation%5D%5B1%5D%5Bquality%5D=auto`;
}
