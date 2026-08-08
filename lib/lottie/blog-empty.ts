export const BLOG_EMPTY_LOTTIE_ANIMATIONS = {
  createWeb: "/lottie/create-web.json",
  websiteBuilding: "/lottie/website-building.json",
} as const;

export type BlogEmptyLottieKey = keyof typeof BLOG_EMPTY_LOTTIE_ANIMATIONS;

/** Cambia esta clave para elegir la animación cuando el blog no tiene entradas. */
export const BLOG_EMPTY_LOTTIE: BlogEmptyLottieKey = "websiteBuilding";

export function getBlogEmptyLottieSrc(): string {
  return BLOG_EMPTY_LOTTIE_ANIMATIONS[BLOG_EMPTY_LOTTIE];
}
