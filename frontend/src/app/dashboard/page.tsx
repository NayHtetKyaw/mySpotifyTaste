import { Button, DropdownMenu, Text, Flex, Grid, Section } from "@radix-ui/themes";

function ListeningTime() {
    return (
        <div className="bg-neutral-800 rounded-xl p-6 hover:shadow-lg hover:shadow-green-900/20 transition-all transform hover:-translate-y-1 hover:bg-neutral-750">
            <Flex direction="column" gap="0.75rem">
                <Text weight="bold">Listening Time</Text>
                <Text size="7" weight="bold" color="green">... Hrs</Text>
                <Text size="3" color="gray">
                    You've listened to 18% more music than last month
                </Text>
            </Flex>
        </div>
    );
}

export default function Dashboard() {
    return (
        <main className="px-12 bg-gradient-to-br from-neutral-900 to-neutral-950 min-h-screen">
            <header className="bg-gray-700 h-16 rounded-3xl mx-10 flex items-center">
                <span>LOGO HERE</span>
            </header> {/*Draft nav bar (Delete if needed)*/}

            <Section>
                <Flex style={{ marginBottom: "1.25rem" }}>
                    <Text size="6" className="font-bold pr-5 text-white">
                        Your Listening Overview
                    </Text>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Button
                                variant="soft"
                                color="green"
                                style={{
                                    backgroundColor: "var(--gray-3)",
                                }}
                                size="2"
                            >
                                Last 7 Days
                                <DropdownMenu.TriggerIcon />
                            </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content variant="soft" color="green">
                            <DropdownMenu.Item>Last 30 Days</DropdownMenu.Item>
                            <DropdownMenu.Item>All time</DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </Flex>

                <Flex>
                    <Grid
                        columns="3"
                        gap="2vw"
                        width="100%"
                        height="auto"
                    >
                        <ListeningTime />
                        <ListeningTime />
                        <ListeningTime />
                    </Grid>
                </Flex>
            </Section>
        </main>
    );
}
