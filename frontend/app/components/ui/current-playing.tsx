import { Card, Text, Flex, Avatar } from "@mantine/core";
import { useEffect, useState } from "react";

interface Song {
    name: string;
    artists: { name: string }[];
    album: {
        images: { url: string }[];
    };
}

interface SpotifyData {
    currentlyPlaying: {
        item: Song;
        is_playing: boolean;
    } | null;
}

export default function CurrentPlaying(): JSX.Element {
    const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null);

    useEffect(() => {
        const fetchCurrentlyPlaying = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const access_token =
                    urlParams.get("access_token") ||
                    localStorage.getItem("spotify_access_token");

                if (!access_token) {
                    console.error("No access token available");
                    return;
                }

                const response = await fetch(
                    `/api/spotify?access_token=${access_token}`
                );
                if (response.ok) {
                    const data = await response.json();
                    setSpotifyData(data);
                } else {
                    console.error("Failed to fetch currently playing");
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchCurrentlyPlaying();
        const intervalId = setInterval(fetchCurrentlyPlaying, 5000);
        return () => clearInterval(intervalId);
    }, []);
    if (!spotifyData?.currentlyPlaying || !spotifyData.currentlyPlaying.is_playing) {
        return <></>;
    } else {
        return (
            <Card
                radius="md"
                withBorder
                c="dark"
                bg="green"
                className="lg:ml-auto lg:w-max min-w-80 md:ml-50"
            >
                <Text mb="xs" fw="bold">
                    Now Playing...
                </Text>
                <Flex direction="row" gap="md">
                    <Avatar
                        src={spotifyData.currentlyPlaying.item.album.images[0].url}
                        size={55}
                        className="self-center"
                    />
                    <Flex direction="column">
                        <Text size="lg" fw="bold">
                            {spotifyData.currentlyPlaying.item.name}
                        </Text>
                        <Text fw="bold">{spotifyData.currentlyPlaying.item.artists[0].name}</Text>
                    </Flex>
                </Flex>
            </Card>
        );
    }
}
