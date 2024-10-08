import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Divider,
  Title,
  Text,
  Flex,
  Select,
  Stack,
} from "@mantine/core";

interface Genre {
  name: string;
}

export default function TopGenres(): JSX.Element {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [term, setTerm] = useState("short_term");

  useEffect(() => {
    const fetchTopSongs = async () => {
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
          `/api/spotify?access_token=${access_token}&term=${term}`
        );
        if (response.ok) {
          const data = await response.json();
          setGenres(data.topGenres);
        } else {
          console.error("Failed to fetch top songs");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTopSongs();
  }, [term]);

  return (
    <>
      <Title order={1} mt="lg" className="text-center">
        Top Songs
      </Title>
      <Flex justify="center" mt="md">
        <Select
          value={term}
          onChange={(value) => setTerm(value ?? "short_term")}
          data={[
            { value: "short_term", label: "Short Term" },
            { value: "medium_term", label: "Medium Term" },
            { value: "long_term", label: "Long Term" },
          ]}
          placeholder="Select Term"
          mr="md"
        />
      </Flex>
      <Container mt="md">
        <Stack bg="dark" className="rounded-lg">
          <Title order={4} mt="lg" className="text-center">
            {genres.length > 0 ? (
              genres.map((genre, index) => (
                <>
                  <Flex key={index} justify="start" gap="md">
                    <Box w="6%" className="text-right">
                      {index + 1}.
                    </Box>
                    <Box>{genre.name}</Box>
                  </Flex>
                  <Divider my="md" />
                </>
              ))
            ) : (
              <Text>No genres available</Text>
            )}
          </Title>
          <Divider my="md" />
        </Stack>
      </Container>
    </>
  );
}
