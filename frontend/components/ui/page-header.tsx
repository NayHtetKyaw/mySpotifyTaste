import { Container, Flex, Title, Text, Card, Avatar, Button} from "@mantine/core";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import spotifyWebApi from "@lib/spotify";


interface PageHeaderProps {
    username: string;
    avatarUrl: string;
    songName: string;
    artistName: string;
}

interface SpotifyData {
    username: string;
    followers: number;
    favoriteGenre: string;
    currentPlayingSong: {
        name: string;
        artist: string;
        imageUrl: string;
    } | null;
}

export default function PageHeader({
    username,
    avatarUrl,
    songName,
    artistName,
}: PageHeaderProps): JSX.Element {
    const [spotifyData, setSpotifyData] = useState<SpotifyData>({
        username: "",
        followers: 0,
        favoriteGenre: "",
        currentPlayingSong: null,
    });


    useEffect(() => {
        async function fetchSpotifyData() {
            try {

                // Get user's followers count from spotify
                const userProfile = await spotifyWebApi.getMe();
                const username = userProfile.body.display_name ?? "Unknown User";
                const followerCount = userProfile.body.followers?.total ?? 0;

                // create fav genre from spotify
                const topArtists = await spotifyWebApi.getMyTopArtists({ limit : 50, time_range: "long_term" });
                const genreCounts: Record<string, number> = {};
                topArtists.body.items.forEach((artist) => {
                    artist.genres.forEach((genre) => {
                        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
                    });
                });

                const favoriteGenre = Object.entries(genreCounts).sort(([,a], [,b]) => b - a)[0][0];

                // get the current playing song
                const currentPlayingSong = await spotifyWebApi.getMyCurrentPlayingTrack();

                let nowPlaying = null;
                if (currentPlayingSong.body.item && 'artists' in currentPlayingSong.body.item) {
                    nowPlaying = {
                        name: currentPlayingSong.body.item.name,
                        artist: currentPlayingSong.body.item.artists[0].name,
                        imageUrl: currentPlayingSong.body.item.album.images[0].url,
                    };
                }

                setSpotifyData({
                    username: username,
                    followers: followerCount,
                    favoriteGenre,
                    currentPlayingSong: nowPlaying,
                });

            } catch {
                console.error("Failed to fetch data from Spotify");
            }
        }
        fetchSpotifyData();
    }, []);

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
                <Avatar src={avatarUrl} size={200} alt="user profile" />
                <Flex direction="column" align="start" h="100%">
                    <Title order={1} className="">
                        Yahoo~ {spotifyData.username} ☆彡
                    </Title>
                    <Text size="lg" className="">
                        {spotifyData.followers} : followers on Spotify
                    </Text>
                    <Text size="lg" className="">
                       {"Favorite genre"} : {spotifyData.favoriteGenre}
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
                                {spotifyData.currentPlayingSong?.name || songName}
                            </Text>
                            <Text>{spotifyData.currentPlayingSong?.artist}</Text>
                        </Flex>
                    </Flex>
                </Card>
            </Flex>
        </Container>
    );
}
