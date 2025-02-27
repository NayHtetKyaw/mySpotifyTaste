"use client";

import {
  Container,
  Group,
  Flex,
  Box,
  Card,
  Title,
  Text,
  Avatar,
  LoadingOverlay,
} from "@mantine/core";
import Image from "next/image";

import { useState, useEffect } from "react";
import { fetcher } from "@/lib/api";

interface UserData {
  id: string;
  display_name: string;
  email: string;
  profile_image: string;
  followers?: {
    total: number;
  };
}

interface CurrentlyPlaying {
  playing: boolean;
  track?: {
    name: string;
    artists: Array<{ name: string }>;
    album: {
      images: Array<{ url: string }>;
    };
  };
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] =
    useState<CurrentlyPlaying | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await fetcher("/api/spotify/me");
        setUserData(user);

        const nowPlaying = await fetcher("/api/spotify/now-playing");
        setCurrentlyPlaying(nowPlaying);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingOverlay visible={true} />;
  }

  return (
    <Container>
      <Group bg="dark" m="md">
        <Flex
          align="center"
          gap="md"
          miw="100%"
          p="md"
          justify="space-around"
          wrap="wrap"
        >
          <Box>
            <Avatar
              src={
                userData?.profile_image || "/assets/images/myspotifytaste.png"
              }
              w={200}
              h={200}
              alt="User Profile"
              radius="100%"
            />
          </Box>
          <Box className="flex flex-col items-start">
            <Text size="xl" fw="bold">
              Username: {userData?.display_name}
            </Text>
            <Text>Followers: {userData?.followers?.total || 0}</Text>
            <Text>Email: {userData?.email}</Text>

            <Flex mt="sm" direction="column" w="100%">
              <Title order={4}>Listening to:</Title>
              {currentlyPlaying?.playing ? (
                <Card bg="green" w="100%">
                  <Box className="flex">
                    <Image
                      src={
                        currentlyPlaying.track?.album.images[0]?.url ||
                        "/assets/images/myspotifytaste.png"
                      }
                      width={50}
                      height={50}
                      alt="Album Cover"
                      className="rounded-lg"
                    />
                    <Box mx="sm" className="text-zinc-800">
                      <Title order={4}>{currentlyPlaying.track?.name}</Title>
                      <Text>
                        {currentlyPlaying.track?.artists
                          .map((artist) => artist.name)
                          .join(", ")}
                      </Text>
                    </Box>
                  </Box>
                </Card>
              ) : (
                <Text>Nothing at the moment</Text>
              )}
            </Flex>
          </Box>
        </Flex>
      </Group>
    </Container>
  );
}
