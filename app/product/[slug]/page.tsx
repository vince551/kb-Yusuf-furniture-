import ProductClient from './product-client';

const products:any={
  'luna-boucle-sofa':{name:'Luna Bouclé Sofa',price:'KSh 89,900',category:'Living',image:'../../15d900d80767c34c4396197a2a935293.jpg',copy:'A softly sculpted sofa designed to make the everyday feel special.',details:'Bouclé upholstery · solid timber frame · deep lounge seat'},
  'atelier-dining-collection':{name:'Atelier Dining Collection',price:'KSh 119,000',category:'Dining',image:'../../2c050b2da01e5ff74969aada972360db.jpg',copy:'A generous dining setting for long lunches, late conversations and everything between.',details:'Natural wood · hand-finished surface · six-seat configuration'},
  'noir-bedroom-suite':{name:'Noir Bedroom Suite',price:'KSh 148,500',category:'Bedroom',image:'../../6def6def9e3064a1e6c7e1513df7ddb9.jpg',copy:'A calm, tactile bedroom collection with a quietly dramatic silhouette.',details:'Textured upholstery · oak accents · coordinated bedside pieces'}
};

export function generateStaticParams(){
  return Object.keys(products).map(slug=>({slug}));
}

export default async function Product({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const product=products[slug]||products['luna-boucle-sofa'];
  return <ProductClient p={product}/>;
}
