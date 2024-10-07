import { Card, Flex, Stack, Text, Divider } from "@mantine/core";
import SelectPeriod from "./select-period";
import Image from "next/image";

interface Artist {
    name: string;
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

export default function Artists(): JSX.Element {

    return (

        <Flex
            p="lg"
            justify="center"
            wrap="wrap">

            <SelectPeriod />
            <div className="h-[2%] w-full" />

            <Card
                shadow="xs"
                padding="xl"
                radius="md"
                m="lg"
                className="min-w-96 w-[50%] h-auto">

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
            </Card >

        </Flex>

    );
} 