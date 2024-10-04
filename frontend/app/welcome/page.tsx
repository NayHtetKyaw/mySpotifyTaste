"use client";

import { Title, Text, Container, Button, Flex, Box } from "@mantine/core";
import Image from "next/image";
import { IconCircleCheck } from "@tabler/icons-react";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const features = [
  "Visualize your Spotify listening history & stats",
  "View your top tracks, artists, and genres",
  "Discover new music based on your listening habits",
  "Compare your listening habits with friends",
  "Share your listening history with others",
];

export default function WelcomePage(): JSX.Element {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to /home if authenticated
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home");
    }
  }, [status, router]);

  // Trigger Spotify sign-in
  const loginHandler = () => {
    signIn("spotify", { callbackUrl: "/login" });
  };

  // Loading state
  if (status === "loading") {
    return (
      <Container>
        <Title order={1}>Loading...</Title>
      </Container>
    );
  }

  return (
    <Container className="text-center" fluid>
      <Title className="sm:text-md md:text-3xl lg:text-4xl">
        Welcome to 『My Spotify Taste』
      </Title>
      <Text className="m-2">
        Visualize your Spotify listening history & stats
      </Text>
      <Flex direction="row" gap="xs" justify="space-around" wrap="wrap" m="xl">
        <Box>
          <Image
            src="/assets/images/myspotifytaste.png"
            width={500}
            height={500}
            alt="Spotify Logo"
            className="rounded-lg"
          />
        </Box>
        <Box>
          <Title order={2} mb="lg" className="text-start text-green-500">
            Our Features
          </Title>
          {features.map((feature) => (
            <Flex key={feature} align="start" gap="xs" mb="xs">
              <IconCircleCheck size={30} className="text-green-400" />
              <Text className="text-start">{feature}</Text>
            </Flex>
          ))}

          <Flex direction="column" align="center" mt={150}>
            <Text>Get started now & discover your music taste!</Text>
            <Button
              size="lg"
              radius="xl"
              color="green"
              variant="light"
              className="mt-4"
              onClick={loginHandler}
            >
              Get Started
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
}