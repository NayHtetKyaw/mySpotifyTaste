import { Flex, TabNav } from "@radix-ui/themes";

export default function Navbar() {
    return (
        <Flex justify="center" width="full">
            <TabNav.Root className="font-bold text-white">
                <TabNav.Link href="#dashboard">Dashboard</TabNav.Link>
                <TabNav.Link href="#artist">Artists</TabNav.Link>
                <TabNav.Link href="#song">Songs</TabNav.Link>
                <TabNav.Link href="/contact-us">Contact us</TabNav.Link>
            </TabNav.Root>
        </Flex>
    );
}