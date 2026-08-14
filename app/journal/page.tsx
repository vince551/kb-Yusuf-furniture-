import Link from 'next/link';

const asset = (filename: string) =>
  process.env.VERCEL === '1' ? `/${filename}` : `/tovi/${filename}`;

const stories = [
  ['The art of the soft room', 'How pastel tones, tactile textiles and curved forms make a space feel instantly more inviting.', asset('0865349b2c2c7fc9275ff3ec59bad7db.jpg')],
  ['Small room, big personality', 'A practical guide to making compact spaces feel layered, warm and intentional.', asset('14128ff6ee4ec64f94d59a78594766fc.jpg')],
  ['Designing for real life', 'Why the best furniture is beautiful enough to admire and comfortable enough to live with.', asset('15d900d80767c34c4396197a2a935293.jpg')],
];

export default function Journal() {
  return (
    <main className="site-shell min-h-screen">
      <header className="site-header">
        <Link href="/" className="brand"><span>VINCE</span><small>Maison · Journal</small></Link>
        <nav className="main-nav">
          <Link href="/shop" className="nav-link">Collection</Link>
          <Link href="/spaces" className="nav-link">Spaces</Link>
          <Link href="/journal" className="nav-link active">Journal</Link>
          <Link href="/concierge" className="nav-link gold">AI Concierge</Link>
        </nav>
        <Link href="/cart" className="bag-link">Bag →</Link>
      </header>

      <section className="editorial-intro">
        <div><p className="eyebrow">VINCE / JOURNAL</p></div>
        <div>
          <h1 className="display" style={{ fontSize: 'clamp(4rem,9vw,9rem)', lineHeight: .85, margin: 0 }}>Ideas for<br /><i>beautiful living.</i></h1>
          <p>Notes on furniture, interiors, materials and the small choices that make a room feel like yours.</p>
        </div>
      </section>

      <section className="inspiration-section">
        <div className="masonry">
          {stories.map(([title, copy, img], i) => (
            <article key={title} className={`inspiration-card insp-${i + 1}`}>
              <img src={img} alt={title} loading={i === 0 ? 'eager' : 'lazy'} />
              <div><span>{title}</span></div>
            </article>
          ))}
        </div>
        <div style={{ maxWidth: 700, margin: '45px auto', textAlign: 'center' }}>
          <p className="eyebrow">Next chapter</p>
          <h2 className="display" style={{ fontSize: 'clamp(2.8rem,6vw,6rem)' }}>Want help styling your room?</h2>
          <Link href="/concierge" className="btn-gold">Ask Concierge →</Link>
        </div>
      </section>
    </main>
  );
}
