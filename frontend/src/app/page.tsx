import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { Disc3 } from "lucide-react";

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
						Keep track of your taste on{" "}
						<span className="text-green-200">spotify</span>
					</span>
				</BlurFade>
			</section>
			<div className="text-center max-w-3xl mt-4">
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
				earum magnam quis ad neque tenetur deleniti eveniet, mollitia, incidunt
				eligendi, exercitationem aliquid. Nostrum excepturi vero quam velit
				laudantium vitae! Enim tenetur aliquam quis quidem aspernatur blanditiis
				facilis, fugit deserunt nemo dignissimos quam voluptas fugiat asperiores
				vero animi delectus totam hic, non velit omnis veniam. Est quis debitis
			</div>
		</div>
	);
}
