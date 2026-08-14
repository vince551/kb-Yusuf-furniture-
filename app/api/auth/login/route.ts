import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const PROJECT_ID = 'kb-yusuf-furniture'
const ENDPOINT = 'https://cloud.appwrite.io/v1'
const COOKIE_NAME = `a_session_${PROJECT_ID}`

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = String(body?.email || '').trim().toLowerCase()
    const password = String(body?.password || '')

    if (!email || !password) return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })

    const response = await fetch(`${ENDPOINT}/account/sessions/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Appwrite-Project': PROJECT_ID },
      body: JSON.stringify({ email, password }),
      cache: 'no-store',
    })

    const session = await response.json()
    if (!response.ok) return NextResponse.json({ error: session?.message || 'Invalid email or password.' }, { status: response.status })

    const cookieStore = await cookies()
    cookieStore.set(COOKIE_NAME, session.secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(session.expire),
      path: '/',
    })

    const userResponse = await fetch(`${ENDPOINT}/account`, {
      headers: { 'X-Appwrite-Project': PROJECT_ID, 'X-Appwrite-Session': session.secret },
      cache: 'no-store',
    })
    const user = await userResponse.json()

    return NextResponse.json({ success: true, user })
  } catch {
    return NextResponse.json({ error: 'Unable to sign in right now. Please try again.' }, { status: 500 })
  }
}
