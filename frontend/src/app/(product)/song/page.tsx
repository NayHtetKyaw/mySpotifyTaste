"use client";
import {
	Box,
	Container,
	Flex,
	Heading,
	Section,
	Text,
	DropdownMenu,
	Button,
} from "@radix-ui/themes";
import React, { useState } from "react";

const datas = [
	{
		images: "img",
		name: "fuji",
		followers: 10,
		genres: "pop",
		popularity: "100",
	},
	{
		images: "img",
		name: "aimer",
		followers: 10,
		genres: "pop",
		popularity: "100",
	},
	{
		images: "img",
		name: "fuji",
		followers: 10,
		genres: "pop",
		popularity: "100",
	},
	{
		images: "img",
		name: "fuji",
		followers: 10,
		genres: "pop",
		popularity: "100",
	},
	{
		images: "img",
		name: "fuji",
		followers: 10,
		genres: "pop",
		popularity: "100",
	},
];

const author = () => {
	const [selectedRange, setSelectedRange] = useState("Last 7 Days");
	return (
		<>
			<Container size={"3"}>
				{/* <Flex justify={"center"} align={"center"}> */}
				{/* 	<Section> */}
				{/* 		<Box */}
				{/* 			width={{ */}
				{/* 				initial: "480px", */}
				{/* 				md: "768px", */}
				{/* 				lg: "1024px", */}
				{/* 			}} */}
				{/* 			className="p-8" */}
				{/* 		> */}
				{/* 			hello */}
				{/* 		</Box> */}
				{/* 	</Section> */}
				{/* </Flex> */}
				<Flex justify={"center"} align={"center"}>
					<Section>
						<Flex
							style={{ marginBottom: "1.5rem" }}
							wrap={{ initial: "nowrap", sm: "wrap" }}
							direction={{ initial: "column", sm: "row" }}
							align={{ initial: "center", sm: "start" }}
						>
							<Heading
								as="h2"
								weight={"bold"}
								mb={"3"}
								className=" pr-5 text-white"
							>
								Top Songs
							</Heading>
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
									<DropdownMenu.Item
										onSelect={() => setSelectedRange("All time")}
									>
										All time
									</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</Flex>
						{datas.map((data, index) => {
							return (
								<Box
									width={{
										initial: "480px",
										md: "768px",
										lg: "1024px",
									}}
									key={index}
								>
									<Flex
										my={"2"}
										className="bg-neutral-900 [&>*]:px-2 rounded-md pl-1"
										py={"3"}
										justify={"between"}
									>
										<div>
											<Text className="">{index + 1}</Text>
											<Text>{data.images}</Text>
											<Text>{data.name}</Text>
										</div>
										<div>
											<Text>{data.followers}</Text>
											<Text>{data.genres}</Text>
											<Text>{data.popularity}</Text>
										</div>
									</Flex>
								</Box>
							);
						})}
					</Section>
				</Flex>
			</Container>
		</>
	);
};

export default author;
