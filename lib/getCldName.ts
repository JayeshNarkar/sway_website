function getCldName() {
  return process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string;
}
export default getCldName;
