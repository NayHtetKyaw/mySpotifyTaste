import * as React from "react";
import { Section, Flex, Text, Box } from "@radix-ui/themes";

// Example data array
const recentlyPlayed = [
    {
        title: "Blinding Lights",
        artist: "The Weeknd",
        albumArt: "https://i.imgur.com/zwBmUpb.jpeg",
    },
];

// Repeat the data 10 times
const repeatedTracks = Array.from(
    { length: 8 },
    (_, i) => recentlyPlayed[i % recentlyPlayed.length]
);

const RecentlyPlayedBox: React.FC = () => (
    <Flex
        direction="column"
        className="border border-white/10 bg-white/2 rounded-xl p-4"
    >
        <Text align="center" size="6" weight="bold" className="pt-4">
            Recently Played
        </Text>
        <Text align="center" size="4" m="2">
            (30 Days)
        </Text>
        <Flex justify="center" direction="row" gap="8" p="4" overflow="auto">
            {repeatedTracks.map((track, idx) => (
                <Flex key={idx} align="center" gap="3" py="2">
                    <Box>
                        <img
                            src={track.albumArt}
                            alt={track.title}
                            style={{
                                width: "100%",
                                maxWidth: 135,
                                height: "auto",
                                maxHeight: 150,
                                borderRadius: 8,
                                objectFit: "contain",
                                background: "#fff",
                            }}
                        />
                        <Box>
                            <Text as="div" size="3" weight="medium">
                                {track.title}
                            </Text>
                            <Text as="div" size="2" color="gray">
                                {track.artist}
                            </Text>
                        </Box>
                    </Box>
                </Flex>
            ))}
        </Flex>
    </Flex>
);

export default RecentlyPlayedBox;
