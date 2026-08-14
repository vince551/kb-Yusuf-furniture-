import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const PROJECT_ID = 'kb-yusuf-furniture'
const ENDPOINT = 'https://cloud.appwrite.io/v1'
const COOKIE_NAME = `a_session_${PROJECT_ID}`

export async function GET() {
  const session = (await cookies()).get(COOKIE_NAME)?.value
  if (!session) return NextResponse.json({ user: null }, { status: 200 })

  try {
    const response = await fetch(`${ENDPOINT}/account`, {
      headers: { 'X-Appwrite-Project': PROJECT_ID, 'X-Appwrite-Session': session },
      cache: 'no-store',
    })
    if (!response.ok) return NextResponse.json({ user: null }, { status: 200 })
    return NextResponse.json({ user: await response.json() })
  } catch {
    return NextResponse.json({ user: null }, { status: 200 })
  }
}

export async function DELETE() {
  const cookieStore = await cookies()
  const session = cookieStore.get(COOKIE_NAME)?.value

  if (session) {
    await fetch(`${ENDPOINT}/account/sessions/current`, {
      method: 'DELETE',
      headers: { 'X-Appwrite-Project': PROJECT_ID, 'X-Appwrite-Session': session },
      cache: 'no-store',
    }).catch(() => undefined)
  }

  cookieStore.set(COOKIE_NAME, '', { httpOnly: true, expires: new Date(0), path: '/' })
  return NextResponse.json({ success: true })
}
