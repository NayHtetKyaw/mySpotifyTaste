import { BlurFade } from "@/components/ui/blur-fade";
import { Disc3 } from "lucide-react";
import { Flex, Heading, Text } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

export default function Home() {
	return (
		<div className="relative flex items-center justify-center flex-col w-screen h-screen ">
			{/* <div className="absolute top-0 z-[0] h-screen w-screen bg-green-950/10 dark:bg-green-950/10 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(119, 198, 120, 0.3),rgba(255,255,255,0))]" /> */}
			{/* <div className="absolute top-0 z-[0] h-screen w-screen bg-black dark:bg-black bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(119, 198, 120, 0.3),rgba(255,255,255,0))]" /> */}


			{/* bright3 */}
			<div
				className="absolute top-0 z-[0] h-screen w-screen bg-black dark:bg-black
  bg-[radial-gradient(ellipse_40%_80%_at_50%_-20%,rgba(119,198,120,0.6),rgba(255,255,255,0))]
  dark:bg-[radial-gradient(ellipse_40%_80%_at_50%_-20%,rgba(119,198,120,0.6),rgba(255,255,255,0))]
"
			/>
			<BlurFade delay={0.25} inView>
				<Heading
					size={"9"}
					className="font-bold tracking-tighter mb-2 text-green-400"
				>
					MySpotifyTaste{" "}
					<Disc3 className="inline duration-[5s] animate-spin " size={48} />
				</Heading>
			</BlurFade>
			<BlurFade delay={0.25 * 2} inView>
				<Heading
					size={"8"}
					className="text-pretty tracking-tighter sm:text-3xl xl:text-4xl/none"
				>
					Keep track of your <span className="text-green-200">taste</span> on
					<span className="text-green-200"> spotify</span>
				</Heading>
			</BlurFade>
			<BlurFade className="max-w-3xl mt-4" delay={0.25 * 3.5} inView>
				<Flex align={"center"}>
					<Text size="4" weight={"regular"} align="center" wrap={"pretty"}>
						An application that keeps track of your Spotify listening habits,
						analyzes your music taste over time, and gives you insights into
						your top songs, artists, and genres. Discover your trends, compare
						different periods, and explore how your music preferences evolve!
					</Text>
				</Flex>
			</BlurFade>
			<BlurFade className="max-w-3xl mt-4" delay={0.25 * 4} inView>
				<InteractiveHoverButton>Get Started</InteractiveHoverButton>
			</BlurFade>
		</div>
	);
}
