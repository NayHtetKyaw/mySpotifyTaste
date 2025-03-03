"use client";

import {
  Title,
  Text,
  Container,
  Button,
  Flex,
  Box,
  LoadingOverlay,
} from "@mantine/core";

import Image from "next/image";
import { IconCircleCheck } from "@tabler/icons-react";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AuthWrapper from "@components/middleware/authWrapper";

const features = [
  "Visualize your Spotify listening history & stats",
  "View your top tracks, artists, and genres",
  "Discover new music based on your listening habits",
  "Compare your listening habits with friends",
  "Share your listening history with others",
];

export default function HomePage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("jwt");
      setIsLoggedIn(!!token);
    };

    checkAuth();

    window.addEventListener("storage", checkAuth);

    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogin = async () => {
    const token = localStorage.getItem("jwt");

    if (token) {
      router.push("/home");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/auth/login`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Login response:", data);

      if (!data.login_url) {
        throw new Error("login_url is missing in the response");
      }

      window.location.href = data.login_url;
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <LoadingOverlay
        visible={true}
        loaderProps={{ color: "green", type: "bars" }}
      />
    );
  }

  return (
    <AuthWrapper>
      <Container>
        <Flex justify="center" direction="column">
          <Box className="flex flex-col items-center text-center" m="lg">
            <Title size={40}>Welcome to MySpotifyTaste</Title>
            <Title order={4} c="green" my="md">
              Visualize your Spotify listening history & stats
            </Title>
          </Box>

          <Flex wrap="wrap" justify="space-evenly" align="center">
            <Box>
              <Image
                src="/assets/images/myspotifytaste.png"
                width={500}
                height={500}
                alt="Spotify Logo"
                className="rounded-full"
              />
            </Box>
            <Box mt="xl">
              <Title order={2} size={30}>
                Features
              </Title>
              {features.map((feature) => (
                <Flex key={feature} gap="xs" my="xs">
                  <IconCircleCheck
                    size={25}
                    className="text-green-400 shrink-0 self-center"
                  />
                  <Text className="text-start self-center" size="lg">
                    {feature}
                  </Text>
                </Flex>
              ))}

              <Button
                my="md"
                radius="sm"
                variant="filled"
                color="green"
                fullWidth
                size="lg"
                onClick={handleLogin}
              >
                {isLoggedIn ? "Go to Dashboard" : "Get Started"}
              </Button>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </AuthWrapper>
  );
}
