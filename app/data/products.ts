import { furnitureImage } from './images';

export type Product = {
  slug: string;
  name: string;
  category: string;
  image: string;
  tag: string;
  desc: string;
};

export const products: Product[] = [
  { slug:'luna-boucle-sofa', name:'Luna Bouclé Sofa', category:'Living', image:furnitureImage(18), tag:'Bestseller', desc:'A generous, softly sculpted sofa designed for slow afternoons and long evenings.' },
  { slug:'atelier-dining-collection', name:'Atelier Dining Collection', category:'Dining', image:furnitureImage(19), tag:'New', desc:'Warm timber, elegant proportions and a table made for gathering.' },
  { slug:'noir-bedroom-suite', name:'Noir Bedroom Suite', category:'Bedroom', image:furnitureImage(20), tag:'Signature', desc:'A calm bedroom composition with tactile layers and architectural presence.' },
  { slug:'atelier-lounge-chair', name:'Atelier Lounge Chair', category:'Living', image:furnitureImage(21), tag:'Edit', desc:'Curved comfort with a quiet sculptural silhouette.' },
  { slug:'milo-console', name:'Milo Stone Console', category:'Objects', image:furnitureImage(22), tag:'New', desc:'A restrained console for entryways, dining rooms and collected corners.' },
  { slug:'sora-bedside', name:'Sora Bedside Table', category:'Bedroom', image:furnitureImage(23), tag:'Edit', desc:'Compact storage with soft edges and natural character.' }
];
