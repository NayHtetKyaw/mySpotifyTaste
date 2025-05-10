import React from "react";
import { CalendarDays, CircleSmall, Music2 } from "lucide-react";
import { Box, Flex, Grid, Text } from "@radix-ui/themes";
import { ProgressBar } from "@/components/ui/progressBar";
import { PieCharts } from "@/components/pieCharts";
import { StatsCard } from "@/components/stats-card";
const datas = [
	{
		title: "hello",
		number: 20,
	},
	{
		title: "hello",
		number: 20,
	},
	{
		title: "hello",
		number: 20,
	},
	{
		title: "hello",
		number: 20,
	},
	{
		title: "hello",
		number: 20,
	},
];

const History = () => {
	return (
		<>
			<Flex>
				<Music2 color="#3ED68C" className="inline" />
				<Text
					ml={"0.5rem"}
					align="center"
					size="6"
					weight={"bold"}
					className=" pr-5 text-white"
				>
					Listening History
				</Text>
			</Flex>
			<Grid
				mt={"2.5rem"}
				// columns={"calc(60% - 1.25rem) calc(40% - 1.25rem)"}
				columns={"3fr 2fr"}
				gap={"2.5rem"}
			>
				<Flex
					className="bg-neutral-800 rounded-xl"
					width={"100%"}
					height="400px"
					justify={"center"}
					align={"start"}
					direction={"column"}
					p="4"
				>
					<Box pb="4">
						<CircleSmall
							size={36}
							color="#3ED68C"
							strokeWidth={3}
							className="inline"
						/>
						<Text
							ml={"0.5rem"}
							align="center"
							size="2"
							weight={"bold"}
							className=" pr-5 text-white"
						>
							Genre Distribution
						</Text>
					</Box>
					<Box width="100%" height="100%" className="bg-neutral-900 rounded-lg">
						<Grid columns="2" className="h-full w-full">
							<Flex
								justify={"center"}
								align={"center"}
								className="h-full w-full"
							>
								<PieCharts />
							</Flex>
							<Flex
								direction={"column"}
								align={"center"}
								justify={"center"}
								className="p-4"
							>
								{datas.map((data, key) => {
									return (
										<span className="w-full mb-2" key={key}>
											<Flex justify={"between"}>
												<div>{data.title}</div>
												{data.number}
											</Flex>
											<ProgressBar progress={data.number} />
										</span>
									);
								})}
							</Flex>
						</Grid>
					</Box>
				</Flex>
				<Flex
					className="bg-neutral-800 rounded-xl"
					width={"100%"}
					height="400px"
					p="4"
					direction={"column"}
				>
					<Box pb="4">
						<CalendarDays
							size={26}
							color="#3ED68C"
							strokeWidth={3}
							className="inline"
						/>
						<Text
							ml={"0.5rem"}
							align="center"
							size="2"
							weight={"bold"}
							className=" pr-5 text-white"
						>
							Monthly Activity
						</Text>
					</Box>
					<div className=" mt-2 w-full h-full">
						<StatsCard
							percentage={18}
							comparedToLastMonth="From Last Month"
							items={[
								{ label: "Product A", progress: 75, percentage: "75%" },
								{ label: "Product B", progress: 63, percentage: "63%" },
								{ label: "Product C", progress: 49, percentage: "49%" },
								{ label: "Product D", progress: 32, percentage: "32%" },
								{ label: "Product E", progress: 24, percentage: "24%" },
							]}
						/>
					</div>
				</Flex>
			</Grid>
		</>
	);
};

export default History;
