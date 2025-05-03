import React from "react";
import { CalendarDays, CircleSmall, Music2 } from "lucide-react";
import { Box, Flex, Grid, Text } from "@radix-ui/themes";

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
			<Grid mt={"2.5rem"} columns={"60% 40%"} gap={"2.5rem"}>
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
						{/* <Flex direction={"row"} className="[&>input]:"> */}
						<input
							type="range"
							value="40"
							max="100"
							className="slider"
							disabled
						/>
						<input
							type="range"
							value="40"
							max="100"
							className="slider"
							disabled
						/>
						<input
							type="range"
							value="40"
							max="100"
							className="slider"
							disabled
						/>
						<input
							type="range"
							value="40"
							max="100"
							className="slider"
							disabled
						/>
						<input
							type="range"
							value="40"
							max="100"
							className="slider"
							disabled
						/>
						{/* </Flex> */}
					</Box>
				</Flex>
				<Flex
					className="bg-neutral-800 rounded-xl"
					width={"100%"}
					height="400px"
					justify={"center"}
					align={"start"}
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
					<Box
						width="100%"
						height="100%"
						className="bg-neutral-900 rounded-lg"
					></Box>
				</Flex>
			</Grid>
		</>
	);
};

export default History;
