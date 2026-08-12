import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { colors: { ink:'#141311', cream:'#f2eee7', champagne:'#c9a96a', espresso:'#30271e' }, fontFamily:{display:['Georgia','serif'],sans:['Arial','sans-serif']} } }, plugins:[] };
export default config;