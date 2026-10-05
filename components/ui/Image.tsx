import NextImage, { type ImageProps } from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// next/image does not apply `basePath` to string sources, so local paths are prefixed here.
export default function Image({ src, ...props }: ImageProps) {
  const resolved =
    typeof src === "string" && src.startsWith("/") ? `${basePath}${src}` : src;
  return <NextImage src={resolved} {...props} />;
}
