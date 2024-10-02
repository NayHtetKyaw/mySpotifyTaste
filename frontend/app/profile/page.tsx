
import { Container } from "@mantine/core";
import PageHeader from "@components/ui/page-header";
import Userprofile from "@components/ui/user_profile/user-profile";

export default function ProfilePage(): JSX.Element {
    return (
        <Container fluid>
            <PageHeader
                username="Anascence"
                avatarUrl="/assets/images/myspotifytaste.png"
                songName="Sukida"
                artistName="YOASOBI"
            />
            <Userprofile></Userprofile>
        </Container>
    );
}
