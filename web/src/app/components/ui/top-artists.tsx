"use client";

import {
    Flex,
    Box,
    Text,
    Select,
    Title,
    Center,
    Container,
    Divider,
    Loader,
} from "@mantine/core";
import Image from "next/image";
import { useSpotifyData } from "@components/spotify/use-spotify-data";

export default function TopArtists(): JSX.Element {
    const SpotifyData = useSpotifyData();

    if (!SpotifyData) {
        return (
            <Container bg="dark" p="md" mt="lg" className="rounded-md w-full">
                <Center>
                    <Loader type="bar" size={40} />
                </Center>
            </Container>
        )
    }

    return (
        <>
            {/* <Title order={1} mt="lg" className="text-center">
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
            </Flex> */}
            <Container bg="dark" p="md" mt="lg" className="rounded-md w-full">
                <Flex direction="column" gap="md">
                    {SpotifyData.topArtists.map((artist, index) => (
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
