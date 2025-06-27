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
import LiquidGlass from "liquid-glass-react";
import Link from "next/link";

type artist = {
  name: string;
  images: { height: number; width: number; url: string }[];
  // popularity: number;
  uri: string;
  genres: string[];
  // followers: { total?: number; href?: string };
};

const author = () => {
  const [selectedRange, setSelectedRange] = useState<{
    label: string;
    value: string;
  }>({
    label: "Short Term",
    value: "short_term",
  });
  const [artist, setArtist] = useState<artist[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    async function fetchData() {
      try {
        startTransition(async () => {
          const token = localStorage.getItem("token");

          // console.log(token);
          const response = await fetch(
            `http://127.0.0.1:8080/api/spotify/top-artists/${selectedRange.value}`,
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

          setArtist(data.artists);
        });
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [selectedRange]);

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
              <TimeRangeDrop
                setSelectedRange={setSelectedRange}
                selectedRange={selectedRange}
              />
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
                  className="rounded-2xl border-b-1 shadow-xl border-neutral-600/100 hover:border-neutral-400/100 group "
                >
                  <Link href={data.uri} target="_blank">
                    <Flex
                      my={"2"}
                      className=" [&>*]:px-4 rounded-md pl-1"
                      py={"3"}
                      justify={"between"}
                      align={"center"}
                    >
                      <Flex align={"center"} justify={"center"} gap={"3"}>
                        <Text className="group-hover:backdrop-blur-md group-hover:brightness-120 filter group-hover:saturate-150">
                          {index + 1}
                        </Text>
                        <Box className="relative w-12 h-12 md:w-15 md:h-15">
                          <Image
                            src={data?.images[2]?.url}
                            // width={50}
                            // height={50}
                            fill={true}
                            alt="Picture of the author"
                            className="object-cover rounded-full"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            quality={75}
                          />
                        </Box>
                        <Text className="group-hover:backdrop-blur-md group-hover:brightness-120 filter group-hover:saturate-150 ">
                          {data.name}
                        </Text>
                      </Flex>
                      <div>
                        {/* <Text>{data?.followers?.total}</Text> */}
                        <Text className="group-hover:backdrop-blur-md group-hover:brightness-120 filter group-hover:saturate-150">
                          {data?.genres[0]?.toUpperCase()}
                        </Text>
                        {/* <Text>{data?.popularity}</Text> */}
                      </div>
                    </Flex>
                  </Link>
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
