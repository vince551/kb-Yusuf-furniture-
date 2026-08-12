import type { Metadata } from 'next';
import './globals.css';
import './ux.css';
import UXLayer from './components/ux-layer';

export const metadata: Metadata={title:'VINCE Maison | Furniture & Interiors',description:'Refined furniture, interiors and intelligent styling for modern living.',viewport:'width=device-width, initial-scale=1, viewport-fit=cover'};

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}<UXLayer/></body></html>}
