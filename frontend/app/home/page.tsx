"use client";
import { Container, Loader, Center, Text, Title, Flex } from "@mantine/core";
import PageHeader from "@components/ui/page-header";
import HeaderTabs from "@components/ui/header-tabs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface userData {
  user: {
    display_name: string;
    followers: { total: number };
    images: { url: string }[];
    favoriteGenre: string;
  };

  topTracks: any[];
  topArtists: any[];
  topGenre: string;
}

export default function HomePage(): JSX.Element {
  const [userData, setUserData] = useState<userData | null>(null);
  const [Loading, setloading] = useState(true);
  const [allTimePlayedTime, setAllTimePlayedTime] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const urlParms = new URLSearchParams(window.location.search);
        const access_token = urlParms.get("access_token");

        if (!access_token) {
          router.push("/");
          return;
        }

        const response = await fetch(
          `/api/spotify?access_token=${access_token}`
        );
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setAllTimePlayedTime(data.allTimePlayedTime);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setloading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (Loading) {
    return (
      <Container className="flex items-center justify-center h-full">
        <Center>
          <Loader color="green" type="bars" />
        </Center>
      </Container>
    );
  }

  if (!userData) {
    return (
      <Container>
        <Text size="xl">Error fetching user data</Text>
      </Container>
    );
  }

  return (
    <Container fluid mb="xl">
      <PageHeader
        username={userData.user.display_name}
        profilePicture={
          userData.user.images[1].url || "/assets/images/myspotifytaste.png"
        }
        followers={userData.user.followers}
        favoriteGenre={userData.topGenre.toUpperCase() || "N/A"}
        allTimePlayedTime={Math.ceil(allTimePlayedTime)}
      />
      <HeaderTabs />
    </Container>
  );
}
