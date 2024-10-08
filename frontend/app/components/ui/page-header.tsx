import {
    Container,
    Flex,
    Title,
    Text,
    Avatar,
    Button,
} from "@mantine/core";
import CurrentPlaying from "./current-playing";

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
                    <Text size="lg" fw="bold">
                        Followers : {followers.total}
                    </Text>
                    <Text size="lg" fw="bold">
                        {"Favorite genre"} : {favoriteGenre}
                    </Text>
                    <Button radius={50} color="green" mt="md">
                        View on Spotify
                    </Button>
                </Flex>
                <CurrentPlaying />
            </Flex>
        </Container>
    );
}
