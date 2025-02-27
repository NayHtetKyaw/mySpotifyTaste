import {
  Container,
  Group,
  Flex,
  Box,
  Card,
  Title,
  Text,
  Avatar,
} from "@mantine/core";
import Image from "next/image";

export default function Home() {
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
              src="/assets/images/myspotifytaste.png"
              w={200}
              h={200}
              alt="Spotify Logo"
              radius="100%"
            />
          </Box>
          <Box className="flex flex-col  items-start">
            <Text size="xl" fw="bold">
              Username : Anascence
            </Text>
            <Text>Followers : 10</Text>
            <Text>Recently Played : Aimer</Text>
            <Text>Fav Genre : J-Pop</Text>
            <Flex mt="sm" direction="column">
              <Title order={4}>Listening to:</Title>
              <Card bg="green">
                <Box className="flex">
                  <Image
                    src="/assets/images/myspotifytaste.png"
                    width={50}
                    height={50}
                    alt="Spotify Logo"
                    className="rounded-lg"
                  />
                  <Box mx="sm" className="text-zinc-800">
                    <Title order={4}>Artist Name</Title>
                    <Text>Song Name real real long long long long</Text>
                  </Box>
                </Box>
              </Card>
            </Flex>
          </Box>
        </Flex>
      </Group>
    </Container>
  );
}
