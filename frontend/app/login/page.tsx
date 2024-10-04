"use client";
import { Button, Container, Title, Text, Center } from "@mantine/core";
import { signIn } from "next-auth/react";
import { IconBrandSpotify } from '@tabler/icons-react';

export default function LoginPage() {
    return (
        <Container>
            <Center h={400}>
                <div style={{ textAlign: 'center' }}>
                    <Title order={1} mb="md">My Spotify Taste</Title>
                    <Text mb="xl">Discover your music preferences</Text>
                    <Button
                        onClick={() => signIn('spotify', { callbackUrl: '/home' })}
                        size="lg"
                        color="green"
                        leftSection={<IconBrandSpotify size={24} />}
                    >
                        Sign in with Spotify
                    </Button>
                </div>
            </Center>
        </Container>
    );
}