
import { Card, Group, Text, Avatar, Flex } from "@mantine/core";
import Image from "next/image";

export default function Overview(): JSX.Element {
    return (

        <Flex p="lg" justify="center" wrap="wrap" >
            <Card
                shadow="xs"
                padding="xl"
                radius="md"
                m="lg"
                className="min-w-1/2 w-[30%]">
                <Text size="xl" fw={700} className="text-center"> TOP ARTIST</Text>

                <div className="flex justify-center items-center m-4 h-36">
                    <Image src="/assets/images/profile.png"
                        width={110}
                        height={110}
                        alt="profile"
                        className="relative duration-150 -left-5 hover:scale-110 hover:-translate-x-4 hover:-rotate-2" />

                    <Image src="/assets/images/profile.png"
                        width={110}
                        height={110}
                        alt="profile"
                        className="relative duration-150 -right-5 hover:scale-110 hover:translate-x-4 hover:rotate-2" />

                    <Image src="/assets/images/profile.png"
                        width={125}
                        height={125}
                        alt="profile"
                        className=" absolute duration-150 hover:scale-110" />
                </div>
            </Card>


            <Card
                shadow="xs"
                padding="xl"
                radius="md"
                m="lg"
                className="min-w-1/2 w-[30%]">
                <Text size="xl" fw={700} className="text-center"> TOP SONG</Text>

                <div className="flex justify-center items-center m-4 h-36">
                    <Image src="/assets/images/profile.png"
                        width={110}
                        height={110}
                        alt="profile"
                        className="relative duration-150 -left-5 hover:scale-110 hover:-translate-x-4 hover:-rotate-2" />

                    <Image src="/assets/images/profile.png"
                        width={110}
                        height={110}
                        alt="profile"
                        className="relative duration-150 -right-5 hover:scale-110 hover:translate-x-4 hover:rotate-2" />

                    <Image src="/assets/images/profile.png"
                        width={125}
                        height={125}
                        alt="profile"
                        className=" absolute duration-150 hover:scale-110" />
                </div>




            </Card>
        </Flex >


    );
}