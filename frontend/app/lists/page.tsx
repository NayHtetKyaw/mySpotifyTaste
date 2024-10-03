"use client";

import { Button, Container, Text, Title, List } from "@mantine/core";
import Image from "next/image";

export default function SongPage(): JSX.Element {
    const allSongs = [
        {
            title: "Song Title",
            artist: "Artist",
            image: "Image",
        },
        {
            title: "Song Title",
            artist: "Artist",
            image: "Image",
        },
        {
            title: "Song Title",
            artist: "Artist",
            image: "Image",
        },
        {
            title: "Song Title",
            artist: "Artist",
            image: "Image",
        },
        {
            title: "Song Title",
            artist: "Artist",
            image: "Image",
        },
        {
            title: "Song Title",
            artist: "Artist",
            image: "Image",
        },
        {
            title: "Song Title",
            artist: "Artist",
            image: "Image",
        },
        {
            title: "Song Title",
            artist: "Artist",
            image: "Image",
        },
        {
            title: "Song Title",
            artist: "Artist",
            image: "Image",
        },
        {
            title: "Song Title",
            artist: "Artist",
            image: "Image",
        },
        {
            title: "Song Title",
            artist: "Artist",
            image: "Image",
        },
    ];

    let i = 1;

    const songList = allSongs.map((song) => (
        <List.Item>
            {/* <Image src={song.image} alt="Song Image" />  */}
            <section className="flex justify-center items-center">
                <div className="mr-3">{i++}</div>
                <Image
                    src="/assets/images/myspotifytaste.png"
                    width={40}
                    height={40}
                    alt="Song Image"
                    className="my-2 mr-3"
                />
                <main>
                    <Title order={5}>{song.title}</Title>
                    <Title order={6}>{song.artist}</Title>
                </main>
            </section>
            <span className="block w-full h-[0.07rem] bg-gray-300"></span>
        </List.Item>
    ));

    return (
        <Container className="bg-gray-950 rounded-3xl py-6">
            <List type="ordered" /*className="list-decimal" */>{songList}</List>
        </Container>
    );
}
