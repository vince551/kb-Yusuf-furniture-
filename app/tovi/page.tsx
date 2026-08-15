'use client';

import { useEffect } from 'react';

export default function LegacyToviRoute() {
  useEffect(() => {
    window.location.replace('/kb-Yusuf-furniture-/');
  }, []);

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24 }}>
      <p>Opening KB Yusuf Furniture…</p>
    </main>
  );
}
