import { Client, Account, Databases } from 'appwrite'

// The project ID is intentionally kept here so the frontend can work without
// requiring you to configure another environment variable in SPCK/Vercel.
const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || 'kb-yusuf-furniture'

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(APPWRITE_PROJECT_ID)

export const account = new Account(client)
export const databases = new Databases(client)
export default client
