// app/components/TopTracks.tsx
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getTopTracks } from "@lib/spotify";

export default function TopTracks() {
  const { data: session } = useSession();
  const [tracks, setTracks] = useState<SpotifyApi.TrackObjectFull[]>([]);

  useEffect(() => {
    async function fetchTracks() {
      if (session?.accessToken) {
        const topTracks = await getTopTracks(session.accessToken);
        setTracks(topTracks);
      }
    }
    
    fetchTracks();
  }, [session]);

  return (
    <div>
      <h2>Your Top Tracks</h2>
      <ul>
        {tracks.map((track: any) => (
          <li key={track.id}>{track.name} - {track.artists[0].name}</li>
        ))}
      </ul>
    </div>
  );
}