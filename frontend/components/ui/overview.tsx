import { Card, Text, Flex, Stack, Tab } from "@mantine/core";
import Image from "next/image";

interface Artist {
    name: string;
}

interface Song {
    name: string;
    artist: string;
}

const artistsData: Artist[] = [
    { name: "Aimer" },
    { name: "DUSTCELL" },
    { name: "Hiroyuki Sawano" },
    { name: "-" },
    { name: "-" },
    { name: "-" },
    { name: "-" },
    { name: "-" },
    { name: "-" },
    { name: "-" },
];

const songsData: Song[] = [
    { name: "Brave Shine", artist: "Aimer" },
    { name: "Crying My Soul", artist: "DUSTCELL" },
    { name: "Before My Body Is Dry", artist: "Hiroyuki Sawano" },
    { name: "LAST STARDUST", artist: "Aimer" },
    { name: "Self-Hypnosis", artist: "DUSTCELL" },
    { name: "TRNTY", artist: "Hiroyuki Sawano" },
    { name: "RE:I AM", artist: "Aimer" },
    { name: "The Lost", artist: "DUSTCELL" },
    { name: "aLIEz", artist: "Hiroyuki Sawano" },
    { name: "I Beg You", artist: "Aimer" },
];

export default function Overview(): JSX.Element {
    return (
        <Flex
            p="lg"
            justify="center"
            wrap="wrap">
            <Card
                shadow="xs"
                padding="xl"
                radius="md"
                m="lg"
                className="min-w-80 w-[30%] h-[52rem]">
                <Text
                    size="xl"
                    fw={800}
                    className="text-center">TOP ARTIST</Text>

                <div className="flex justify-center items-center m-4 h-36">
                    <Image src="/assets/images/profile.png" width={110} height={110} alt="profile" className="relative duration-150 -left-5 hover:scale-110 hover:-translate-x-4 hover:-rotate-2" />
                    <Image src="/assets/images/profile.png" width={110} height={110} alt="profile" className="relative duration-150 -right-5 hover:scale-110 hover:translate-x-4 hover:rotate-2" />
                    <Image src="/assets/images/profile.png" width={125} height={125} alt="profile" className="absolute duration-150 hover:scale-110" />
                </div>

                <Stack
                    w="full"
                    align="stretch"
                    justify="flex-start"
                    gap="sm">
                    {artistsData.map((artist, index) => (
                        <Text key={index} size="lg" fw={600} mt="sm" className="text-left">
                            {index + 1}. {artist.name}
                        </Text>
                    ))}
                </Stack>

                <Text color="green" m="sm" className="text-center">SEE MORE</Text>

            </Card>


            <Card
                shadow="xs"
                padding="xl"
                radius="md"
                m="lg"
                className="min-w-80 w-[30%] h-[68rem]">
                <Text size="xl" fw={800} className="text-center">TOP SONG</Text>

                <div className="flex justify-center items-center m-4 h-36">
                    <Image src="/assets/images/profile.png" width={110} height={110} alt="profile" className="relative duration-150 -left-5 hover:scale-110 hover:-translate-x-4 hover:-rotate-2" />
                    <Image src="/assets/images/profile.png" width={110} height={110} alt="profile" className="relative duration-150 -right-5 hover:scale-110 hover:translate-x-4 hover:rotate-2" />
                    <Image src="/assets/images/profile.png" width={125} height={125} alt="profile" className="absolute duration-150 hover:scale-110" />
                </div>


                <Stack
                    w="full"
                    align="stretch"
                    justify="flex-start"
                    gap="sm">
                    {songsData.map((song, index) => (
                        <Text key={index}
                            size="lg"
                            fw={600}
                            mt="sm"
                            className="text-left flex flex-col">
                            {index + 1}. {song.name}
                            <Text size="md">{song.artist}</Text>
                        </Text>
                    ))}
                </Stack>
                <Text color="green" m="sm" className="text-center">SEE MORE</Text>
            </Card>
        </Flex>
    );
}
