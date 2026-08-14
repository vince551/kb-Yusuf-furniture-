import type { Metadata } from 'next';
import './globals.css';
import './ux.css';
import './mobile.css';
import UXLayer from './components/ux-layer';

export const metadata: Metadata={title:'KB Yusuf Furniture International Limited | Furniture & Interior Decorations',description:'Furniture and interior decoration services in Abuja, Nigeria.',viewport:'width=device-width, initial-scale=1, viewport-fit=cover'};

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}<UXLayer/></body></html>}
