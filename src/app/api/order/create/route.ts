import { getErrorResponse } from '@/lib/helpers'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

// This route handles the creation of an order by making a POST request to the core API.
export async function POST(req: NextRequest) {
  const cookieStore = cookies()
  const token = cookieStore.get('session_token')?.value

  try {
    const body = await req.json()

    const response = await fetch(`${process.env.NEXT_PUBLIC_CORE_API}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })

    return response
  } catch (error: any) {
    return getErrorResponse(500, error.message)
  }
}
