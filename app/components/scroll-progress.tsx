'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress(){
  const [width,setWidth]=useState(0);
  useEffect(()=>{
    const update=()=>{
      const doc=document.documentElement;
      const max=doc.scrollHeight-window.innerHeight;
      setWidth(max>0?(window.scrollY/max)*100:0);
    };
    update();
    window.addEventListener('scroll',update,{passive:true});
    window.addEventListener('resize',update);
    return()=>{window.removeEventListener('scroll',update);window.removeEventListener('resize',update)};
  },[]);
  return <div className="scroll-progress" style={{width:`${width}%`}} aria-hidden="true"/>;
}
