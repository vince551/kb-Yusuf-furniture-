'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowUp, Command, Home, Search, ShoppingBag, Sparkles, X, MessageCircle, Mail } from 'lucide-react';

export default function UXLayer(){
  const [searchOpen,setSearchOpen]=useState(false);
  const [query,setQuery]=useState('');
  const [top,setTop]=useState(false);

  useEffect(()=>{
    const onScroll=()=>setTop(window.scrollY>700);
    const onKey=(e:KeyboardEvent)=>{
      if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();setSearchOpen(true)}
      if(e.key==='Escape')setSearchOpen(false);
    };
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('keydown',onKey);
    return()=>{window.removeEventListener('scroll',onScroll);window.removeEventListener('keydown',onKey)};
  },[]);

  const suggestions=['Sofas','Dining tables','Bedroom','Lighting','Under KSh 100,000'];
  const destination=query.trim()?`/shop?search=${encodeURIComponent(query.trim())}`:'/shop';

  return <>
    <div className="contact-float" aria-label="Contact KB Yusuf Furniture International Limited">
      <a className="contact-float-btn whatsapp" href="https://wa.me/2348109730941" target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp" title="WhatsApp">
        <MessageCircle size={21}/><span>WhatsApp</span>
      </a>
      <a className="contact-float-btn email" href="mailto:kbyusufurniture@gmail.com" aria-label="Email us" title="Email">
        <Mail size={20}/><span>Email</span>
      </a>
    </div>

    <button className="ux-search-trigger" onClick={()=>setSearchOpen(true)} aria-label="Open search"><Search size={15}/><span>Search the collection</span><kbd>⌘ K</kbd></button>

    {top && <button className="back-top" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} aria-label="Back to top"><ArrowUp size={16}/></button>}

    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      <Link href="/"><Home size={17}/><span>Home</span></Link>
      <button onClick={()=>setSearchOpen(true)}><Search size={17}/><span>Search</span></button>
      <Link href="/concierge"><Sparkles size={17}/><span>Concierge</span></Link>
      <Link href="/cart"><ShoppingBag size={17}/><span>Bag</span></Link>
    </nav>

    {searchOpen && <div className="search-command" role="dialog" aria-modal="true" aria-label="Search KB Yusuf Furniture">
      <button className="search-backdrop" aria-label="Close search" onClick={()=>setSearchOpen(false)}/>
      <div className="search-panel">
        <div className="search-head"><div><p className="search-kicker">KB YUSUF FURNITURE / DISCOVER</p><h2>Find something beautiful.</h2></div><button onClick={()=>setSearchOpen(false)} aria-label="Close"><X size={19}/></button></div>
        <form onSubmit={(e)=>{e.preventDefault();window.location.href=destination}} className="search-input-wrap"><Search size={20}/><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Sofas, dining, oak, bouclé..."/><kbd><Command size={12}/> K</kbd></form>
        <div className="search-suggestions"><p>Popular searches</p>{suggestions.map(s=><button key={s} onClick={()=>{setQuery(s);window.location.href=`/shop?search=${encodeURIComponent(s)}`}}>{s}<span>→</span></button>)}</div>
        <div className="search-footer"><Sparkles size={15}/><span>Looking for a complete room? <Link href="/concierge" onClick={()=>setSearchOpen(false)}>Ask our Furniture Concierge</Link></span></div>
      </div>
    </div>}
  </>;
}
