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
import React, { useEffect, useState } from "react";
import { effect } from "zod";

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
  const token = localStorage.getItem("token");
  console.log(token);
  useEffect(() => {
    async function fetchData() {
      const respond = await fetch("http://localhost:8080/spotify/top-tracks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await respond.json();
      console.log(data);
    }

    fetchData;
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
