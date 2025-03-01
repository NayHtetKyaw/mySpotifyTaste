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
import internal from "stream";

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
  const [profileImage, setProfileImage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await fetcher("/api/spotify/me");
        setUserData(user);

        if (user.images?.[0]?.url) {
          setProfileImage(user.images[0].url);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchCurrentlyPlaying();

    const interval = setInterval(() => {
      fetchCurrentlyPlaying();
    }, 15000);

    async function fetchCurrentlyPlaying() {
      try {
        const currentlyPlayingTrack = await fetcher("/api/spotify/now-playing");
        setCurrentlyPlaying(currentlyPlayingTrack);
      } catch (error) {
        console.error("Failed to get currently playing song!", error);
      }
    }

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <LoadingOverlay
        visible={true}
        loaderProps={{ color: "green", type: "bars" }}
      />
    );
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
              src={profileImage || "/assets/images/myspotifytaste.png"}
              w={200}
              h={200}
              alt="User Profile"
              radius="100%"
            />
          </Box>
          <Box className="flex flex-col items-start">
            <Title fw="bold" c="green">
              {userData?.display_name}
            </Title>
            <Text>Followers: {userData?.followers?.total || 0}</Text>

            {currentlyPlaying?.playing ? (
              <Flex mt="sm" direction="column" w="100%">
                <Title order={4}>Listening to 🎧:</Title>
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
              </Flex>
            ) : (
              <></>
            )}
          </Box>
        </Flex>
      </Group>
    </Container>
  );
}
