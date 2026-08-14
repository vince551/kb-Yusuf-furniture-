import ProductClient from './product-client';
import { furnitureImage } from '../../data/images';

const products: Record<string, {name:string; category:string; image:string; copy:string; details:string}> = {
  'luna-boucle-sofa':{name:'Luna Bouclé Sofa',category:'Living',image:furnitureImage(18),copy:'A softly sculpted sofa designed to make the everyday feel special.',details:'Bouclé upholstery · solid timber frame · deep lounge seat'},
  'atelier-dining-collection':{name:'Atelier Dining Collection',category:'Dining',image:furnitureImage(19),copy:'A generous dining setting for long lunches, late conversations and everything between.',details:'Natural wood · hand-finished surface · six-seat configuration'},
  'noir-bedroom-suite':{name:'Noir Bedroom Suite',category:'Bedroom',image:furnitureImage(20),copy:'A calm, tactile bedroom collection with a quietly dramatic silhouette.',details:'Textured upholstery · oak accents · coordinated bedside pieces'},
};

export function generateStaticParams(){
  return Object.keys(products).map(slug=>({slug}));
}

export default async function Product({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const product=products[slug]||products['luna-boucle-sofa'];
  return <ProductClient p={product}/>;
}
