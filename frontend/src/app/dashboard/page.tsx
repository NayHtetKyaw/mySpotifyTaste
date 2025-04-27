import { Button, DropdownMenu, Text, Flex } from "@radix-ui/themes";

export default function Dashboard() {
    return (
        <main className="px-12">
            <header className="bg-gray-700 h-16 rounded-3xl mx-10 flex items-center">
                <span>LOGO HERE</span>
            </header> {/*Draft nav bar (Delete if needed)*/}

            <section className="mt-10">
                <Flex>
                    <Text size="6" className="font-bold pr-5">
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
                            <DropdownMenu.Item >Last 30 Days</DropdownMenu.Item>
                            <DropdownMenu.Item >All time</DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </Flex>
            </section>
        </main>
    );
}
