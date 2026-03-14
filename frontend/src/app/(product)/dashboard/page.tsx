"use client";

import { Text, Flex, Grid, Section, Container } from "@radix-ui/themes";
import ListeningTime from "@/components/ui/dashboard/listen-time";
import UniqueArtist from "@/components/ui/dashboard/unique-artist";
import TopGenre from "@/components/ui/dashboard/top-genre";
import TopTracks from "@/components/ui/dashboard/top-tracks";
import History from "@/components/ui/dashboard/history";
import TimeRangeDrop from "@/components/timerangedrop";
import RecentlyPlayedBox from "@/components/ui/dashboard/recently";
import { init } from "next/dist/compiled/webpack/webpack";
import { useState } from "react";

export default function Dashboard() {
  const [selectedRange, setSelectedRange] = useState<{
    label: string;
    value: string;
  }>({
    label: "Short Term",
    value: "short_term",
  });
  return (
    <Container maxWidth="1600px" px={{ initial: "2px", sm: "4rem" }}>
      <Section>
        <Section
          className="border border-white/10 bg-white/2 rounded-xl"
          style={{ padding: "2rem", marginBottom: "2rem" }}
        >
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
            <TimeRangeDrop
              selectedRange={selectedRange}
              setSelectedRange={setSelectedRange}
            />
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
        </Section>

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

      <Section>
        <RecentlyPlayedBox />
      </Section>
    </Container>
  );
}
