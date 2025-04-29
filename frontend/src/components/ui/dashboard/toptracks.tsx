import { Box, Flex, Text, Button, Avatar, ScrollArea, Card } from '@radix-ui/themes';

const tracks = [
    { title: "Kan Saete Kuyashiiwa", artist: "Zutomayo", plays: 1200 },
    { title: "Byoushin wo Kamu", artist: "Zutomayo", plays: 950 },
    { title: "Milabo", artist: "Zutomayo", plays: 870 },
    { title: "Study Me", artist: "Zutomayo", plays: 760 },
    { title: "Hamaguri Bonbon", artist: "Zutomayo", plays: 680 }
];

const thumbnail = "";

export default function TopTracks() {
    return (
        <Flex
            className="bg-neutral-800 rounded-xl p-6 hover:shadow-lg hover:shadow-green-900/20"
            direction="column"
            gap="4"
        >
            <Text size="5" weight="bold">
                Top Tracks
            </Text>

            <Box>
                <Card variant="classic" className="bg-neutral-900 p-4 rounded-2xl">
                    <ScrollArea
                        type="always"
                        scrollbars="vertical"
                        radius='medium'
                        style={{ height: '280px', paddingRight: '8px', }}
                    >
                        <Flex direction="column" gap="4">
                            {tracks.map((track, index) => (
                                <Flex
                                    key={index}
                                    align="center"
                                    justify="between"
                                    className="hover:bg-neutral-800 p-2 rounded-lg transition"
                                >
                                    <Flex align="center" gap="3">
                                        <Text color="gray" size="2">{index + 1}</Text>
                                        <Avatar
                                            src={thumbnail}
                                            fallback="🎵"
                                            size="3"
                                            radius="full"
                                        />
                                        <Box>
                                            <Text weight="medium" size="3">{track.title}</Text>
                                            <Text color="gray" size="2"> {track.artist}</Text>
                                        </Box>
                                    </Flex>
                                    <Text size="2" color="gray" style={{ marginRight: '10px' }}>{track.plays} plays</Text>
                                </Flex>
                            ))}
                        </Flex>
                    </ScrollArea>
                </Card>
            </Box>

            <Button
                variant="outline"
                color='green'
                radius='full'
                className="mt-4 w-full bg-neutral-700 text-white hover:bg-neutral-600 rounded-xl transition"
            >
                View All Tracks
            </Button>
        </Flex>
    );
}