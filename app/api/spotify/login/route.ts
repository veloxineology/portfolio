import { NextResponse } from 'next/server'

export async function GET() {
  const client_id = process.env.SPOTIFY_CLIENT_ID
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI
  const scopes = [
    'user-read-currently-playing',
    'user-read-playback-state',
  ].join(' ')

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: client_id || '',
    scope: scopes,
    redirect_uri: redirect_uri || '',
  })

  return NextResponse.redirect(
    `https://accounts.spotify.com/authorize?${params.toString()}`
  )
} 
