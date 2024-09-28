
import { Title, Container, Text } from "@mantine/core";
import PageHeader from "@components/ui/page-header";
import Song from "@components/ui/user_profile/songs";


export default function HomePage(): JSX.Element {
    return (
        <Container fluid>
            <PageHeader
                username="Anascence"
                avatarUrl="/assets/images/myspotifytaste.png"
                songName="Sukida"
                artistName="YOASOBI"
            />
            <Song></Song>
        </Container>
    );
}
