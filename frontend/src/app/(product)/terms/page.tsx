import { Container, Flex, Section, Text } from "@radix-ui/themes";

export default function Terms() {
    return (
        <Flex direction="column" className="h-screen bg-neutral-900">
            <header>
                <Container height="120px" className=" bg-neutral-800">
                    <Flex className="h-full" align="end">
                        <Text weight="bold" size="8" className="text-white tracking-tight">
                            TERMS AND SERVICES
                        </Text>
                    </Flex>
                </Container>
            </header>

            <Container>
                <Section>
                    <Flex className="bg-neutral-800 p-8 rounded-2xl shadow-xl" direction="column" gap="4">
                        <Text className="text-neutral-300">
                            {/* Add your terms and services content here */}
                            This is where the terms and services content will go.
                        </Text>
                    </Flex>
                </Section>
            </Container>
        </Flex>
    );
}