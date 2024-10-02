import { Card, Text } from '@mantine/core';

interface SongCardProps {
    title: string;
    artist: string;
}

const SongCard: React.FC<SongCardProps> = ({ title, artist }) => {
    return (
        <Card shadow="sm" padding="lg" className="flex flex-col">
            <Text w={500}>{title}</Text>
            <Text size="sm" color="dimmed">{artist}</Text>
        </Card>
    );
};

const songs = [
    { id: 1, name: 'AM 02:00', artist: 'Aimer' },
    { id: 2, name: 'AM 02:00', artist: 'Aimer' },
    { id: 3, name: 'AM 02:00', artist: 'Aimer' },
    { id: 4, name: 'AM 02:00', artist: 'Aimer' },
    { id: 5, name: 'AM 02:00', artist: 'Aimer' },
];

const artists = [
    { id: 1, name: 'Aimer' },
    { id: 2, name: 'Aimer' },
    { id: 3, name: 'Aimer' },
    { id: 4, name: 'Aimer' },
    { id: 5, name: 'Aimer' },
]

export { songs, artists };
export default SongCard;
