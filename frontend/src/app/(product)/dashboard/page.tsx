"use client";

import {
	Button,
	DropdownMenu,
	Text,
	Flex,
	Grid,
	Section,
	Container,
} from "@radix-ui/themes";
import { useState } from "react";
import ListeningTime from "@/components/ui/dashboard/listeningtime";
import UniqueArtist from "@/components/ui/dashboard/uniquearts";
import TopGenre from "@/components/ui/dashboard/topgenre";
import TopTracks from "@/components/ui/dashboard/toptracks";
import History from "@/components/ui/dashboard/history";
import Recommendations from "@/components/ui/dashboard/recommendations";

export default function Dashboard() {
	const [selectedRange, setSelectedRange] = useState("Last 7 Days");

	return (
		<Container
			p={{ initial: "5", sm: "7", lg: "9" }}
			className="bg-neutral-900 bg-gradient-to-br from-neutral-900 to-neutral-950"
		>
			<header className="bg-gray-700 h-16 rounded-3xl mx-10 flex items-center justify-center">
				<span className="text-white font-bold">
					MySpotifyTaste (THIS IS DRAFT NAVBAR)
				</span>
			</header>{" "}
			{/*Draft nav bar*/}
			{/* <Section style={{ paddingBottom: "0rem", marginBottom: "0rem" }}> */}
			<Section>
				<Flex
					style={{ marginBottom: "1.5rem" }}
					wrap={{ initial: "nowrap", sm: "wrap" }}
					direction={{ initial: "column", sm: "row" }}
					align={{ initial: "center", sm: "start" }}
				>
					<Text
						align="center"
						size="6"
						weight={"bold"}
						className=" pr-5 text-white"
					>
						Your Listening Overview
					</Text>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<Button
								variant="soft"
								color="green"
								style={{
									backgroundColor: "var(--gray-3)",
									width: "150px",
								}}
								mt={{ initial: "4", sm: "0" }}
								size="2"
							>
								{selectedRange}
								<span style={{ marginLeft: "0.05rem" }}>▼</span>
							</Button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content variant="soft" color="green">
							<DropdownMenu.Item
								onSelect={() => setSelectedRange("Last 7 Days")}
							>
								Last 7 Days
							</DropdownMenu.Item>
							<DropdownMenu.Item
								onSelect={() => setSelectedRange("Last 30 Days")}
							>
								Last 30 Days
							</DropdownMenu.Item>
							<DropdownMenu.Item onSelect={() => setSelectedRange("All time")}>
								All time
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</Flex>

				<Flex>
					<Grid
						columns={{ initial: "1", sm: "3" }}
						gap="2.5rem"
						width="100%"
						height="auto"
					>
						<ListeningTime />
						<TopGenre />
						<UniqueArtist />
					</Grid>
				</Flex>

				<Flex mt="2.5rem">
					<Grid
						columns={{ initial: "1", sm: "2" }}
						gap="2.5rem"
						width="100%"
						height="auto"
					>
						<TopTracks />
						<TopTracks />
					</Grid>
				</Flex>
			</Section>
			<Section style={{ padding: "0rem", margin: "0rem" }}>
				<History />
			</Section>
			<Section style={{ paddingTop: "2.5rem", margin: "0rem" }}>
				<Recommendations />
			</Section>
		</Container>
	);
}
