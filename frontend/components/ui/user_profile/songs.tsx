import { Card, Group, Title } from "@mantine/core";

export default function Songs(
    {
        songName,
        artistName,
    }: {
        songName: string;
        artistName: string;
    }
): JSX.Element {
    return (

        <Group justify="center" gap="lg" mt="lg">
            <Card w="40%" className="flex items-center text-sm" >
                <Group>
                    <Title className="text-lg sm:text-lg">Top Artists</Title>

                </Group>
            </Card>

            <Card w="40%" className="flex items-center text-sm" >
                <Group>
                    <Title className="text-lg sm:text-lg">Top Songs</Title>
                </Group>
            </Card>
        </Group>


    );
}