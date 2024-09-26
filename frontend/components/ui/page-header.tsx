import { Container, Flex, Title, Text, Box, Card, Avatar } from "@mantine/core";

export default function PageHeader({
    username,
    avatarUrl,
    songName,
    artistName,
}: {
    username: string;
    avatarUrl: string;
    songName: string;
    artistName: string;
}): JSX.Element {
    return (
        <Container fluid> 
            <Flex
                direction="row"
                align="center"
                justify="start"
                gap="md"
                mt="xl"
                w="100%"
                wrap="wrap"
            >
                <Avatar src={avatarUrl} size={200} alt="user profile" />
                <Flex direction="column" align="start" h="100%" className="">
                    <Title order={1} className="">
                        Yahoo~ {username} ☆彡
                    </Title>
                    <Text size="lg" className="">
                       `{"followerCount"}` : followers on Spotify
                    </Text>
                    <Text size="lg" className="">
                       Favorite genre : `{"favoriteGenre"}`
                    </Text>
                </Flex>
                <Card
                    radius="md"
                    withBorder
                    c="dark"
                    bg="green"
                    className="ml-auto lg:w-max min-w-80"
                >
                    <Text mb="xs" className="">
                    Now Playing...
                    </Text>
                    <Flex direction="row" gap="md">
                        <Avatar
                            src="/assets/images/myspotifytaste.png"
                            size={55}
                            className="self-center"
                        />
                        <Flex direction="column">
                            <Text size="lg" fw="bold">
                                {songName}
                            </Text>
                            <Text>{artistName}</Text>
                        </Flex>
                    </Flex>
                </Card>
            </Flex>
        </Container>
    );
}
