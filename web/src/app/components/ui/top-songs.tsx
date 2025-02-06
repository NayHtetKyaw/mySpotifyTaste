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
import { useSpotifyData } from "@components/spotify/use-spotify-data";


export default function TopSongs(): JSX.Element {
    const SpotifyData = useSpotifyData();

    return (
        <>
            <Container bg="dark" p="md" mt="lg" className="rounded-md w-full">
                <Flex direction="column" gap="md">
                    {SpotifyData?.topTracks.map((song, index) => (
                        <>
                            <Flex key={song.id} w="100%">
                                <Flex className="flex flex-row w-full items-center">
                                    <Box w="6%" className="text-right">
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
