"use client";
import { Container, Title, Text, Button, Center } from "@mantine/core";
import { useSearchParams } from 'next/navigation';
import { signIn } from "next-auth/react";

export default function AuthError() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    const getErrorMessage = (error: string | null) => {
        switch (error) {
            case 'AccessDenied':
                return 'You denied access to your Spotify account';
            case 'Configuration':
                return 'There is a problem with the server configuration';
            default:
                return 'An error occurred during authentication';
        }
    };

    return (
        <Container>
            <Center h={400}>
                <div style={{ textAlign: 'center' }}>
                    <Title order={1} c="red" mb="md">Authentication Error</Title>
                    <Text mb="xl" size="lg">{getErrorMessage(error)}</Text>
                    <Button
                        onClick={() => signIn('spotify', { callbackUrl: '/home' })}
                        size="lg"
                        color="green"
                        mb="md"
                    >
                        Try Again
                    </Button>
                    <br />
                    <Button
                        onClick={() => window.location.href = '/'}
                        variant="subtle"
                    >
                        Back to Home
                    </Button>
                </div>
            </Center>
        </Container>
    );
}