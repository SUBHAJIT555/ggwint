export type ImageSource = string | { src: string };

export function toSrc(image: ImageSource): string {
  return typeof image === "string" ? image : image.src;
}
