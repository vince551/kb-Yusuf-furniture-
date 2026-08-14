'use client';

import Link from 'next/link';
import { ArrowLeft, Heart, ShoppingBag, Check } from 'lucide-react';
import { useState } from 'react';

type Product = { name:string; category:string; image:string; copy:string; details:string; slug?:string };
type BagItem = { slug:string; name:string; category:string; image:string; quantity:number };

const BAG_KEY='kbyusuf_quote_bag';

export default function ProductClient({p}:{p:Product}){
  const [added,setAdded]=useState(false);
  function add(){
    const slug=p.slug || p.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
    const current:BagItem[]=JSON.parse(localStorage.getItem(BAG_KEY)||'[]');
    const index=current.findIndex(i=>i.slug===slug);
    if(index>=0) current[index].quantity+=1;
    else current.push({slug,name:p.name,category:p.category,image:p.image,quantity:1});
    localStorage.setItem(BAG_KEY,JSON.stringify(current));
    localStorage.setItem('kbyusuf_cart_count',String(current.reduce((sum,i)=>sum+i.quantity,0)));
    window.dispatchEvent(new Event('kbyusuf-bag-updated'));
    setAdded(true);
  }

  return <main className="site-shell min-h-screen">
    <header className="site-header">
      <Link href="/" className="brand"><span>KB YUSUF FURNITURE</span><small>Interior Decorations · Product</small></Link>
      <div className="header-actions"><Link href="/shop" className="bag-link">Collection</Link><Link href="/wishlist" className="icon-button"><Heart size={17}/></Link><Link href="/cart" className="bag-link"><ShoppingBag size={17}/><span>Bag</span></Link></div>
    </header>
    <section style={{display:'grid',gridTemplateColumns:'1.2fr .8fr',minHeight:'calc(100vh - 70px)'}}>
      <div style={{minHeight:600,background:'var(--surface-2)'}}><img src={p.image} alt={p.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/></div>
      <div style={{padding:'clamp(40px,7vw,100px)',display:'flex',flexDirection:'column',justifyContent:'center'}}>
        <Link href="/shop" className="gold-link" style={{marginTop:0}}><ArrowLeft size={14}/> Back to collection</Link>
        <p className="eyebrow" style={{marginTop:55}}>{p.category}</p>
        <h1 className="display" style={{fontSize:'clamp(3.5rem,6vw,6.5rem)',lineHeight:.88,margin:'14px 0'}}>{p.name}</h1>
        <p style={{color:'var(--muted)',lineHeight:1.9,maxWidth:520}}>{p.copy}</p>
        <div style={{borderTop:'1px solid var(--line)',borderBottom:'1px solid var(--line)',padding:'20px 0',margin:'30px 0',fontSize:11,color:'var(--muted)'}}>{p.details}</div>
        <button className="btn-gold" onClick={add} style={{border:0,cursor:'pointer'}}>{added?<><Check size={14}/> Added to request bag</>:<>Add to request bag <ShoppingBag size={14}/></>}</button>
        {added&&<Link href="/cart" className="gold-link">Review request bag →</Link>}
      </div>
    </section>
  </main>
}
