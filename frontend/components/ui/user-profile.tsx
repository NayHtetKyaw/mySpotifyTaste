"use client";
import { Container, Flex, Title, Avatar, Group, Text } from "@mantine/core";

export default function UserProfile({
    username,
    userid,
    avatarUrl,
}: {
    username: string;
    userid: string;
    avatarUrl: string;
}): JSX.Element {

    const openSpotifyApp = () => {
        const spotifyUri = `spotify://user/${userid}`;
        const webUrl = `https://open.spotify.com/user/${userid}`;

        const newTab = window.open(spotifyUri, '_blank');

        setTimeout(() => {
            if (newTab) {
                newTab.location.href = webUrl;
            } else {
                window.open(webUrl, '_blank');
            }
        }, 10000);
    };

    return (
        <Container fluid>
            <Flex
                direction="column"
                align="center"
                justify="center"
                gap="md"
                mt="xl"
            >
                <Avatar src={avatarUrl} size={200} alt="user profile" />
                <Flex direction="column" justify="start">
                    <Title>
                        {username}
                    </Title>
                </Flex>
                <Group align="center" gap="xl">
                    <Text onClick={openSpotifyApp} style={{ cursor: 'pointer', color: 'blue' }}>
                        Open in Spotify
                    </Text>
                    <Text>"Number of followers" Followers</Text>
                    <Text>Follow</Text>
                </Group>
            </Flex>
        </Container>
    );
}
