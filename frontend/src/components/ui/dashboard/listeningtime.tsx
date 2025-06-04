import { Flex, Text } from "@radix-ui/themes";

export default function ListeningTime() {
    return (
        <Flex className="bg-white/4 rounded-xl p-6 border border-transparent transition-all duration-300 hover:bg-green-300/10 hover:-translate-y-1 transform will-change-transform">
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