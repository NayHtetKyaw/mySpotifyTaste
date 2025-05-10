import { Flex, Text } from '@radix-ui/themes';

export default function UniqueArtist() {
    return (
        <Flex className="bg-neutral-800 rounded-xl p-6 hover:shadow-lg hover:shadow-green-900/20 transition-all transform hover:-translate-y-1 hover:bg-neutral-750">
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