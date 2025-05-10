import { Flex, Text, Box, Avatar, Button } from "@radix-ui/themes";

const dummyData = Array(6).fill({
    thumbnail: "https://i.imgur.com/zwBmUpb.jpeg",
    title: "Song Title",
    artist: "Artist Name"
});

function RecommendationBoxes() {
    return (
        <Flex justify="center" gap="5" mt="5" wrap="wrap">
            {dummyData.map((item, idx) => (
                <Box
                    key={idx}
                    className="bg-neutral-700 rounded-lg flex flex-col items-center transition-transform duration-200 hover:-translate-y-1"
                    width="160px"
                    height="190px"
                    pt="4"
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    <Avatar
                        src={item.thumbnail}
                        fallback="No Image"
                        size="7"
                        mb="3"
                    />
                    <Text size="3" weight="bold" align="center" className="mt-2 text-white">
                        {item.title}
                    </Text>
                    <Text size="2" color="gray" align="center">
                        {item.artist}
                    </Text>
                </Box>
            ))}
        </Flex>
    );
}

export default function Recommendations() {
    return (
        <Flex direction="column" className="bg-neutral-800 rounded-xl p-6 hover:shadow-lg hover:shadow-green-900/20 transition-all hover:bg-neutral-750">
            <Flex justify="between" align="center" width="100%">
                <Text size="4" weight="bold">Recommendations</Text>
                <Text size="3" weight="light" color="green">Refresh</Text>
            </Flex>
            <RecommendationBoxes />

            <Flex justify="center" mt="5">
                <Button variant="soft" color="green" size="3" radius="full">Get More Recommendations</Button>
            </Flex>
        </Flex>
    );
}