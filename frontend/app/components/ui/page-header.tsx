import { Container, Flex, Title, Text, Card, Avatar, Button} from "@mantine/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface PageHeaderProps {
    username: string;
    profilePicture: string;
    followers: { total: number };
    favoriteGenre: string;
}

export default function PageHeader({ 
    username,
    profilePicture,
    followers,
    favoriteGenre,
}: PageHeaderProps): JSX.Element {

    return (
        <Container fluid>
            <Flex
                direction="row"
                align="center"
                justify="start"
                className="sm: justify-center md: justify-center"
                gap="md"
                mt="xl"
                w="100%"
                wrap="wrap"
            >
                <Avatar src={profilePicture} size={200} alt="user profile" />
                <Flex direction="column" align="start" h="100%">
                    <Title order={1} className="">
                        Yahoo~ {username} ☆彡
                    </Title>
                    <Text size="lg" className="">
                        followers : {followers.total}
                    </Text>
                    <Text size="lg" className="">
                       {"Favorite genre"} : {favoriteGenre}
                    </Text>
                    <Button radius={50} color="green" mt="md" >
                        Follow on Spotify
                    </Button>
                </Flex>
                <Card
                    radius="md"
                    withBorder
                    c="dark"
                    bg="green"
                    className="lg:ml-auto lg:w-max min-w-80 md:ml-50"
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
                                {"songName"}
                            </Text>
                            <Text>{"artistName"}</Text>
                        </Flex>
                    </Flex>
                </Card>
            </Flex>
        </Container>
    );
}
