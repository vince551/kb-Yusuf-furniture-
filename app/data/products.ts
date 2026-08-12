export type Product = {
  slug: string;
  name: string;
  price: number;
  category: string;
  image: string;
  tag: string;
  desc: string;
};

export const products: Product[] = [
  { slug:'luna-boucle-sofa', name:'Luna Bouclé Sofa', price:89900, category:'Living', image:'/tovi/15d900d80767c34c4396197a2a935293.jpg', tag:'Bestseller', desc:'A generous, softly sculpted sofa designed for slow afternoons and long evenings.' },
  { slug:'atelier-dining-collection', name:'Atelier Dining Collection', price:119000, category:'Dining', image:'/tovi/2c050b2da01e5ff74969aada972360db.jpg', tag:'New', desc:'Warm timber, elegant proportions and a table made for gathering.' },
  { slug:'noir-bedroom-suite', name:'Noir Bedroom Suite', price:148500, category:'Bedroom', image:'/tovi/6def6def9e3064a1e6c7e1513df7ddb9.jpg', tag:'Signature', desc:'A calm bedroom composition with tactile layers and architectural presence.' },
  { slug:'atelier-lounge-chair', name:'Atelier Lounge Chair', price:42900, category:'Living', image:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=88', tag:'Edit', desc:'Curved comfort with a quiet sculptural silhouette.' },
  { slug:'milo-console', name:'Milo Stone Console', price:64900, category:'Objects', image:'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=88', tag:'New', desc:'A restrained console for entryways, dining rooms and collected corners.' },
  { slug:'sora-bedside', name:'Sora Bedside Table', price:28900, category:'Bedroom', image:'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=88', tag:'Edit', desc:'Compact storage with soft edges and natural character.' }
];
