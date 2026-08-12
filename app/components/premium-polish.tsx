'use client';

import { useEffect } from 'react';

export default function PremiumPolish() {
  useEffect(() => {
    const root = document.documentElement;
    const onMove = (event: MouseEvent) => {
      root.style.setProperty('--mx', `${event.clientX}px`);
      root.style.setProperty('--my', `${event.clientY}px`);
    };

    const revealTargets = document.querySelectorAll<HTMLElement>(
      '.section-head, .space-card, .inspiration-card, .product-piece, .statement-grid, .services > div'
    );

    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 }
    );

    revealTargets.forEach((element, index) => {
      element.style.setProperty('--reveal-delay', `${Math.min(index * 45, 240)}ms`);
      observer.observe(element);
    });

    const hero = document.querySelector<HTMLElement>('.hero-premium > img');
    const onScroll = () => {
      const y = Math.min(window.scrollY, 700);
      if (hero) hero.style.transform = `scale(1.045) translate3d(0, ${y * 0.045}px, 0)`;
      root.classList.toggle('has-scrolled', window.scrollY > 40);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="cursor-glow" aria-hidden="true" />
      <style jsx global>{`
        :root { --mx: 50vw; --my: 50vh; }
        body { overflow-x: hidden; }
        body::after {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 999;
          opacity: .055;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E");
          mix-blend-mode: soft-light;
        }
        .cursor-glow {
          position: fixed;
          left: var(--mx);
          top: var(--my);
          width: 360px;
          height: 360px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          background: radial-gradient(circle, rgba(210,174,109,.095), transparent 68%);
          filter: blur(12px);
          transition: opacity .3s;
        }
        .site-header {
          transition: padding .35s, background .35s, box-shadow .35s;
        }
        .has-scrolled .site-header {
          padding-top: 13px;
          padding-bottom: 13px;
          box-shadow: 0 14px 50px rgba(0,0,0,.14);
        }
        .hero-premium > img {
          transform-origin: center center;
          will-change: transform;
          transition: transform .15s linear;
        }
        .hero-premium::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,.055), transparent 28%);
          z-index: 2;
        }
        .hero-content { z-index: 3; }
        .hero-title { text-shadow: 0 12px 50px rgba(0,0,0,.28); }
        .hero-title i, .ai-content h2 i, .statement h2 i, .editorial-intro h2 i {
          background: linear-gradient(110deg, var(--gold), #f0d49b, var(--gold));
          background-size: 220% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: goldShift 7s ease-in-out infinite;
        }
        @keyframes goldShift { 50% { background-position: 100% center; } }
        .section-head, .space-card, .inspiration-card, .product-piece, .statement-grid, .services > div {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity .8s ease var(--reveal-delay, 0ms), transform .8s cubic-bezier(.2,.75,.2,1) var(--reveal-delay, 0ms);
        }
        .is-visible { opacity: 1 !important; transform: translateY(0) !important; }
        .space-card, .inspiration-card, .product-piece { will-change: transform; }
        .space-card::after, .inspiration-card::after, .product-image::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(135deg, rgba(255,255,255,.11), transparent 24%, transparent 70%, rgba(0,0,0,.16));
          opacity: 0;
          transition: opacity .5s;
        }
        .space-card:hover::after, .inspiration-card:hover::after, .product-piece:hover .product-image::after { opacity: 1; }
        .space-card:hover, .inspiration-card:hover { box-shadow: 0 25px 70px rgba(0,0,0,.22); }
        .product-piece:hover { transform: translateY(-7px) !important; transition: transform .45s cubic-bezier(.2,.75,.2,1); }
        .product-piece:hover .product-view { background: var(--gold); color: #17120d; border-color: var(--gold); }
        .btn-gold { box-shadow: 0 12px 35px rgba(210,174,109,.18); }
        .btn-gold:hover { box-shadow: 0 18px 45px rgba(210,174,109,.28); }
        .space-copy h3, .product-info h3 { transition: transform .4s ease; }
        .space-card:hover .space-copy h3, .product-piece:hover .product-info h3 { transform: translateX(4px); }
        .ai-banner { isolation: isolate; }
        .ai-banner::before {
          content: '';
          position: absolute;
          width: 620px;
          height: 620px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(210,174,109,.14), transparent 65%);
          animation: floatGlow 8s ease-in-out infinite;
          z-index: 1;
        }
        @keyframes floatGlow { 50% { transform: translate3d(0,-24px,0) scale(1.06); } }
        .services > div { transition-duration: .7s; }
        .services > div:hover { transform: translateY(-5px) !important; border-color: var(--gold); }
        .footer-grid a { position: relative; width: fit-content; }
        .footer-grid a::after { content:''; position:absolute; left:0; right:100%; bottom:-4px; height:1px; background:var(--gold); transition:right .3s; }
        .footer-grid a:hover::after { right:0; }
        @media (max-width: 600px) {
          .cursor-glow { display:none; }
          .hero-premium > img { transform:none !important; }
          .hero-title { text-shadow: 0 8px 30px rgba(0,0,0,.3); }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: .001ms !important; transition-duration: .001ms !important; scroll-behavior: auto !important; }
        }
      `}</style>
    </>
  );
}
