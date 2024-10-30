"use client";
import { Title, Card, Box, Flex, Container, Text } from "@mantine/core";
import Image from "next/image";
import TopArtists from "./top-artists";
import TopSongs from "./top-songs";
import { useEffect, useState } from "react";

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
}

interface Track {
  id: string;
  name: string;
  album: {
    images: { url: string }[];
  };
}

export default function Overview(): JSX.Element {
  return (
    <Container fluid>
      <Flex direction="column" align="center" className="w-full">
        <Flex
          direction={{ xs: "column", md: "column", lg: "row" }}
          justify="space-around"
          gap="md"
          w="100%"
        >
          <Box w="100%" mt="lg">
            <TopArtists />
          </Box>
          <Box w="100%" mt="lg">
            <TopSongs />
          </Box>
        </Flex>
      </Flex>
    </Container>
  );
}