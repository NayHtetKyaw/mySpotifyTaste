import { Card, Text, Flex, Stack, Divider, NativeSelect } from "@mantine/core";
import Image from "next/image";
import SelectPeriod from "./select-period";

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
            wrap="wrap"
        >
            <SelectPeriod />
            <div className="h-[2%] w-full" />

            <Card
                shadow="xs"
                padding="xl"
                radius="md"
                m="lg"
                className="min-w-96 w-[32%] h-[58rem]">
                <Text
                    size="xl"
                    fw={800}
                    className="text-center">TOP ARTIST</Text>

                <div className="flex justify-center items-center m-4 h-40">
                    <Image src="/assets/images/profile.png" width={110} height={110} alt="profile" className="relative duration-150 -left-5 hover:scale-110 hover:-translate-x-4 hover:-rotate-2" />
                    <Image src="/assets/images/profile.png" width={110} height={110} alt="profile" className="relative duration-150 -right-5 hover:scale-110 hover:translate-x-4 hover:rotate-2" />
                    <Image src="/assets/images/profile.png" width={125} height={125} alt="profile" className="absolute duration-150 hover:scale-110" />
                </div>
                <Stack
                    w="full"
                    align="stretch"
                    justify="flex-start"
                    gap="md">
                    {artistsData.map((artist, index) => (
                        <Text key={index} size="lg" fw={600} className="text-left">
                            {index + 1}. {artist.name}
                            <Divider mt="md" />
                        </Text>
                    ))}
                </Stack>
                <Text color="green" m="sm" className="relative top-2 text-center">SEE MORE</Text>
            </Card >

            <Card
                shadow="xs"
                padding="xl"
                radius="md"
                m="lg"
                className="min-w-96 w-[32%] h-[71rem]">
                <Text size="xl" fw={800} className="text-center">TOP SONG</Text>

                <div className="flex justify-center items-center m-4 h-40">
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
                            className="text-left flex flex-col">
                            {index + 1}. {song.name}
                            <Text size="md">{song.artist}</Text>
                            <Divider className="mt-4" />
                        </Text>
                    ))}
                </Stack>
                <Text color="green" m="sm" className="relative top-2 text-center">SEE MORE</Text>
            </Card>
        </Flex >
    );
}
