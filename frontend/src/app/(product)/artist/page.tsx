"use client";
import TimeRangeDrop from "@/components/timerangedrop";
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
import React, { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import LoaderOne from "@/components/ui/loader-one";

type artist = {
	name: string;
	images: { height: number; width: number; url: string }[];
	popularity: number;
	genres: string[];
	followers: { total?: number; href?: string };
};

const author = () => {
	const [selectedRange, setSelectedRange] = useState("Last 7 Days");
	const [artist, setArtist] = useState<artist[]>([]);
	const [isPending, startTransition] = useTransition();

	useEffect(() => {
		async function fetchData() {
			try {
				startTransition(async () => {
					const token = localStorage.getItem("token");

					// const response = await fetch("http://127.0.0.1:8080/auth/refresh", {
					// 	headers: {
					// 		"Content-Type": "application/json",
					// 		Authorization: `Bearer ${token}`,
					// 	},
					// });
					// const data = await response.json();
					// console.log(data);

					// console.log(token);
					const response = await fetch(
						"http://127.0.0.1:8080/api/spotify/top-artists",
						{
							method: "GET",
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${token}`,
							},
						},
					);

					if (!response.ok) {
						throw new Error("can't fetch artist");
					}

					const data = await response.json();
					console.log(data.artists);

					setArtist(data.artists);
				});
			} catch (error) {
				console.log(error);
			}
		}

		fetchData();
	}, []);
	return (
		<>
			<Container size={"3"}>
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
								Top Artists
							</Heading>
							<TimeRangeDrop />
						</Flex>
						{isPending && <LoaderOne />}
						{artist.map((data, index) => {
							return (
								<Box
									width={{
										initial: "480px",
										md: "768px",
										lg: "1024px",
									}}
									key={index}
									className="bg-neutral-900 hover:bg-neutral-800 rounded-2xl"
								>
									<Flex
										my={"2"}
										className=" [&>*]:px-2 rounded-md pl-1"
										py={"3"}
										justify={"between"}
										align={"center"}
									>
										<Flex align={"center"} justify={"center"} gap={"3"}>
											<Text className="">{index + 1}</Text>
											<Box className="relative w-12 h-12 md:w-15 md:h-15">
												<Image
													src={data?.images[2]?.url}
													// width={50}
													// height={50}
													fill={true}
													alt="Picture of the author"
													className="object-cover rounded-full"
												/>
											</Box>
											<Text>{data.name}</Text>
										</Flex>
										<div>
											<Text>{data?.followers?.total}</Text>
											<Text>{data?.genres[0]}</Text>
											<Text>{data?.popularity}</Text>
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
