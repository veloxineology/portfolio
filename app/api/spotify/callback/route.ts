import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 })
  }

  const client_id = process.env.SPOTIFY_CLIENT_ID
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirect_uri || '',
  })

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    })

    const data = await response.json()
    if (!response.ok) {
      return NextResponse.json({ error: data }, { status: 400 })
    }

    // For now, just return the tokens as JSON
    return NextResponse.json({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
      scope: data.scope,
      token_type: data.token_type,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to exchange code for tokens' }, { status: 500 })
  }
} 
