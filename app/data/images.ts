const basePath = process.env.VERCEL === '1' ? '' : '/kb-Yusuf-furniture-';

export const furnitureImages = Array.from(
  { length: 56 },
  (_, index) => `${basePath}/images/furniture-${String(index + 1).padStart(2, '0')}.jpg`,
);

export const furnitureImage = (index: number) =>
  furnitureImages[(index - 1) % furnitureImages.length];
