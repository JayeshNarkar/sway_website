import { Image } from "@/lib/prisma";

function getCloudinaryImageUrl(image: Image, cldName: string): string {
  const baseUrl = `https://res.cloudinary.com/${cldName}/image/upload`;

  let transformations = "q_auto,f_auto";

  if (image.bgRemoval) {
    transformations += ",e_background_removal";
  }

  const imageUrl = `${baseUrl}/${transformations}/${image.url}`;

  return imageUrl;
}
export default getCloudinaryImageUrl;
