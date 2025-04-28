"use client";

import { Button, DropdownMenu, Text, Flex, Grid, Section } from "@radix-ui/themes";
import { useState } from "react";

function ListeningTime() {
    return (
        <div className="bg-neutral-800 rounded-xl p-6 hover:shadow-lg hover:shadow-green-900/20 transition-all transform hover:-translate-y-1 hover:bg-neutral-750">
            <Flex direction="column" gap="0.75rem">
                <Text size="4" weight="bold">Listening Time</Text>
                <Text size="7" weight="bold" color="green">... Hrs</Text>
                <Text size="3" color="gray">
                    You've listened to 18% more music than last month
                </Text>
            </Flex>
        </div>
    );
}

function TopGenre() {
    return (
        <div className="bg-neutral-800 rounded-xl p-6 hover:shadow-lg hover:shadow-green-900/20 transition-all transform hover:-translate-y-1 hover:bg-neutral-750">
            <Flex direction="column" gap="0.75rem">
                <Text size="4" weight="bold">Top Genre</Text>
                <Text size="7" weight="bold" color="green">J-POP</Text>
                <Text size="3" color="gray">
                    Your top genre is J-POP. You've gone full weeb mode, drowning in anime openings and kawaii beats. No turning back now!
                </Text>
            </Flex>
        </div>
    );
}

function UniqueArtist() {
    return (
        <div className="bg-neutral-800 rounded-xl p-6 hover:shadow-lg hover:shadow-green-900/20 transition-all transform hover:-translate-y-1 hover:bg-neutral-750">
            <Flex direction="column" gap="0.75rem">
                <Text size="4" weight="bold">Unique Artists</Text>
                <Text size="7" weight="bold" color="green">Zutomayo</Text>
                <Text size="3" color="gray">
                    Zutomayo is known for their unique sound and captivating lyrics. Explore more of their music to discover their distinctive style!
                </Text>
            </Flex>
        </div>
    );
}

export default function Dashboard() {
    const [selectedRange, setSelectedRange] = useState("Last 7 Days");

    return (
        <main className="px-14 bg-neutral-900 bg-gradient-to-br from-neutral-900 to-neutral-950 min-h-screen">
            <header className="bg-gray-700 h-16 rounded-3xl mx-10 flex items-center">
                <span className="text-white font-bold">MySpotifyTaste</span>
            </header> {/*Draft nav bar*/}

            <Section>
                <Flex
                    style={{ marginBottom: "1.5rem" }}
                    wrap={{ initial: "nowrap", sm: "wrap" }}
                    direction={{ initial: "column", sm: "row" }}
                    align={{ initial: "center", sm: "start" }}
                >
                    <Text
                        align="center"
                        size="6"
                        className="font-bold pr-5 text-white"
                    >
                        Your Listening Overview
                    </Text>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Button
                                variant="soft"
                                color="green"
                                style={{
                                    backgroundColor: "var(--gray-3)",
                                    width: "150px",
                                }}
                                mt={{ initial: "4", sm: "0" }}
                                size="2"
                            >
                                {selectedRange}
                                <span style={{ marginLeft: "0.05rem" }}>▼</span>
                            </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content variant="soft" color="green">
                            <DropdownMenu.Item onSelect={() => setSelectedRange("Last 7 Days")}>
                                Last 7 Days
                            </DropdownMenu.Item>
                            <DropdownMenu.Item onSelect={() => setSelectedRange("Last 30 Days")}>
                                Last 30 Days
                            </DropdownMenu.Item>
                            <DropdownMenu.Item onSelect={() => setSelectedRange("All time")}>
                                All time
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </Flex>

                <Flex>
                    <Grid
                        columns={{ initial: "1", sm: "3" }}
                        gap="2.5rem"
                        width="100%"
                        height="auto"
                    >
                        <ListeningTime />
                        <TopGenre />
                        <UniqueArtist />
                    </Grid>
                </Flex>
            </Section>
        </main >
    );
}
