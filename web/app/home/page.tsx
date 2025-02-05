"use client";

import { Container, Loader, Center, Text, Title, Flex } from "@mantine/core";
import PageHeader from "@components/ui/page-header";
import HeaderTabs from "@components/ui/header-tabs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { spotifyApi, SpotifyUser } from "@lib/api-client";

interface userData {
  user: SpotifyUser;
  topGenre: string;
  allTimePlayedTime: number;
}

export default function HomePage(): JSX.Element {
  const [userData, setUserData] = useState<userData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async() => {

      const urlParams = new URLSearchParams(window.location.search)
      const access_token = urlParams.get("access_token")

      if (access_token) {
        spotifyApi.setAccessToken(access_token)
        localStorage.setItem("spotify_access_token", access_token)
        window.history.replaceState({}, document.title, "/home")
      }

      if (!spotifyApi.isAuthenticated() && !access_token) {
        router.push("/")
        return
      }
    };

    const fetchUserData = async() => {
      try {
        const userProfile = await spotifyApi.getUserProfile();
        const topArtists = await spotifyApi.getTopArtists();

        //top genre calculation
        const genreCounts: Record<string, number> = {};
        topArtists.items.forEach((artist: any) => {
          artist.genres.forEach((genre: string) => {
            genreCounts[genre] = genreCounts[genre] ? genreCounts[genre] + 1 : 1;
          });
        });

        const topGenre = Object.entries(genreCounts).sort(([,a], [,b]) => b - a)[0]?.[0] || ["N/A"];

        setUserData({
          user: userProfile, 
          topGenre: topGenre,
          allTimePlayedTime: topArtists.items.reduce((acc: number, artist: any) => acc + artist.duration_ms, 0)
        })
      } catch (error) {
        console.log("Failed to fetch user data", error)
        if (error instanceof Error && error.message.includes("No access token")) {
          router.push("/")  
        }
      } finally {
        setLoading(false)
      }
    }

    initializeAuth().then(fetchUserData)
  }, [router])


  if (loading) {
    return (
      <Container className="flex items-center justify-center h-full">
        <Center>
          <Loader color="green" type="bars" size="lg" />
        </Center>
      </Container>
    )
  }

  return (
    <Container fluid mb="xl">
      {userData ? (
         <PageHeader
        username={userData.user.display_name}
        profilePicture={
          userData.user.images[0]?.url || "/assets/images/myspotifytaste.png"
        }
        followers={userData.user.followers}
        favoriteGenre={userData.topGenre.toUpperCase()}
        allTimePlayedTime={userData.allTimePlayedTime}
      />
      ) : (
        <Text mt="xl">
          Failed to fetch user data
        </Text> 
      )}
      <HeaderTabs />
    </Container>
  );
}
