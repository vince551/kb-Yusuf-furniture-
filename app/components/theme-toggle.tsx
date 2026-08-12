'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle(){
  const [light,setLight]=useState(false);
  useEffect(()=>{
    const saved=localStorage.getItem('vince-theme');
    const next=saved==='light';
    setLight(next);
    document.documentElement.dataset.theme=next?'light':'dark';
  },[]);
  function toggle(){
    const next=!light;
    setLight(next);
    document.documentElement.dataset.theme=next?'light':'dark';
    localStorage.setItem('vince-theme',next?'light':'dark');
  }
  return <button onClick={toggle} aria-label={light?'Switch to dark theme':'Switch to light theme'} className="theme-toggle" title={light?'Dark theme':'Light theme'}>{light?<Moon size={15}/>:<Sun size={15}/>}<span>{light?'Night':'Day'}</span></button>;
}
