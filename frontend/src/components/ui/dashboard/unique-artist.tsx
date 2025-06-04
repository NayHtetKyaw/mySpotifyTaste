import { Flex, Text } from '@radix-ui/themes';

export default function UniqueArtist() {
    return (
        <Flex className="bg-white/4 rounded-xl p-6 border border-transparent transition-all duration-300 hover:bg-green-300/10 hover:-translate-y-1 transform will-change-transform">
            <Flex direction="column" gap="0.75rem">
                <Text size="4" weight="bold">Unique Artists</Text>
                <Text size="7" weight="bold" color="green">Zutomayo</Text>
                <Text size="3" color="gray">
                    Zutomayo is known for their unique sound and captivating lyrics. Explore more of their music to discover their distinctive style!
                </Text>
            </Flex>
        </Flex>
    );
}