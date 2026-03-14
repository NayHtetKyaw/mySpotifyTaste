import { Flex, Text } from "@radix-ui/themes";

export default function TopGenre() {
  return (
    <Flex className="bg-white/4 rounded-xl p-6 border border-transparent transition-all duration-300 hover:bg-green-300/10 hover:-translate-y-1 transform will-change-transform">
      <Flex direction="column" gap="0.75rem">
        <Text size="4" weight="bold">
          Top Genre
        </Text>
        <Text size="7" weight="bold" color="indigo">
          J-POP
        </Text>
        <Text size="3" color="gray">
          Your top genre is J-POP. You've gone full weeb mode, drowning in anime
          openings and kawaii beats. No turning back now!
        </Text>
      </Flex>
    </Flex>
  );
}

