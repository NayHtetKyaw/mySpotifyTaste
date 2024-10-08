"use client";

import {
    Flex,
    Box,
    Text,
    Select,
    Title,
    Container,
    Divider,
} from "@mantine/core";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Album {
    id: string;
    name: string;
    images: { url: string }[];
    artists: { name: string }[];
}

export default function TopAlbums(): JSX.Element {
    const [topAlbums, setTopAlbum] = useState<Album[]>([]);
    const [term, setTerm] = useState("short_term");
    const [NumberOfItem, setNumberOfSongs] = useState(10);

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
                    `/api/spotify?access_token=${access_token}&term=${term}&limit=${NumberOfItem}`
                );
                if (response.ok) {
                    const data = await response.json();
                    setTopAlbum(data.topAlbums);
                } else {
                    console.error("Failed to fetch top songs");
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchTopSongs();
    }, [term, NumberOfItem]);

    return (
        <>
            <Title order={1} mt="lg" className="text-center">
                Top Albums
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
                    value={NumberOfItem.toString()}
                    onChange={(value) => setNumberOfSongs(Number(value))}
                    data={[
                        { value: "10", label: "10 albums" },
                        { value: "20", label: "20 albums" },
                        { value: "50", label: "50 albums" },
                    ]}
                    placeholder="Select Number of Songs"
                />
            </Flex>
            <Container bg="dark" p="md" mt="lg" className="rounded-md w-full">
                <Flex direction="column" gap="md">
                    {topAlbums.map((album, index) => (
                        <>
                            <Flex key={album.id} w="100%">
                                <Flex className="flex flex-row w-full items-center">
                                    <Box w="6%" className="text-right">
                                        <Text fw="bolder"> {index + 1}.</Text>
                                    </Box>
                                    <Image
                                        src={
                                            album.images[0]?.url ||
                                            "/assets/images/myspotifytaste.png"
                                        }
                                        width={50}
                                        height={50}
                                        alt="Album cover"
                                        className="rounded-lg ml-2"
                                        // style={{ width: "auto", height: "auto" }}
                                    />
                                    <Box ml="sm">
                                        <Title order={4}>{album.name}</Title>
                                        <Text>
                                            {album.artists.map((artist) => artist.name).join(", ")}
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
