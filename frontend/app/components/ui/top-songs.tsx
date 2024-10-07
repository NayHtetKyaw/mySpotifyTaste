import {
    Flex,
    Box,
    Text,
    Select,
    Title,
    Container,
    Divider,
} from "@mantine/core";
import { access } from "fs";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Song {
    id: string;
    name: string;
    artists: { name: string }[];
    album: { images: { url: string }[] };
}

export default function TopSongs(): JSX.Element {
    const [topSongs, setTopSongs] = useState<Song[]>([]);
    const [term, setTerm] = useState("short_term");
    const [NumberOfSongs, setNumberOfSongs] = useState(10);

    useEffect(() => {
        const fetchTopSongs = async () => {
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
                    `/api/spotify?access_token=${access_token}&term=${term}&limit=${NumberOfSongs}`
                );
                if (response.ok) {
                    const data = await response.json();
                    setTopSongs(data.topTracks);
                } else {
                    console.error("Failed to fetch top songs");
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchTopSongs();
    }, [term, NumberOfSongs]);

    return (
        <>
            <Title order={1} mt="lg" className="text-center">
                Top Songs
            </Title>
            <Flex justify="center" mt="md">
                <Select
                    value={term}
                    onChange={(value) => setTerm(value ?? "short_term")}
                    data={[
                        { value: "short_term", label: "Short Term" },
                        { value: "medium_term", label: "Medium Term" },
                        { value: "long_term", label: "Long Term" },
                    ]}
                    placeholder="Select Term"
                    mr="md"
                />
                <Select
                    value={NumberOfSongs.toString()}
                    onChange={(value) => setNumberOfSongs(Number(value))}
                    data={[
                        { value: "10", label: "10 Songs" },
                        { value: "20", label: "20 Songs" },
                        { value: "50", label: "50 Songs" },
                    ]}
                    placeholder="Select Number of Songs"
                />
            </Flex>
            <Container bg="dark" p="md" mt="lg" className="rounded-md">
                <Flex direction="column" gap="md">
                    {topSongs.map((song, index) => (
                        <>
                            <Flex key={song.id} w="100%">
                                <Flex className="flex flex-row w-full items-center">
                                    <Box w="2.5%" className="text-right">
                                        <Text fw="bolder"> {index + 1}.</Text>
                                    </Box>
                                    <Image
                                        src={
                                            song.album.images[0]?.url ||
                                            "/assets/images/myspotifytaste.png"
                                        }
                                        width={50}
                                        height={50}
                                        alt="Album cover"
                                        className="rounded-lg ml-2"
                                        // style={{ width: "auto", height: "auto" }}
                                    />
                                    <Box ml="sm">
                                        <Title order={4}>{song.name}</Title>
                                        <Text>
                                            {song.artists
                                                .map((artist) => artist.name)
                                                .join(",")}
                                        </Text>
                                    </Box>
                                </Flex>
                            </Flex>
                            <Divider />
                        </>
                    ))}
                </Flex>
            </Container>
        </>
    );
}
