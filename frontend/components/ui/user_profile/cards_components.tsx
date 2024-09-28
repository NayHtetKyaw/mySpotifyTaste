
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

export const songsData = [
    { id: 1, name: 'AM 02:00', artists: [{ name: 'Aimer' }] },
    { id: 2, name: 'Song Two', artists: [{ name: 'Artist B' }] },
    { id: 3, name: 'Song Three', artists: [{ name: 'Artist C' }] },
    { id: 4, name: 'Song Four', artists: [{ name: 'Artist D' }] },
    { id: 5, name: 'Song Five', artists: [{ name: 'Artist E' }] },
    { id: 6, name: 'Song Six', artists: [{ name: 'Artist F' }] },
    { id: 7, name: 'Song Seven', artists: [{ name: 'Artist G' }] },
    { id: 8, name: 'Song Eight', artists: [{ name: 'Artist H' }] },
    { id: 9, name: 'Song Nine', artists: [{ name: 'Artist I' }] },
    { id: 10, name: 'Song Ten', artists: [{ name: 'Artist J' }] },
];

export default SongCard;
