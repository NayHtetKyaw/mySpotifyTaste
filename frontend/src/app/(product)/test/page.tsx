// import { HeroSection } from "@/components/blocks/hero-section-dark";
//
// export default function HeroSectionDemo() {
// 	return (
// 		<HeroSection
// 			title="Welcome to Our Platform"
// 			subtitle={{
// 				regular: "Transform your ideas into ",
// 				gradient: "beautiful digital experiences",
// 			}}
// 			description="Transform your ideas into reality with our comprehensive suite of development tools and resources."
// 			ctaText="Get Started"
// 			ctaHref="/signup"
// 			bottomImage={{
// 				light: "https://www.launchuicomponents.com/app-light.png",
// 				dark: "https://www.launchuicomponents.com/app-dark.png",
// 			}}
// 			gridOptions={{
// 				angle: 65,
// 				opacity: 0.4,
// 				cellSize: 50,
// 				lightLineColor: "#4a4a4a",
// 				darkLineColor: "#2a2a2a",
// 			}}
// 		/>
// 	);
// }

// import { Circle } from "lucide-react";
// import { Button } from "@/components/ui/button";
//
// export default function Home() {
// 	return (
// 		<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-black to-[#0a2a0a] text-white p-4">
// 			<div className="max-w-md mx-auto text-center space-y-6 py-8">
// 				<h1 className="text-4xl md:text-5xl font-bold flex items-center justify-center gap-2 text-[#1DB954]">
// 					MySpotifyTaste{" "}
// 					<Circle className="w-6 h-6 fill-[#1DB954] stroke-[#1DB954]" />
// 				</h1>
//
// 				<h2 className="text-2xl md:text-3xl font-semibold">
// 					Keep track of your <span className="text-[#1DB954]">taste</span> on{" "}
// 					<span className="text-[#1DB954]">spotify</span>
// 				</h2>
//
// 				<p className="text-sm md:text-base leading-relaxed opacity-90 px-2">
// 					An application that keeps track of your Spotify listening habits,
// 					analyzes your music taste over time, and gives you insights into your
// 					top songs, artists, and genres. Discover your trends, compare
// 					different periods, and explore how your music preferences evolve!
// 				</p>
//
// 				<Button className="bg-black hover:bg-zinc-900 text-white rounded-full px-8 py-6 mt-6 flex items-center gap-2">
// 					<span className="h-2 w-2 rounded-full bg-[#1DB954]"></span>
// 					Get Started
// 				</Button>
// 			</div>
// 		</main>
// 	);
// }

import React from "react";
import Testing from "@/components/testing";

const page = () => {
	return (
		<div>
			<Testing text={"hello"} gay={"gayying"} />
		</div>
	);
};

export default page;
