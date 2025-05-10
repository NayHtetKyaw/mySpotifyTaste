import { Flex, Text } from "@radix-ui/themes";

export default function TopGenre() {
    return (
        <Flex className="bg-neutral-800 rounded-xl p-6 hover:shadow-lg hover:shadow-green-900/20 transition-all transform hover:-translate-y-1 hover:bg-neutral-750">
            <Flex direction="column" gap="0.75rem">
                <Text size="4" weight="bold">Top Genre</Text>
                <Text size="7" weight="bold" color="green">J-POP</Text>
                <Text size="3" color="gray">
                    Your top genre is J-POP. You've gone full weeb mode, drowning in anime openings and kawaii beats. No turning back now!
                </Text>
            </Flex>
        </Flex>
    );
}