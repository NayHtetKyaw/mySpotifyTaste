"use client";
import TimeRangeDrop from "@/components/timerangedrop";
import LoaderOne from "@/components/ui/loader-one";
import { Box, Container, Flex, Heading, Section, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useTransition } from "react";

type Tracks = {
  uri: string;
  name: string;
  album: {
    images: { height: number; width: number; url: string }[];
    names: string;
    artists: {
      external_urls: { spotify: string };
      href: string;
      id: string;
      name: string;
      uri: string;
    }[];
  };
};


const author = () => {
  const [tracks, setTracks] = useState<Tracks[]>([]);
  const [isPending, startTransition] = useTransition();
  const [selectedRange, setSelectedRange] = useState<{
    label: string;
    value: string;
  }>({
    label: "Short Term",
    value: "short_term",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        startTransition(async () => {
          const token = localStorage.getItem("token");
          const response = await fetch(
            `http://127.0.0.1:8080/api/spotify/top-tracks/${selectedRange.value}`,
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

          setTracks(data.tracks);

          console.log(data);
        });
      } catch (error) {}
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
            {tracks.map((track, index) => {
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
                  <Link href={track?.uri} target="_blank">
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
                            src={track?.album?.images[2]?.url}
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
                          {track?.album.artists[0].name}
                        </Text>
                      </Flex>
                      <div>
                        {/* <Text>{data?.followers?.total}</Text> */}
                        <Text className="group-hover:backdrop-blur-md group-hover:brightness-120 filter group-hover:saturate-150">
                          {track?.name}
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
