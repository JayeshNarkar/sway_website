import { Image } from "@/lib/prisma";

function getCloudinaryImageUrl(
  image: Image,
  cldName: string,
  productDisplayImage?: boolean
): string {
  const baseUrl = `https://res.cloudinary.com/${cldName}/image/upload`;

  let transformations = productDisplayImage ? "" : "q_auto,f_auto";

  if (image.bgRemoval) {
    transformations += (transformations ? "," : "") + "e_background_removal";
  }

  const path = transformations ? `${transformations}/${image.url}` : image.url;

  const imageUrl = `${baseUrl}/${path}`;

  return imageUrl;
}

export default getCloudinaryImageUrl;
