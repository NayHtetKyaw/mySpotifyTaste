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
                justify="center"
                gap="md"
                mt="xl"
            >
                <Avatar src={avatarUrl} size={200} alt="user profile" />
                <Flex direction="column" justify="start">
                    <Title order={1} className="">
                        Yahoo~ {username} ☆彡
                    </Title>
                </Flex>
                <Card
                    radius="md"
                    withBorder
                    bg="green"
                    c="dark"
                    fw="bold"
                    className="justify-self-end"
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
