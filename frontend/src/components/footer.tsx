'use client';

import { Container, Flex, Text } from "@radix-ui/themes";

export default function Footer() {
    return (
        <Container height="100px">
            <Flex direction="column" justify="center" align="center" height="100%">
                <Flex align="center" gap="4" mb="1">
                    <Text size="3">
                        <a href="/help" className="text-gray-500 no-underline hover:text-green-500">Help</a>
                    </Text>
                    <Text size="3">
                        <a href="/privacy" className="text-gray-500 no-underline hover:text-green-500">Privacy Policy</a>
                    </Text>
                    <Text size="3">
                        <a href="/terms" className="text-gray-500 no-underline hover:text-green-500">Terms of Use</a>
                    </Text>
                </Flex>
                <Text size="3" className="text-gray-500">&copy; {new Date().getFullYear()} Spotify Stats. All rights reserved.</Text>
            </Flex>
        </Container >
    );
}
