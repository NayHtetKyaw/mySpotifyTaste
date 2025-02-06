"use client";

import { Tabs } from "@mantine/core";
import {
    IconPlaylist,
    IconMusicHeart,
    IconAlbum,
    IconHeartFilled,
    IconCategory2,
} from "@tabler/icons-react";

import Overview from "./overview";
import TopSongs from "./top-songs";
import TopArtists from "./top-artists";
import TopAlbums from "./top-albums";
import TopGenres from "./top-genres";

export default function HeaderTabs(): JSX.Element {
    return (
        <Tabs color="green" defaultValue="overview" autoContrast mt={50}>
            <Tabs.List grow>
                <Tabs.Tab
                    value="overview"
                    leftSection={<IconPlaylist size={20} />}
                >
                    Overview
                </Tabs.Tab>

                <Tabs.Tab
                    value="songs"
                    leftSection={<IconMusicHeart size={20} />}
                >
                    Songs
                </Tabs.Tab>
                <Tabs.Tab
                    value="artists"
                    leftSection={<IconHeartFilled size={20} />}
                >
                    Artists
                </Tabs.Tab>
                <Tabs.Tab
                    value="albums"
                    leftSection={<IconAlbum size={20} />}
                >
                    Albums
                </Tabs.Tab>
                <Tabs.Tab
                    value="genres"
                    leftSection={<IconCategory2 size={20} />}
                >
                    Genre
                </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="overview">
                <Overview />
            </Tabs.Panel>

            <Tabs.Panel value="songs">
                <TopSongs />
            </Tabs.Panel>

            <Tabs.Panel value="artists">
                <TopArtists />
            </Tabs.Panel>
            <Tabs.Panel value="albums">
                <TopAlbums />
            </Tabs.Panel>
            <Tabs.Panel value="genres">
                <TopGenres />
            </Tabs.Panel>
        </Tabs>
    );
}
