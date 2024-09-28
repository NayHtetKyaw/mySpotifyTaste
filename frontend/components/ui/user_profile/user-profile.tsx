'use client';

import { Card, Group, Title, Grid } from "@mantine/core";
import SongCard, { songsData } from "@components/ui/user_profile/cards_components";

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
                className="flex flex-col sm:flex-row justify-center"
            >
                <Card w="40%" className="flex items-center text-sm">
                    <Group>
                        <Title className="text-lg sm:text-lg">Top Artists</Title>
                    </Group>
                </Card>

                <Card w="40%" className="flex items-center text-sm flex-col">
                    <Group>
                        <Title className="text-lg sm:text-lg">Top Songs</Title>
                    </Group>

                    <Grid mt="lg">
                        {songsData.map((song) => (
                            <Grid.Col span={12} key={song.id || song.name}>
                                <SongCard
                                    title={song.name}
                                    artist={song.artists && song.artists.length > 0 ? song.artists[0].name : "Unknown Artist"}
                                />
                            </Grid.Col>
                        ))}
                    </Grid>
                </Card>
            </Group>
        </>
    );
}
