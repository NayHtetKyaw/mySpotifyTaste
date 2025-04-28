import { Flex, Text } from "@radix-ui/themes";


export default function ListeningTime() {
    return (
        <Flex className="bg-neutral-800 rounded-xl p-6 hover:shadow-lg hover:shadow-green-900/20 transition-all transform hover:-translate-y-1 hover:bg-neutral-750">
            <Flex direction="column" gap="0.75rem">
                <Text size="4" weight="bold">Listening Time</Text>
                <Text size="7" weight="bold" color="green">... Hrs</Text>
                <Text size="3" color="gray">
                    You've listened to 18% more music than last month
                </Text>
            </Flex>
        </Flex>
    );
}