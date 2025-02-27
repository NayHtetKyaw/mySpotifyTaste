import { Title, Text, Container, Button, Flex, Box } from "@mantine/core";
import Image from "next/image";
import { IconCircleCheck } from "@tabler/icons-react";

const features = [
  "Visualize your Spotify listening history & stats",
  "View your top tracks, artists, and genres",
  "Discover new music based on your listening habits",
  "Compare your listening habits with friends",
  "Share your listening history with others",
];

export default function HomePage() {
  return (
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
            >
              Get Started
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Container>
  );
}
