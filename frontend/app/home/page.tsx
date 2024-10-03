import {Title, Container, Text} from "@mantine/core";
import PageHeader from "@components/ui/page-header";
import HeaderTabs from "@components/ui/header-tabs";

export default function HomePage(): JSX.Element {
    return (
        <Container fluid>
            <PageHeader
                username="Anascence"
                avatarUrl="/assets/images/myspotifytaste.png"
                songName="Sukida"
                artistName="YOASOBI"
            />
            <HeaderTabs />  
        </Container>
    );
}
