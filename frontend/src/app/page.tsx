"use client";
import { BlurFade } from "@/components/ui/blur-fade";
import { Disc3 } from "lucide-react";
import { Container, Flex, Heading, Text } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const handleLogin = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/login",
      );

      if (!response) {
        throw new Error("response fail");
      }
      const result = await response.json();
      console.log(result);
      router.push(result!.login_url);
      // window.location.href = result?.login_url;
      // decodeURIComponent((window.location.href = result?.login_url));
    } catch (error) {
      console.error("error this " + error);
    }
  };

  return (
    <Container className="relative ">
      <Flex
        justify={"center"}
        align={"center"}
        direction={"column"}
        className="h-screen absolute inset-0 select-none"
      >
        <div className="absolute top-0 z-[0] h-screen w-screen bg-black dark:bg-black bg-[radial-gradient(ellipse_35%_90%_at_50%_0%,rgba(119,198,120,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(119, 198, 120, 0.3),rgba(255,255,255,0))]" />

        <BlurFade delay={0.25} inView>
          <Heading
            size={{
              initial: "6",
              xs: "8",
              sm: "9",
            }}
            className="tracking-tighter mb-2 text-green-500"
            weight={"bold"}
          >
            MySpotifyTaste{" "}
            <Disc3
              className="md:hidden inline animate-[spin_2s_linear_infinite]"
              size={32}
            />
            <Disc3
              className="hidden md:inline animate-[spin_2s_linear_infinite]"
              size={48}
            />
          </Heading>
        </BlurFade>
        <BlurFade delay={0.25 * 2} inView>
          <Heading
            size={{
              initial: "3",
              xs: "7",
              sm: "8",
            }}
            className="text-pretty tracking-tighter"
            align={"center"}
          >
            Keep track of your{" "}
            <Text as="span" className="text-green-400">
              taste
            </Text>{" "}
            on
            <Text as="span" className="text-green-400">
              {" "}
              spotify
            </Text>
          </Heading>
        </BlurFade>
        <BlurFade className="max-w-3xl mt-4" delay={0.25 * 3.5} inView>
          <Flex align={"center"}>
            <Text
              size={{
                initial: "1",
                xs: "2",
                sm: "4",
              }}
              weight={"regular"}
              align="center"
              wrap={"pretty"}
              className="hidden md:block"
            >
              Application that keeps track of your Spotify listening habits,
              analyzes your music taste over time, and gives you insights into
              your top songs, artists, and genres. Discover your trends, compare
              different periods, and explore how your music preferences evolve!
            </Text>
            <Text
              size={{
                initial: "1",
                xs: "2",
                sm: "4",
              }}
              mx={"2"}
              weight={"regular"}
              align="center"
              wrap={"pretty"}
              className="block md:hidden max-w-xs text-pretty"
            >
              application that tracks your Spotify listening activity
            </Text>
          </Flex>
        </BlurFade>
        <BlurFade className="max-w-3xl mt-3" delay={0.25 * 4} inView>
          {/* <a href="http://127.0.0.1:8080/auth/login"> */}
          <InteractiveHoverButton onClick={handleLogin}>
            {/* <InteractiveHoverButton> */}
            Get Started
          </InteractiveHoverButton>
          {/* </a> */}
        </BlurFade>
      </Flex>
    </Container>
  );
}
