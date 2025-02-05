"use client";

import React, { useState } from "react";
import {
    Container,
    Flex,
    Title,
    Text,
    Divider,
    TextInput,
    Button,
    Group,
} from "@mantine/core";
import axios from "axios";

export default function ContactForm() {
     const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        const formData = new FormData(event.target as HTMLFormElement);
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phoneNumber: formData.get('phoneNumber'),
        };

        try {
            const response = await fetch('http://localhost:8080/dataController.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result);
        } catch (error) {
            console.error('Error:', error);
            if (error instanceof Error) {
                setError('Failed to send message: ' + error.message);
            } else {
                setError('Failed to send message');
            }
        }
    };

    return (
        <Container>
            <Flex direction="column" align="center">
                <Title mb="md" c="white">About Us</Title>
                <Text size="md" color="white">
                    We provide insightful statistics and analytics for your
                    Spotify listening experience. Empowering music lovers with
                    detailed statistics on their Spotify habits, helping them
                    discover new music, and enhancing their listening
                    experience.
                </Text>
            </Flex>

            <Divider my="md" />

            <form onSubmit={handleSubmit}>
            <Flex direction="column" justify="center" gap="lg">
                <Title order={2} c="white" className="text-center">Contact our team</Title>
                <Group gap="xl">
                    <TextInput
                        label="First Name"
                        placeholder="First name"
                        radius="md"
                        name="firstName"
                        required
                        styles={{
                            input: {
                                backgroundColor: "#f0f0f0",
                                width: "300px",
                            },
                            label: {
                                marginBottom: "0.5rem",
                            },
                        }}
                    />
                    <TextInput
                        label="Last Name"
                        placeholder="Last name"
                        radius="md"
                        name="lastName"
                        required
                        styles={{
                            input: {
                                backgroundColor: "#f0f0f0",
                                width: "300px",
                            },
                            label: {
                                marginBottom: "0.5rem",
                            },
                        }}
                    />
                </Group>
                <TextInput
                    label="Email"
                    placeholder="youremail@gmail.com"
                    radius="md"
                    name="email"
                    type="email"
                    required
                    styles={{
                        input: {
                            backgroundColor: "#f0f0f0",
                            width: "400px",
                        },
                        label: {
                            marginBottom: "0.5rem",
                        },
                    }}
                />
                <TextInput
                    label="Phone Number"
                    placeholder="Phone number"
                    radius="md"
                    name="phoneNumber"
                    type="tel"
                    required
                    styles={{
                        input: {
                            backgroundColor: "#f0f0f0",
                            width: "400px",
                        },
                        label: {
                            marginBottom: "0.5rem",
                        },
                    }}
                />
                <center>
                    <Button
                        type="submit"
                        color="green"
                        radius="xl"
                        size="md"
                
                    >
                        Send Messages
                    </Button>
                </center>
            </Flex>
            </form>
        </Container>
    );
}
