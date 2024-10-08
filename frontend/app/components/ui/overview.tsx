import { Box, Flex, Container } from "@mantine/core";
import Image from "next/image";
import TopArtists from "./top-artists";
import TopSongs from "./top-songs";




export default function Overview(): JSX.Element {
    return (
        <Container fluid>
            <Flex
                direction="row"
                justify="space-around"
                gap="md"
                className="w-full"
            >
                <Flex direction="column" w="100%">
                    <Box className="flex justify-center items-center m-4 w-full">
                        <Image
                            src="/assets/images/myspotifytaste.png"
                            width={200}
                            height={200}
                            alt="top songs"
                        />
                    </Box>
                    <TopArtists />
                </Flex>
                <Flex direction="column" w="100%">
                    <TopSongs />
                </Flex>
            </Flex>
        </Container>
    );
}
