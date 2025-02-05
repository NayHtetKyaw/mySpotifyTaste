import {
    Container,
    Button,
    Title,
    Text,
    Flex,
    Stack,
    Avatar,
    Divider,
    Box,
    Card,
} from "@mantine/core";
import Link from "next/link";

export default function ProfileSetting() {
    return (
        <Container>
            <Flex gap="lg" direction="column">
                <Flex className="self-center" direction="column" gap="md">
                    <Avatar
                        src={"/assets/images/myspotifytaste.png"}
                        size={150}
                    />

                    <Title order={2} className="text-center">
                        {"username"}
                    </Title>
                </Flex>
                <Divider />
                <Stack gap="md">
                    <Card>
                        <Title order={3} c="green">
                            Spotify Account{" "}
                        </Title>
                        <Text mt="xs">
                            The Spotify account that you are signed in with.
                        </Text>
                    </Card>

                    <Card>
                        <Title order={4} c="green">
                            {"Username"}
                        </Title>
                        <Text>vickyB1456</Text>
                        <Title order={4} c={"green"} mt="xs">
                            Access Level:
                        </Title>
                        <Text>Basic</Text>
                    </Card>

                    <Card>
                        <Title order={3} c="green">
                            Email{" "}
                        </Title>
                        <Text>
                            The email address assosiated with your account.
                        </Text>
                        <Text fw="bold">vickyyang2345@gmail.com</Text>
                    </Card>

                    <Card>
                        <Title order={3} c="green">
                            Plan
                        </Title>
                        <Text>
                            Upgrade your plan and unlock all your great features
                        </Text>
                        <Text fw="bold">
                            You are currently on the basic plan.
                        </Text>
                    </Card>

                    <Card>
                        <Title order={3} c="green">
                            Subscription
                        </Title>
                        <Text>
                            Visit the Billing Portal to view your invoices,
                            manage your cards, or cancel your subscription.
                        </Text>
                        <Link href="/billing-portal">
                            <Button radius={50} color="green" mt="sm">
                                Billing Portal
                            </Button>
                        </Link>

                        <div className="mt-4">
                            <Title order={3} c="green">
                                Sign Out
                            </Title>
                            <Text>
                                Sign out of your account on this browser
                            </Text>
                            <Link href="/">
                                <Button radius={50} color="green" mt="sm">
                                    Sign out
                                </Button>
                            </Link>
                        </div>
                    </Card>

                    <footer className="flex justify-center mb-4">
                        <Button radius={50} color="red">
                            Delete Account
                        </Button>
                    </footer>
                </Stack>
            </Flex>
        </Container>
    );
}
