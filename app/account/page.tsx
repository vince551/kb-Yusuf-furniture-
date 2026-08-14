'use client'

import { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, LogIn, LogOut, Mail, ShieldCheck, UserPlus, FileText } from 'lucide-react'
import { ID } from 'appwrite'
import { account } from '@/lib/appwrite/client'

type Customer = { $id: string; email: string; name: string }
type Quote = { id: string; createdAt: string; items: Array<{ name: string; category: string; quantity: number }>; location?: string; notes?: string; status: string }

export default function Account() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [user, setUser] = useState<Customer | null>(null)
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function loadUser() {
    try {
      const current = await account.get() as Customer
      setUser(current)
      const prefs = await account.getPrefs() as { quotations?: Quote[] }
      setQuotes(Array.isArray(prefs.quotations) ? prefs.quotations : [])
    } catch { setUser(null); setQuotes([]) }
  }

  useEffect(() => { loadUser() }, [])

  async function submit(e: FormEvent) {
    e.preventDefault(); setLoading(true); setError(''); setMessage('')
    try {
      if (mode === 'signup') await account.create(ID.unique(), email.trim(), password, fullName.trim())
      await account.createEmailPasswordSession(email.trim(), password)
      await loadUser()
      setMessage(mode === 'signup' ? 'Your account is ready. Welcome to KB Yusuf Furniture.' : 'Welcome back.')
    } catch (err: any) {
      setError(err?.message || 'Unable to complete the request. Please try again.')
    } finally { setLoading(false) }
  }

  async function signOut() {
    try { await account.deleteSession('current') } finally { setUser(null); setQuotes([]); setMessage('You have been signed out.') }
  }

  return (
    <main className="site-shell min-h-screen">
      <header className="site-header">
        <Link href="/" className="brand"><span>KB YUSUF FURNITURE</span><small>Interior Decorations · Client Care</small></Link>
        <Link href="/shop" className="bag-link">Collection →</Link>
      </header>

      <section className="min-h-[calc(100vh-75px)] px-5 py-16 md:px-[7vw] md:py-24 flex items-center justify-center">
        <div className="w-full max-w-xl rounded-sm border border-[var(--line)] bg-[var(--surface)] p-7 shadow-2xl md:p-12">
          <p className="eyebrow">CLIENT ACCOUNT</p>
          {user ? (
            <div className="mt-5">
              <h1 className="display text-5xl leading-[.9] md:text-7xl">Welcome,<br/><i className="text-[var(--gold)]">{user.name || user.email.split('@')[0]}.</i></h1>
              <p className="mt-6 text-sm leading-7 text-[var(--muted)]">Your customer account is active. Your quotation requests are saved to your Appwrite account.</p>
              <div className="mt-7 space-y-3 border-y border-[var(--line)] py-6 text-sm">
                <div className="flex items-center gap-3"><Mail size={17} className="text-[var(--gold)]"/><span>{user.email}</span></div>
                <div className="flex items-center gap-3"><ShieldCheck size={17} className="text-[var(--gold)]"/><span>Secure Appwrite customer session</span></div>
              </div>

              <div className="mt-8">
                <div className="flex items-center gap-2"><FileText size={16} className="text-[var(--gold)]"/><p className="eyebrow">MY QUOTATION REQUESTS</p></div>
                {quotes.length === 0 ? <p className="mt-4 text-sm leading-6 text-[var(--muted)]">No quotation requests have been saved yet.</p> : <div className="mt-4 space-y-3">{quotes.map(q => <article key={q.id} className="border border-[var(--line)] p-4"><div className="flex justify-between gap-4 text-[9px] uppercase tracking-[.14em] text-[var(--muted)]"><span>{new Date(q.createdAt).toLocaleDateString()}</span><span className="text-[var(--gold)]">{q.status}</span></div><p className="mt-3 text-sm">{q.items.map(i => `${i.name} × ${i.quantity}`).join(' · ')}</p>{q.location && <p className="mt-2 text-xs text-[var(--muted)]">Delivery: {q.location}</p>}</article>)}</div>}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/cart" className="btn-gold">View quotation bag <ArrowRight size={15}/></Link>
                <button onClick={signOut} className="btn-ghost border-[var(--line)] text-[var(--text)]"><LogOut size={15}/> Sign out</button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="display mt-4 text-5xl leading-[.9] md:text-7xl">Your<br/><i className="text-[var(--gold)]">Maison.</i></h1>
              <p className="mt-6 text-sm leading-7 text-[var(--muted)]">Create an account or sign in to keep your furniture quotation requests, customer details and future enquiries together.</p>
              <div className="mt-8 grid grid-cols-2 border-b border-[var(--line)]">
                <button onClick={() => {setMode('login');setError('');setMessage('')}} className={`flex items-center justify-center gap-2 border-b py-4 text-[9px] uppercase tracking-[.18em] ${mode === 'login' ? 'border-[var(--gold)] text-[var(--gold)]' : 'border-transparent text-[var(--muted)]'}`}><LogIn size={14}/> Sign in</button>
                <button onClick={() => {setMode('signup');setError('');setMessage('')}} className={`flex items-center justify-center gap-2 border-b py-4 text-[9px] uppercase tracking-[.18em] ${mode === 'signup' ? 'border-[var(--gold)] text-[var(--gold)]' : 'border-transparent text-[var(--muted)]'}`}><UserPlus size={14}/> Create account</button>
              </div>
              <form onSubmit={submit} className="mt-7 space-y-5">
                {mode === 'signup' && <label className="block text-[9px] uppercase tracking-[.15em] text-[var(--muted)]">Full name<input required value={fullName} onChange={e => setFullName(e.target.value)} className="mt-2 w-full border border-[var(--line)] bg-transparent p-4 text-sm normal-case tracking-normal text-[var(--text)] outline-none focus:border-[var(--gold)]" placeholder="Your full name" /></label>}
                <label className="block text-[9px] uppercase tracking-[.15em] text-[var(--muted)]">Email<input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full border border-[var(--line)] bg-transparent p-4 text-sm normal-case tracking-normal text-[var(--text)] outline-none focus:border-[var(--gold)]" placeholder="you@example.com" autoComplete="email" /></label>
                <label className="block text-[9px] uppercase tracking-[.15em] text-[var(--muted)]">Password<input required minLength={8} type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full border border-[var(--line)] bg-transparent p-4 text-sm normal-case tracking-normal text-[var(--text)] outline-none focus:border-[var(--gold)]" placeholder="At least 8 characters" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} /></label>
                <button disabled={loading} className="btn-gold w-full disabled:cursor-not-allowed disabled:opacity-50">{loading ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'} <ArrowRight size={15}/></button>
              </form>
              {error && <p className="mt-5 border border-red-500/30 bg-red-500/10 p-4 text-xs leading-5 text-red-300">{error}</p>}
              {message && <p className="mt-5 border border-[var(--gold)]/30 bg-[var(--gold)]/10 p-4 text-xs leading-5 text-[var(--gold)]">{message}</p>}
              <p className="mt-6 text-[9px] leading-5 text-[var(--muted)]">Authentication is handled by Appwrite. Passwords are never stored in this website's source code.</p>
            </>
          )}
        </div>
      </section>
    </main>
  )
}
