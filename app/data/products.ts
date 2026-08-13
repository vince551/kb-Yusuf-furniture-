export type Product = {
  slug: string;
  name: string;
  price: number;
  category: string;
  image: string;
  tag: string;
  desc: string;
};

const img = (n:number) => `/tovi/IMG-20260813-WA${String(n).padStart(4,'0')}.jpg`;

export const products: Product[] = [
  { slug:'luna-boucle-sofa', name:'Luna Bouclé Sofa', price:89900, category:'Living', image:img(62), tag:'Bestseller', desc:'A generous, softly sculpted sofa designed for slow afternoons and long evenings.' },
  { slug:'atelier-dining-collection', name:'Atelier Dining Collection', price:119000, category:'Dining', image:img(63), tag:'New', desc:'Warm timber, elegant proportions and a table made for gathering.' },
  { slug:'noir-bedroom-suite', name:'Noir Bedroom Suite', price:148500, category:'Bedroom', image:img(64), tag:'Signature', desc:'A calm bedroom composition with tactile layers and architectural presence.' },
  { slug:'atelier-lounge-chair', name:'Atelier Lounge Chair', price:42900, category:'Living', image:img(65), tag:'Edit', desc:'Curved comfort with a quiet sculptural silhouette.' },
  { slug:'milo-console', name:'Milo Stone Console', price:64900, category:'Objects', image:img(66), tag:'New', desc:'A restrained console for entryways, dining rooms and collected corners.' },
  { slug:'sora-bedside', name:'Sora Bedside Table', price:28900, category:'Bedroom', image:img(67), tag:'Edit', desc:'Compact storage with soft edges and natural character.' }
];
