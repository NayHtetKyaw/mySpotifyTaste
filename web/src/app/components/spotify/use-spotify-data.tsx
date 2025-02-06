"use client";

import { ProcessedSpotifyData} from '@components/spotify/spotify-data-provider';
import { useEffect, useState } from 'react';

export function useSpotifyData(): ProcessedSpotifyData | null {
  const [data, setData] = useState<ProcessedSpotifyData | null>(null);

  useEffect(() => {
    const dataElement = document.getElementById('spotify-data');
    if (dataElement) {
      const spotifyData = JSON.parse(dataElement.getAttribute('data-spotify') || '');
      setData(spotifyData);
    }
  }, []);

  return data;
}