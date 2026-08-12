import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Search, ShoppingBag, Sparkles, Truck, ShieldCheck, Heart } from 'lucide-react';
import ThemeToggle from './components/theme-toggle';
import ScrollProgress from './components/scroll-progress';
import PremiumPolish from './components/premium-polish';

const base='/tovi';
const images={
  hero:'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=90',
  living:`${base}/15d900d80767c34c4396197a2a935293.jpg`,
  dining:`${base}/2c050b2da01e5ff74969aada972360db.jpg`,
  bedroom:`${base}/6def6def9e3064a1e6c7e1513df7ddb9.jpg`,
  office:'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=88',
  lounge:'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=88',
  detail:'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=88',
  diningAlt:'https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=1400&q=88',
  bedroomAlt:'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=88'
};
const products=[
  ['Luna Bouclé Sofa','KSh 89,900','Living',images.living,'luna-boucle-sofa'],
  ['Atelier Dining Collection','KSh 119,000','Dining',images.dining,'atelier-dining-collection'],
  ['Noir Bedroom Suite','KSh 148,500','Bedroom',images.bedroom,'noir-bedroom-suite']
];
const inspiration=[
  ['Living / Soft architecture',images.lounge],
  ['Dining / Sculptural forms',images.diningAlt],
  ['Bedroom / Quiet materials',images.bedroomAlt],
  ['Workspace / Warm minimalism',images.office],
  ['Objects / Natural texture',images.detail]
];

