"use client";

import {
  Container,
  Group,
  Flex,
  Box,
  Divider,
  Card,
  Title,
  Text,
  Avatar,
  LoadingOverlay,
} from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { fetcher } from "@/lib/api";
import { useAuth } from "../auth/hooks/useAuth";

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
  const router = useRouter();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] =
    useState<CurrentlyPlaying | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await fetcher("/api/spotify/me");
        setUserData(user);

        if (user.images?.[0]?.url) {
          setProfileImage(user.images[0].url);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        localStorage.removeItem("jwt");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchCurrentlyPlaying = async () => {
      try {
        const currentlyPlayingTrack = await fetcher("/api/spotify/now-playing");
        setCurrentlyPlaying(currentlyPlayingTrack);
      } catch (error) {
        console.error("Failed to get currently playing song!", error);
      }
    };

    fetchCurrentlyPlaying();

    const interval = setInterval(fetchCurrentlyPlaying, 10000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  if (isAuthLoading || loading) {
    return (
      <LoadingOverlay
        visible={true}
        loaderProps={{ color: "green", type: "bars" }}
      />
    );
  }

  if (!isAuthenticated) {
    return null;
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

                <Card bg="green" w="100%" p="xs" miw={200}>
                  <Box className="flex">
                    <Image
                      src={
                        currentlyPlaying.track?.album.images[0]?.url ||
                        "/assets/images/myspotifytaste.png"
                      }
                      width={50}
                      height={50}
                      alt="Album Cover"
                      className="rounded-lg max-h-[50px] max-w-[50px] self-center"
                    />
                    <Box mx="sm" className="text-zinc-800">
                      <Title order={4} textWrap="wrap">
                        {currentlyPlaying.track?.name}
                      </Title>
                      <Text>
                        {currentlyPlaying.track?.artists
                          .map((artist) => artist.name)
                          .join(", ")}
                      </Text>
                    </Box>
                  </Box>
                </Card>
              </Flex>
            ) : null}
          </Box>
        </Flex>
      </Group>

      <Group>
        <Title order={1} w="100%" className="text-center">
          Overview
        </Title>
        <Flex justify="space-around" w="100%" wrap="wrap" gap="md">
          <Card miw={300}>
            <Title order={4}>Top Artists</Title>
            <Divider size={2} my="sm" />
            <Flex justify="start" align="center" gap="sm">
              <Text>1.</Text>
              <Avatar src="/assets/images/myspotifytaste.png"></Avatar>
              <Box>
                <Title order={6}>Map Map Map</Title>
                <Text>Zutomayo</Text>
              </Box>
            </Flex>
          </Card>
          <Card miw={300}>
            <Title order={4}>Top Songs</Title>
            <Divider size={2} my="sm" />
            <Flex justify="start" align="center" gap="sm">
              <Text>1.</Text>
              <Avatar src="/assets/images/myspotifytaste.png"></Avatar>
              <Box>
                <Title order={6}>Map Map Map</Title>
                <Text>Zutomayo</Text>
              </Box>
            </Flex>
          </Card>
        </Flex>
      </Group>
    </Container>
  );
}
