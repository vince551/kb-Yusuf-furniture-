'use client';
import Link from 'next/link';
import { ArrowUpRight, Heart, Menu, ShoppingBag, Sparkles, Star, Truck, ShieldCheck, MessageCircle, Mail, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { Product } from '../data/products';

const BAG_KEY='kbyusuf_quote_bag';
const WISHLIST_KEY='kbyusuf_wishlist';

const navItems=[
  {href:'/',label:'Home'},
  {href:'/shop',label:'Collection'},
  {href:'/spaces',label:'Spaces'},
  {href:'/journal',label:'Journal'},
  {href:'/contact',label:'Design Services'},
];

export function Header(){
  const [count,setCount]=useState(0);
  const [menuOpen,setMenuOpen]=useState(false);
  const pathname=usePathname();
  useEffect(()=>{const load=()=>{try{const items=JSON.parse(localStorage.getItem(BAG_KEY)||'[]');setCount(items.reduce((s:number,i:{quantity:number})=>s+i.quantity,0))}catch{setCount(0)}};load();window.addEventListener('kbyusuf-bag-updated',load);window.addEventListener('storage',load);return()=>{window.removeEventListener('kbyusuf-bag-updated',load);window.removeEventListener('storage',load)}},[]);
  useEffect(()=>{setMenuOpen(false)},[pathname]);
  useEffect(()=>{if(!menuOpen)return;const close=(e:KeyboardEvent)=>e.key==='Escape'&&setMenuOpen(false);const old=document.body.style.overflow;document.body.style.overflow='hidden';window.addEventListener('keydown',close);return()=>{document.body.style.overflow=old;window.removeEventListener('keydown',close)}},[menuOpen]);
  const active=(href:string)=>href==='/'?pathname==='/':pathname===href||pathname.startsWith(`${href}/`);
  return <>
    <header className="site-header">
      <Link href="/" className="brand" aria-label="KB Yusuf Furniture home"><span>KB YUSUF FURNITURE</span><small>Interior Decorations · Furniture</small></Link>
      <nav className="main-nav" aria-label="Primary navigation">{navItems.map(item=><Link key={item.href} href={item.href} className={`nav-link${active(item.href)?' active':''}${item.href==='/contact'?' gold':''}`}>{item.label}</Link>)}</nav>
      <div className="header-actions">
        <Link className="icon-button desktop-only" href="/wishlist" aria-label="Wishlist"><Heart size={17}/></Link>
        <Link className="bag-link" href="/cart" aria-label={`Quotation bag${count?`, ${count} pieces`:''}`}><ShoppingBag size={17}/><span>Bag{count>0&&` · ${count}`}</span></Link>
        <button className="mobile-menu-button" type="button" onClick={()=>setMenuOpen(v=>!v)} aria-label={menuOpen?'Close navigation':'Open navigation'} aria-expanded={menuOpen}>{menuOpen?<X size={20}/>:<Menu size={20}/>}</button>
      </div>
    </header>
    {menuOpen&&<div className="mobile-menu-layer" role="dialog" aria-modal="true" aria-label="Navigation menu">
      <button className="mobile-menu-backdrop" aria-label="Close menu" onClick={()=>setMenuOpen(false)}/>
      <aside className="mobile-menu-panel">
        <div className="mobile-menu-top"><span>MENU</span><button onClick={()=>setMenuOpen(false)} aria-label="Close menu"><X size={19}/></button></div>
        <nav aria-label="Mobile primary navigation">{navItems.map((item,i)=><Link key={item.href} href={item.href} className={active(item.href)?'active':''}><span>0{i+1}</span>{item.label}<ArrowUpRight size={15}/></Link>)}</nav>
        <div className="mobile-menu-links"><Link href="/wishlist"><Heart size={15}/> Wishlist</Link><Link href="/account"><span>◎</span> Client account</Link><Link href="/cart"><ShoppingBag size={15}/> Quotation bag{count>0&&` · ${count}`}</Link></div>
        <div className="mobile-menu-contact"><p>CLIENT CARE</p><a href="tel:+2348109730941">+234 810 973 0941</a><a href="mailto:kbyusufurniture@gmail.com">kbyusufurniture@gmail.com</a></div>
      </aside>
    </div>}
  </>;
}

export function FloatingContacts(){return <div className="floating-contacts" aria-label="Contact KB Yusuf Furniture"><a className="floating-contact whatsapp" href="https://wa.me/2348109730941" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle size={18}/><span>WhatsApp</span></a><a className="floating-contact email" href="mailto:kbyusufurniture@gmail.com" aria-label="Email KB Yusuf Furniture"><Mail size={18}/><span>Email</span></a></div>}
export function Footer(){return <footer><div className="footer-grid"><div><span className="footer-brand display">KB YUSUF FURNITURE</span><p>Furniture and interior decorations for beautiful living.</p></div><div><b>Explore</b><Link href="/shop">Collection</Link><Link href="/spaces">Spaces</Link><Link href="/journal">Journal</Link></div><div><b>Client care</b><Link href="/contact">Contact</Link><Link href="/account">Account</Link><Link href="/wishlist">Wishlist</Link><Link href="/cart">Quotation bag</Link></div><div><b>Abuja, Nigeria</b><p>+234 810 973 0941<br/>kbyusufurniture@gmail.com</p></div></div><div className="copyright">© 2026 KB Yusuf Furniture International Limited · Interior Decorations · Abuja, Nigeria</div></footer>}
export function PageShell({eyebrow,title,children}:{eyebrow:string,title:React.ReactNode,children:React.ReactNode}){return <main className="site-shell min-h-screen"><div className="marquee"><span>KB YUSUF FURNITURE INTERNATIONAL LIMITED · ABUJA, NIGERIA · INTERIOR DECORATIONS · COMPLIMENTARY DELIVERY · </span></div><Header/><section className="editorial-intro" style={{paddingTop:110,paddingBottom:75}}><div><p className="eyebrow">{eyebrow}</p></div><div><h1 className="display" style={{fontSize:'clamp(3.5rem,8vw,8rem)',lineHeight:.88,letterSpacing:'-.055em'}}>{title}</h1></div></section>{children}<Footer/><FloatingContacts/></main>}
export function ProductCard({product}:{product:Product}){const [liked,setLiked]=useState(false);useEffect(()=>{try{const saved=JSON.parse(localStorage.getItem(WISHLIST_KEY)||'[]');setLiked(saved.includes(product.slug))}catch{}},[product.slug]);function toggle(){try{const saved=JSON.parse(localStorage.getItem(WISHLIST_KEY)||'[]');const next=saved.includes(product.slug)?saved.filter((slug:string)=>slug!==product.slug):[...saved,product.slug];localStorage.setItem(WISHLIST_KEY,JSON.stringify(next));setLiked(next.includes(product.slug));window.dispatchEvent(new Event('kbyusuf-wishlist-updated'))}catch{setLiked(v=>!v)}}return <article className="product-piece" style={{marginTop:0}}><div className="product-image"><Link href={`/product/${product.slug}`} className="block h-full w-full"><img src={product.image} alt={product.name}/><span className="piece-number">{product.tag}</span><span className="product-view">View piece <ArrowUpRight size={13}/></span></Link><button aria-label={`${liked?'Remove':'Add'} ${product.name} ${liked?'from':'to'} wishlist`} onClick={toggle} className="absolute right-3 top-3 z-10 rounded-full bg-black/40 p-2 text-white backdrop-blur"><Heart size={15} fill={liked?'currentColor':'none'}/></button></div><div className="product-info"><div><p className="product-cat">{product.category}</p><h3 className="display">{product.name}</h3></div></div></article>}
export function ServiceStrip(){return <section className="services"><div><Truck size={19}/><b>Delivery & placement</b><p>Careful delivery and placement for your furniture.</p></div><div><ShieldCheck size={19}/><b>Secure shopping</b><p>Protected customer information and quotation requests.</p></div><div><Sparkles size={19}/><b>Interior decoration</b><p>Professional guidance for your space, taste and budget.</p></div></section>}
export function Stars(){return <div className="flex items-center gap-1 text-[var(--gold)]">{[1,2,3,4,5].map(i=><Star key={i} size={13} fill="currentColor"/>)}<span className="ml-2 text-xs text-[var(--muted)]">4.9 / 5</span></div>}
