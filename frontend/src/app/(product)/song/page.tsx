"use client";
import TimeRangeDrop from "@/components/timerangedrop";
import { Box, Container, Flex, Heading, Section, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

const author = () => {
  const [tracks, setTracks] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      const respond = await fetch(
        "http://127.0.0.1:8080/api/spotify/top-tracks",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await respond.json();

      setTracks(data.tracks);

      console.log(data);
    }
    fetchData();
  }, []);

  const [selectedRange, setSelectedRange] = useState("Last 7 Days");
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
                Top Songs
              </Heading>
              <TimeRangeDrop />
            </Flex>

            {tracks.map((track, index) => {
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
                      <Text>{track.images}</Text>
                      <Text>{track.name}</Text>
                    </div>
                    <div>
                      <Text>{track.followers}</Text>
                      <Text>{track.genres}</Text>
                      <Text>{track.popularity}</Text>
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