export default function Home(){return <main className="site-shell min-h-screen overflow-hidden">
<ScrollProgress/>
<PremiumPolish/>
<div className="marquee"><span>VINCE MAISON · NAIROBI · PRIVATE INTERIOR CONSULTATIONS · COMPLIMENTARY DELIVERY OVER KSh 20,000 · VINCE MAISON · NAIROBI · PRIVATE INTERIOR CONSULTATIONS · COMPLIMENTARY DELIVERY OVER KSh 20,000 · </span></div>
<header className="site-header">
  <Link href="/" className="brand"><span>VINCE</span><small>Maison · Furniture & Interiors</small></Link>
  <nav className="main-nav"><Link href="/" className="nav-link active">Home</Link><Link href="/shop" className="nav-link">Collection</Link><Link href="/spaces" className="nav-link">Spaces</Link><Link href="/journal" className="nav-link">Journal</Link><Link href="/concierge" className="nav-link gold">AI Concierge</Link></nav>
  <div className="header-actions"><Link className="icon-button" href="/shop" aria-label="Search"><Search size={17}/></Link><Link className="icon-button" href="/wishlist" aria-label="Wishlist"><Heart size={17}/></Link><Link className="bag-link" href="/cart"><ShoppingBag size={17}/><span>Bag</span></Link><ThemeToggle/></div>
</header>
<section className="hero-premium">
  <img src={images.hero} alt="Cute pastel inspired modern living room"/>
  <div className="hero-shade"/>
  <div className="hero-content">
    <div className="hero-meta"><p>Collection No. 01 / 2026</p><p>Nairobi<br/>Kenya</p></div>
    <div className="hero-bottom"><p className="eyebrow light">Furniture · Interiors · Objects</p><h1 className="display hero-title">Live<br/><i>beautifully.</i></h1><div className="hero-actions"><p>A softer, more playful side of luxury. Sculptural furniture, tactile materials and warm spaces selected for homes with a point of view.</p><div className="button-row"><Link href="/shop" className="btn-gold">Explore collection <ArrowUpRight size={14}/></Link><Link href="/spaces" className="btn-ghost">Explore spaces</Link></div></div></div><div className="hero-foot"><span>Scroll to discover</span><a href="https://www.pinterest.com/pin/danish-pastel-aesthetic-minimalist-furniture-magic--152066924912395781/" target="_blank" rel="noreferrer">Pinterest inspiration ↗</a></div>
  </div>
</section>
<section className="editorial-intro"><div className="intro-label"><p className="eyebrow">A different kind of furniture house</p></div><div><h2 className="display">Less decoration.<br/><i>More atmosphere.</i></h2><p>VINCE Maison curates pieces that change the feeling of a room. We care about proportion, material, light and the quiet details that make a home feel unmistakably yours.</p><Link href="/journal" className="gold-link">Read our philosophy <ArrowRight size={14}/></Link></div></section>
<section className="rooms-section"><div className="section-head"><div><p className="eyebrow">01 — The rooms</p><h2 className="display">Choose your atmosphere.</h2></div><Link href="/spaces" className="muted-link">View all spaces →</Link></div><div className="space-grid"><Link href="/shop?category=Living" className="space-card space-tall"><img src={images.living} alt="Living room collection"/><div className="space-overlay"/><div className="space-copy"><span>01 / Living</span><h3 className="display">The living room</h3><p>Sofas · lounge · occasional tables</p></div></Link><Link href="/shop?category=Dining" className="space-card"><img src={images.dining} alt="Dining collection"/><div className="space-overlay"/><div className="space-copy"><span>02 / Dining</span><h3 className="display">Gather</h3><p>Tables · chairs · lighting</p></div></Link><Link href="/shop?category=Bedroom" className="space-card"><img src={images.bedroom} alt="Bedroom collection"/><div className="space-overlay"/><div className="space-copy"><span>03 / Bedroom</span><h3 className="display">Unwind</h3><p>Beds · textiles · storage</p></div></Link><Link href="/concierge" className="space-card space-ai"><Sparkles size={20}/><div><span>04 / Personal styling</span><h3 className="display">Your room,<br/><i>curated by AI.</i></h3><p>Tell us your space, taste and budget. VINCE Concierge will build a considered edit.</p><b>Start a conversation →</b></div></Link></div></section>
<section className="inspiration-section"><div className="section-head"><div><p className="eyebrow">02 — The inspiration edit</p><h2 className="display">Cute, considered, collected.</h2></div><a className="muted-link" href="https://www.pinterest.com/bocadolobo/luxury-furniture/" target="_blank" rel="noreferrer">Open inspiration board ↗</a></div><div className="masonry">{inspiration.map(([title,img],i)=><Link href="/journal" className={`inspiration-card insp-${i+1}`} key={title}><img src={img} alt={title}/><div><span>{title}</span><ArrowUpRight size={14}/></div></Link>)}</div><p className="image-note">Pinterest sets the visual mood for this edit. The hero is styled around the cute Danish-pastel direction, while the site uses licensed/free-to-use photography and your own repository assets for the actual storefront.</p></section>
<section className="products-section"><div className="section-head"><div><p className="eyebrow">03 — The edit</p><h2 className="display">Pieces with presence.</h2></div><Link href="/shop" className="muted-link">Shop all →</Link></div><div className="product-showcase">{products.map(([name,price,cat,img,slug],i)=><Link href={`/product/${slug}`} className={`product-piece piece-${i+1}`} key={name}><div className="product-image"><img src={img} alt={name}/><span className="piece-number">0{i+1}</span><span className="product-view">View piece <ArrowUpRight size={13}/></span></div><div className="product-info"><div><p className="product-cat">{cat}</p><h3 className="display">{name}</h3></div><p className="price">{price}</p></div></Link>)}</div></section>
<section className="statement"><div className="statement-word display">VINCE</div><div className="statement-grid"><div><p className="eyebrow">04 — The VINCE approach</p><h2 className="display">Designed to be lived in.<br/><i>Not just looked at.</i></h2></div><div><p>Natural oak. Linen. Bouclé. Stone. Brushed metal. We select materials for how they feel at first touch — and how beautifully they wear over time.</p><div className="gold-line"/><small>Material · Form · Craft · Place</small></div></div></section>
<section className="ai-banner"><img src={images.lounge} alt="AI styling consultation"/><div className="ai-overlay"/><div className="ai-content"><Sparkles size={22}/><p className="eyebrow">VINCE AI Concierge</p><h2 className="display">Tell us how you want<br/><i>your home to feel.</i></h2><p>“Warm, minimal, a little dramatic — and I have KSh 150,000.” Start there. We'll do the rest.</p><Link href="/concierge" className="btn-gold">Meet your concierge <ArrowUpRight size={14}/></Link></div></section>
<section className="services"><div><Truck size={19}/><b>White-glove delivery</b><p>Careful delivery and placement across Kenya.</p></div><div><ShieldCheck size={19}/><b>Secure shopping</b><p>Protected payments and customer information.</p></div><div><Sparkles size={19}/><b>Private styling</b><p>Personal guidance for your space, taste and budget.</p></div></section>
<footer><div className="footer-grid"><div><span className="footer-brand display">VINCE</span><p>Furniture, interiors and intelligent styling for beautiful living.</p></div><div><b>Explore</b><Link href="/shop">Collection</Link><Link href="/spaces">Spaces</Link><Link href="/journal">Journal</Link></div><div><b>Client care</b><Link href="/contact">Contact</Link><Link href="/account">Account</Link><Link href="/cart">Shopping bag</Link></div><div><b>Nairobi</b><p>Private appointments<br/>Kenya</p></div></div><div className="copyright">© 2026 VINCE Maison · Crafted for beautiful living</div></footer>
</main>}
