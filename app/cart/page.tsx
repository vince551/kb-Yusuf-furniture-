'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, Trash2, MessageCircle, Mail, Send } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type BagItem={slug:string;name:string;category:string;image:string;quantity:number};
const BAG_KEY='kbyusuf_quote_bag';
const WHATSAPP='2348109730941';
const EMAIL='kbyusufurniture@gmail.com';

export default function Cart(){
  const [items,setItems]=useState<BagItem[]>([]);
  const [customer,setCustomer]=useState({name:'',phone:'',email:'',location:'',notes:''});
  const [sent,setSent]=useState(false);

  function load(){
    try{setItems(JSON.parse(localStorage.getItem(BAG_KEY)||'[]'));}catch{setItems([])}
  }
  useEffect(()=>{load(); const handler=()=>load(); window.addEventListener('kbyusuf-bag-updated',handler); return()=>window.removeEventListener('kbyusuf-bag-updated',handler)},[]);

  const totalPieces=useMemo(()=>items.reduce((sum,i)=>sum+i.quantity,0),[items]);
  function save(next:BagItem[]){setItems(next);localStorage.setItem(BAG_KEY,JSON.stringify(next));localStorage.setItem('kbyusuf_cart_count',String(next.reduce((sum,i)=>sum+i.quantity,0)));window.dispatchEvent(new Event('kbyusuf-bag-updated'))}
  function change(slug:number|string,delta:number){save(items.map(i=>i.slug===slug?{...i,quantity:Math.max(1,i.quantity+delta)}:i))}
  function remove(slug:string){save(items.filter(i=>i.slug!==slug))}
  function clear(){save([]);setSent(false)}

  function buildMessage(){
    const list=items.map(i=>`• ${i.name} (${i.category}) × ${i.quantity}`).join('\n');
    return `Hello KB Yusuf Furniture International Limited, I would like to request a quotation for the following furniture:\n\n${list}\n\nCustomer name: ${customer.name}\nPhone: ${customer.phone}\nEmail: ${customer.email||'Not provided'}\nLocation: ${customer.location||'Not provided'}\nAdditional requirements: ${customer.notes||'None'}\n\nPlease send me the available options, pricing and delivery details.`;
  }
  function requestWhatsApp(){if(!customer.name||!customer.phone){alert('Please enter your name and phone number first.');return}window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(buildMessage())}`,'_blank','noopener,noreferrer');setSent(true)}
  function requestEmail(){if(!customer.name||!customer.phone){alert('Please enter your name and phone number first.');return}window.location.href=`mailto:${EMAIL}?subject=${encodeURIComponent('Furniture quotation request')}&body=${encodeURIComponent(buildMessage())}`;setSent(true)}

  return <main className="site-shell min-h-screen">
    <header className="site-header"><Link href="/" className="brand"><span>KB YUSUF FURNITURE</span><small>Interior Decorations · Request Bag</small></Link><Link href="/shop" className="bag-link">Continue shopping →</Link></header>
    <section className="editorial-intro"><div><p className="eyebrow">YOUR REQUEST BAG</p><p style={{color:'var(--muted)',fontSize:11,lineHeight:1.8,maxWidth:300}}>Select the pieces you are interested in. We will prepare a tailored quotation rather than charging you online.</p></div><div><h1 className="display" style={{fontSize:'clamp(3.5rem,8vw,8rem)',margin:0,lineHeight:.85}}>Request<br/><i>a quote.</i></h1><p style={{color:'var(--muted)'}}>{totalPieces?`${totalPieces} piece${totalPieces===1?'':'s'} selected.`:'Your considered edit starts here.'}</p></div></section>

    <section style={{padding:'70px 7vw'}}>
      {items.length===0?<div style={{textAlign:'center',padding:'70px 20px',borderTop:'1px solid var(--line)'}}><ShoppingBag size={36} style={{color:'var(--gold)'}}/><h2 className="display" style={{fontSize:'clamp(2.5rem,5vw,4rem)'}}>Your request bag is empty.</h2><p style={{color:'var(--muted)',maxWidth:520,margin:'0 auto 25px',lineHeight:1.8}}>Explore the collection, choose the pieces you love, and send us a request for a personalised quotation.</p><Link href="/shop" className="btn-gold">Explore collection <ArrowRight size={14}/></Link></div>:<div style={{maxWidth:1100,margin:'auto',display:'grid',gridTemplateColumns:'1.1fr .9fr',gap:55}}>
        <div>
          <div style={{display:'grid',gap:12}}>{items.map(item=><article key={item.slug} style={{display:'grid',gridTemplateColumns:'120px 1fr auto',gap:18,alignItems:'center',padding:'14px 0',borderBottom:'1px solid var(--line)'}}><img src={item.image} alt={item.name} style={{width:120,height:120,objectFit:'cover',background:'var(--surface-2)'}}/><div><p className="product-cat">{item.category}</p><h2 className="display" style={{fontSize:'1.8rem',margin:'7px 0'}}>{item.name}</h2><div style={{display:'flex',alignItems:'center',gap:9,marginTop:12}}><button onClick={()=>change(item.slug,-1)} aria-label="Decrease quantity" style={qtyButton}><Minus size={13}/></button><strong style={{fontSize:11}}>{item.quantity}</strong><button onClick={()=>change(item.slug,1)} aria-label="Increase quantity" style={qtyButton}><Plus size={13}/></button></div></div><button onClick={()=>remove(item.slug)} aria-label={`Remove ${item.name}`} style={removeButton}><Trash2 size={16}/></button></article>)}</div>
          <button onClick={clear} className="gold-link" style={{background:'none',border:0,cursor:'pointer'}}><Trash2 size={13}/> Clear request bag</button>
        </div>
        <form onSubmit={e=>{e.preventDefault();requestWhatsApp()}} style={{background:'var(--surface)',border:'1px solid var(--line)',padding:'28px',alignSelf:'start'}}>
          <p className="eyebrow">CLIENT DETAILS</p><h2 className="display" style={{fontSize:'2.6rem',margin:'10px 0 22px'}}>Tell us about<br/><i>your project.</i></h2>
          <div style={{display:'grid',gap:12}}>{[['name','Full name *'],['phone','Phone / WhatsApp *'],['email','Email address'],['location','City / delivery location'],['notes','Notes, measurements or special requirements']].map(([key,label])=><label key={key} style={{display:'grid',gap:6,fontSize:8,textTransform:'uppercase',letterSpacing:'.14em',color:'var(--muted)'}}>{label}{key==='notes'?<textarea value={customer[key as keyof typeof customer]} onChange={e=>setCustomer({...customer,[key]:e.target.value})} rows={4} placeholder="Tell us anything that will help us prepare your quotation." style={fieldStyle}/>:<input value={customer[key as keyof typeof customer]} onChange={e=>setCustomer({...customer,[key]:e.target.value})} placeholder={label.replace(' *','')} style={fieldStyle}/>}</label>)}</div>
          <p style={{fontSize:10,color:'var(--muted)',lineHeight:1.7,margin:'18px 0'}}>No online payment is required. We will confirm availability, pricing, customisation and delivery with you.</p>
          <div style={{display:'grid',gap:9}}><button type="submit" className="btn-gold" style={{border:0,cursor:'pointer'}}><MessageCircle size={15}/> Request quotation on WhatsApp</button><button type="button" onClick={requestEmail} className="btn-ghost" style={{borderColor:'var(--line)',color:'var(--text)',cursor:'pointer'}}><Mail size={15}/> Send quotation request by email</button></div>
          {sent&&<p style={{display:'flex',alignItems:'center',gap:7,color:'var(--gold)',fontSize:10,marginBottom:0}}><Send size={13}/> Request prepared. We will be in touch.</p>}
        </form>
      </div>}
    </section>
  </main>
}

const qtyButton={width:32,height:32,border:'1px solid var(--line)',background:'transparent',color:'var(--text)',display:'inline-flex',alignItems:'center',justifyContent:'center',cursor:'pointer'} as const;
const removeButton={border:0,background:'transparent',color:'var(--muted)',cursor:'pointer',padding:8} as const;
const fieldStyle={width:'100%',border:'1px solid var(--line)',background:'var(--bg)',color:'var(--text)',padding:'12px',fontSize:12,outline:'none'} as const;
