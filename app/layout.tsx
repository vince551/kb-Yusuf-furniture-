import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata={title:'VINCE Maison | Furniture & Interiors',description:'Refined furniture and interiors for modern living.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}