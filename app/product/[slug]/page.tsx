import ProductClient from './product-client';
import { products } from '../../data/products';

const productDetails: Record<string, string> = {
  'luna-boucle-sofa': 'Bouclé upholstery · solid timber frame · deep lounge seat',
  'atelier-dining-collection': 'Natural wood · hand-finished surface · six-seat configuration',
  'noir-bedroom-suite': 'Textured upholstery · oak accents · coordinated bedside pieces',
  'atelier-lounge-chair': 'Curved upholstery · supportive frame · sculptural lounge profile',
  'milo-console': 'Stone-inspired surface · refined proportions · entryway-ready storage',
  'sora-bedside': 'Natural character · compact storage · softly rounded silhouette',
};

export function generateStaticParams() {
  return products.map(product => ({ slug: product.slug }));
}

export default async function Product({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find(item => item.slug === slug) ?? products[0];

  return (
    <ProductClient
      p={{
        name: product.name,
        category: product.category,
        image: product.image,
        copy: product.desc,
        details: productDetails[product.slug] ?? 'Furniture details available on request.',
        slug: product.slug,
      }}
    />
  );
}
