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

interface Artist {
    id: string;
    name: string;
    images: {url: string }[];
}

export default function TopArtists(): JSX.Element {
    const [topArtist, setTopArtist] = useState<Artist[]>([]);
    const [term, setTerm] = useState("short_term");
    const [NumberOfArtist, setNumberOfArtist] = useState(10);

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
                    `/api/spotify?access_token=${access_token}&term=${term}&limit=${NumberOfArtist}`
                );
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setTopArtist(data.topArtists);
                } else {
                    console.error("Failed to fetch top songs");
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchTopSongs();
    }, [term, NumberOfArtist]);

    return (
        <>
            <Title order={1} mt="lg" className="text-center">
                Top Artists
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
                    value={NumberOfArtist.toString()}
                    onChange={(value) => setNumberOfArtist(Number(value))}
                    data={[
                        { value: "10", label: "10 Artists" },
                        { value: "20", label: "20 Artists" },
                        { value: "50", label: "50 Artists" },
                    ]}
                    placeholder="Select Number of Songs"
                />
            </Flex>
            <Container bg="dark" p="md" mt="lg" className="rounded-md w-full">
                <Flex direction="column" gap="md">
                    {topArtist.map((artist, index) => (
                        <>
                            <Flex key={artist.id} w="100%">
                                <Flex className="flex flex-row w-full items-center">
                                    <Box w="6%" className="text-right">
                                        <Text fw="bolder"> {index + 1}.</Text>
                                    </Box>
                                    <Image
                                        src={
                                            artist.images[0]?.url ||
                                            "/assets/images/myspotifytaste.png"
                                        }
                                        width={50}
                                        height={50}
                                        alt="Album cover"
                                        className="rounded-lg ml-2"
                                        // style={{ width: "auto", height: "auto" }}
                                    />
                                    <Box ml="sm">
                                        <Title order={4}>{artist.name}</Title>
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
