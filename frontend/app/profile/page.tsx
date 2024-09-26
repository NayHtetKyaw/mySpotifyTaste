import { Container, Box } from "@mantine/core";
import UserProfile from "@components/ui/user-profile";

export default function HomePage(): JSX.Element {
    return (
        <Container fluid>
            <Box className="center">
                <UserProfile
                    username="Bammcool"
                    userid="m39lo3qutpohzmpqqn1r9i6d5"
                    avatarUrl="/assets/images/myspotifytaste.png">
                </UserProfile>

            </Box>
        </Container >
    );
}

