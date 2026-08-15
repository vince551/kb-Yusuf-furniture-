'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LegacyToviRoute() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24 }}>
      <p>Opening KB Yusuf Furniture…</p>
    </main>
  );
}
