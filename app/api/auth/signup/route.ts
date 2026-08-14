import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { randomUUID } from 'crypto'

const PROJECT_ID = 'kb-yusuf-furniture'
const ENDPOINT = 'https://cloud.appwrite.io/v1'
const COOKIE_NAME = `a_session_${PROJECT_ID}`

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = String(body?.name || '').trim()
    const email = String(body?.email || '').trim().toLowerCase()
    const password = String(body?.password || '')

    if (name.length < 2) return NextResponse.json({ error: 'Please enter your full name.' }, { status: 400 })
    if (!email || !email.includes('@')) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    if (password.length < 8) return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })

    const createResponse = await fetch(`${ENDPOINT}/account`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Appwrite-Project': PROJECT_ID },
      body: JSON.stringify({ userId: randomUUID(), email, password, name }),
      cache: 'no-store',
    })

    const created = await createResponse.json()
    if (!createResponse.ok) {
      return NextResponse.json({ error: created?.message || 'Unable to create the account.' }, { status: createResponse.status })
    }

    const sessionResponse = await fetch(`${ENDPOINT}/account/sessions/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Appwrite-Project': PROJECT_ID },
      body: JSON.stringify({ email, password }),
      cache: 'no-store',
    })

    const session = await sessionResponse.json()
    if (!sessionResponse.ok) {
      return NextResponse.json({ error: session?.message || 'Account created, but automatic sign-in failed. Please sign in.' }, { status: sessionResponse.status })
    }

    const cookieStore = await cookies()
    cookieStore.set(COOKIE_NAME, session.secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(session.expire),
      path: '/',
    })

    return NextResponse.json({ success: true, user: created })
  } catch {
    return NextResponse.json({ error: 'Something went wrong while creating your account.' }, { status: 500 })
  }
}
