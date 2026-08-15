'use client';

import { FormEvent, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Send, RotateCcw } from 'lucide-react';

type Message = { role: 'user' | 'assistant'; content: string };

const starters = [
  'Help me style a warm modern living room.',
  'What furniture works best for a small apartment?',
  'Help me plan a calm luxury bedroom.',
  'I need ideas for an elegant dining space.',
];

export default function Concierge() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canSend = useMemo(() => message.trim().length >= 2 && !loading, [message, loading]);

  async function send(e?: FormEvent) {
    e?.preventDefault();
    const text = message.trim();
    if (text.length < 2 || loading) return;

    setLoading(true);
    setError('');
    setMessage('');
    const nextMessages = [...messages, { role: 'user' as const, content: text }];
    setMessages(nextMessages);

    try {
      const response = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: messages.slice(-10) }),
      });
      const data = await response.json();
      if (!response.ok && !data.reply) throw new Error('Request failed');
      setMessages([...nextMessages, { role: 'assistant', content: data.reply || 'Please try again.' }]);
    } catch {
      setError('The concierge is temporarily unavailable. Please try again or contact the team directly.');
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setMessages([]);
    setMessage('');
    setError('');
  }

  return (
    <main className="min-h-screen bg-ink px-5 py-8 text-white md:px-20 md:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
          <Link href="/" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[.2em] text-stone-400 hover:text-champagne">
            <ArrowLeft size={14}/> KB Yusuf Furniture
          </Link>
          <button onClick={reset} className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[.18em] text-stone-500 hover:text-champagne" type="button">
            <RotateCcw size={13}/> New conversation
          </button>
        </div>

        <section className="mx-auto max-w-3xl pt-16 md:pt-24">
          <div className="flex items-center gap-3 text-champagne">
            <Sparkles size={18}/>
            <p className="text-[9px] uppercase tracking-[.3em]">AI Interior Concierge</p>
          </div>
          <h1 className="display mt-5 text-5xl leading-[.9] md:text-7xl">Tell us how you<br/><i className="text-champagne">want to live.</i></h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-stone-500">Describe your room, style, dimensions, colours or what you are trying to achieve. The concierge can help you shape a furniture and interior-decoration direction.</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {starters.map(item => <button key={item} type="button" onClick={() => setMessage(item)} className="rounded-full border border-white/10 bg-white/[.03] px-4 py-3 text-left text-[10px] text-stone-400 transition hover:border-champagne/50 hover:text-champagne">{item}</button>)}
          </div>

          <div className="mt-10 space-y-4">
            {messages.map((item, index) => (
              <div key={`${item.role}-${index}`} className={item.role === 'user' ? 'ml-auto max-w-[90%] rounded-2xl rounded-br-sm bg-champagne px-5 py-4 text-sm leading-7 text-ink md:max-w-[75%]' : 'max-w-[90%] rounded-2xl rounded-bl-sm border border-white/10 bg-[#171512] px-5 py-4 text-sm leading-7 text-stone-300 md:max-w-[80%]'}>
                {item.content}
              </div>
            ))}
            {loading && <div className="max-w-[80%] rounded-2xl rounded-bl-sm border border-white/10 bg-[#171512] px-5 py-4 text-sm text-stone-500">Thinking about your space…</div>}
          </div>

          {error && <p className="mt-4 rounded-xl border border-red-300/20 bg-red-300/5 p-4 text-xs text-red-200">{error}</p>}

          <form onSubmit={send} className="mt-8 rounded-2xl border border-white/10 bg-[#12100e] p-3 shadow-2xl">
            <textarea value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }} required rows={4} placeholder="e.g. I have a small living room with warm wood floors. I want it to feel modern, soft and luxurious…" className="w-full resize-none bg-transparent p-3 text-sm leading-7 text-white outline-none placeholder:text-stone-600"/>
            <div className="flex items-center justify-between gap-3 border-t border-white/10 px-3 pt-3">
              <span className="text-[9px] uppercase tracking-[.16em] text-stone-600">AI generated guidance · No public prices</span>
              <button disabled={!canSend} className="inline-flex items-center gap-2 rounded-full bg-champagne px-5 py-3 text-[9px] font-bold uppercase tracking-[.16em] text-ink disabled:cursor-not-allowed disabled:opacity-40" type="submit">{loading ? 'Thinking…' : 'Ask concierge'} <Send size={13}/></button>
            </div>
          </form>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link href="/shop" className="rounded-xl border border-white/10 p-5 transition hover:border-champagne/50"><span className="text-[9px] uppercase tracking-[.2em] text-champagne">Browse</span><p className="mt-2 text-sm text-stone-300">Explore all 56 furniture images →</p></Link>
            <Link href="/cart" className="rounded-xl border border-white/10 p-5 transition hover:border-champagne/50"><span className="text-[9px] uppercase tracking-[.2em] text-champagne">Quotation</span><p className="mt-2 text-sm text-stone-300">Build a Bag and request a quotation →</p></Link>
          </div>
        </section>
      </div>
    </main>
  );
}
