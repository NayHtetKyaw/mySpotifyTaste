"use client";

import { Title, Text, Container, Button } from "@mantine/core";


export default function HomePage(): JSX.Element {
  return (
    <Container>
      <Title order={1}>Welcome to 「My Spotify Taste」</Title>
      <Text>
        A web application that visualizes your Spotify listening history & stats.
      </Text>
    
      <Title order={2}>Get Started</Title>
    </Container>
  );  
}