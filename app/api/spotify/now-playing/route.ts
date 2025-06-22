import { NextResponse } from 'next/server'

// If you see a type error for 'process', install @types/node as a dev dependency.
// The 'next' property is not valid in fetch options for Node.js, so it's removed.

async function getAccessToken() {
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN
  const client_id = process.env.SPOTIFY_CLIENT_ID
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET

  if (!refresh_token || !client_id || !client_secret) {
    throw new Error('Missing Spotify credentials')
  }

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token,
  })

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
    throw new Error('Failed to refresh access token')
  }
  return data.access_token
}

export async function GET() {
  try {
    const accessToken = await getAccessToken()
    const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!res.ok) {
      return NextResponse.json({ isPlaying: false }, { status: 200 })
    }

    const data = await res.json()
    if (!data || !data.item) {
      return NextResponse.json({ isPlaying: false }, { status: 200 })
    }

    let playlistName = undefined
    let playlistOwner = undefined
    if (data.context && data.context.type === 'playlist' && data.context.href) {
      try {
        const playlistRes = await fetch(data.context.href, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        if (playlistRes.ok) {
          const playlistData = await playlistRes.json()
          playlistName = playlistData.name
          playlistOwner = playlistData.owner?.display_name
        }
      } catch (e) {
        // Ignore playlist fetch errors
      }
    }

    const track = {
      name: data.item.name,
      artist: data.item.artists.map((a: any) => a.name).join(', '),
      album: data.item.album.name,
      image: data.item.album.images?.[2]?.url || data.item.album.images?.[0]?.url || '', // 64x64 or fallback
      isPlaying: data.is_playing,
      playlistOwner,
    }

    return NextResponse.json(track)
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message || 'Failed to fetch from Spotify' }, { status: 500 })
  }
} 
