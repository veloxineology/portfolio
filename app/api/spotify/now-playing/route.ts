import { NextResponse } from 'next/server'

// If you see a type error for 'process', install @types/node as a dev dependency.
// The 'next' property is not valid in fetch options for Node.js, so it's removed.

export async function GET() {
  const accessToken = process.env.SPOTIFY_ACCESS_TOKEN
  if (!accessToken) {
    return NextResponse.json({ error: 'Spotify access token not set' }, { status: 500 })
  }

  try {
    const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      // Removed 'next' property
    })

    if (!res.ok) {
      return NextResponse.json({ isPlaying: false }, { status: 200 })
    }

    const data = await res.json()
    if (!data || !data.item) {
      return NextResponse.json({ isPlaying: false }, { status: 200 })
    }

    const track = {
      name: data.item.name,
      artist: data.item.artists.map((a: any) => a.name).join(', '),
      album: data.item.album.name,
      image: data.item.album.images?.[2]?.url || data.item.album.images?.[0]?.url || '', // 64x64 or fallback
      isPlaying: data.is_playing,
    }

    return NextResponse.json(track)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch from Spotify' }, { status: 500 })
  }
} 
