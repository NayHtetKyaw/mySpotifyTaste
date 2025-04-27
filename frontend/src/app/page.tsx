import { BlurFade } from "@/components/ui/blur-fade";
import { Disc3 } from "lucide-react";
import { Flex, Text } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

export default function Home() {
	return (
		<div className="flex items-center justify-center flex-col w-screen h-screen ">
			<section id="header">
				<BlurFade delay={0.25} inView>
					<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none mb-2 text-green-400">
						MySpotifyTaste{" "}
						<Disc3 className="inline duration-[5s] animate-spin " size={48} />
					</h2>
				</BlurFade>
				<BlurFade delay={0.25 * 2} inView>
					<span className="text-xl text-pretty tracking-tighter sm:text-3xl xl:text-4xl/none">
						Keep track of your <span className="text-green-200">taste</span> on
						<span className="text-green-200"> spotify</span>
					</span>
				</BlurFade>
			</section>
			<BlurFade className="max-w-3xl mt-4" delay={0.25 * 3.5} inView>
				<Flex align={"center"}>
					<Text size="4" align="center" wrap={"pretty"}>
						An application that keeps track of your Spotify listening habits,
						analyzes your music taste over time, and gives you insights into
						your top songs, artists, and genres. Discover your trends, compare
						different periods, and explore how your music preferences evolve!
					</Text>
				</Flex>
			</BlurFade>
			<BlurFade className="max-w-3xl mt-4" delay={0.25 * 4.5} inView>
				<InteractiveHoverButton>Hover Me</InteractiveHoverButton>
			</BlurFade>
		</div>
	);
}
