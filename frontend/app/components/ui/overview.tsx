"use client";
import { Title, Card, Box, Flex, Container, Text } from "@mantine/core";
import Image from "next/image";
import TopArtists from "./top-artists";
import TopSongs from "./top-songs";
import { useEffect, useState } from "react";

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
}

interface Track {
  id: string;
  name: string;
  album: {
    images: { url: string }[];
  };
}

export default function Overview(): JSX.Element {
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [topSongsPlayTime, setTopSongsPlayTime] = useState<number>(0);
  const [allTimePlayedTime, setAllTimePlayedTime] = useState<number>(0);

  useEffect(() => {
    const fetchTopItems = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const access_token =
          urlParams.get("access_token") ||
          localStorage.getItem("spotify_access_token");
        if (!access_token) {
          console.error("No access token available");
          return;
        }
        const response = await fetch(
          `/api/spotify?access_token=${access_token}&term=medium_term&limit=10`
        );
        if (response.ok) {
          const data = await response.json();
          setTopArtists(data.topArtists || []);
          setTopTracks(data.topTracks || []);
          setTopSongsPlayTime(data.topSongsPlayTime || 0);
          setAllTimePlayedTime(data.allTimePlayedTime || 0);
        } else {
          console.error("Failed to fetch top items");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTopItems();
  }, []);

  const TopItemsDisplay = ({
    items,
    isArtist,
  }: {
    items: (Artist | Track)[];
    isArtist: boolean;
  }) => {
    if (!items || items.length === 0) return null;

    const reorderedItems = [
      items[1], 
      items[0], 
      items[2], 
    ];

    return (
      <Box className="mb-8">
        <Flex gap="md" justify="center" align="center">
          {reorderedItems.map((item, index) => {
            if (!item) return null;
            
            const imageUrl = isArtist
              ? (item as Artist).images[0]?.url
              : (item as Track).album?.images[0]?.url;

            if (!imageUrl) return null;

            const isMiddle = index === 1; 
            const imageSize = isMiddle ? 180 : 150;

            return (
              <Box 
                key={item.id} 
                className={`text-center transition-transform duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105 ${
                  isMiddle ? 'z-10' : 'z-0'
                }`}
              >
                <div className="relative">
                  <Image
                    src={imageUrl}
                    width={imageSize}
                    height={imageSize}
                    alt={item.name}
                    className="rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                  />
                </div>
                <Text 
                  size={isMiddle ? "md" : "sm"} 
                  fw={isMiddle ? 700 : 400}
                  className="mt-2"
                >
                  {item.name}
                </Text>
              </Box>
            );
          })}
        </Flex>
      </Box>
    );
  };

  return (
    <Container fluid>
      <Flex direction="column" align="center" className="w-full">
        <Flex
          direction={{ xs: "column", md: "column", lg: "row" }}
          justify="space-around"
          gap="md"
          w="100%"
        >
          <Box w="100%" mt="lg">
            <TopItemsDisplay 
              items={topArtists} 
              isArtist={true} 
            />
            <TopArtists />
          </Box>
          <Box w="100%" mt="lg">
            <TopItemsDisplay 
              items={topTracks}
              isArtist={false} 
            />
            <TopSongs />
          </Box>
        </Flex>
      </Flex>
    </Container>
  );
}