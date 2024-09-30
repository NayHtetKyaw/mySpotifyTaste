'use client';

import { Card, Group, Title } from "@mantine/core";
import SongCard, { songs, artists } from "@components/ui/user_profile/cards_components";

export default function UserProfile({
    songName,
    artistName,
}: {
    songName: string;
    artistName: string;
}): JSX.Element {
    return (
        <>
            <Group
                gap="lg"
                mt="lg"
                className="flex flex-row justify-center items-start"
            >
                <div className="flex flex-col w-[40%]">
                    <Card className="flex flex-col items-center text-sm mb-4">
                        <Group>
                            <Title className="text-lg">Top Artists</Title>
                        </Group>
                    </Card>

                    <div className="grid grid-cols-1">
                        {artists.map((artist) => (
                            <SongCard
                                key={artist.id || artist.name}
                                title={artist.name}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex flex-col w-[40%]">
                    <Card className="flex flex-col items-center text-sm mb-4">
                        <Group>
                            <Title className="text-lg">Top Songs</Title>
                        </Group>
                    </Card>

                    <div className="grid grid-cols-1">
                        {songs.map((song) => (
                            <SongCard
                                key={song.id || song.name}
                                title={song.name}
                                artist={song.artist || "Unknown Artist"}
                            />
                        ))}
                    </div>
                </div>
            </Group>
        </>
    );
}
