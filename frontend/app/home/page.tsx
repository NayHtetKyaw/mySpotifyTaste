"use client";
import { Container, Loader, Center, Text } from "@mantine/core";
import PageHeader from "@components/ui/page-header";
import HeaderTabs from "@components/ui/header-tabs";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HomePage(): JSX.Element {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <Container>
                <Center h={400}>
                    <Loader size="xl" />
                </Center>
            </Container>
        );
    }

    if (!session?.accessToken) {
        return (
            <Container>
                <Center h={400}>
                    <Text>Authentication error. Please try logging in again.</Text>
                </Center>
            </Container>
        );
    }
    
    return (
        <Container fluid>
            <PageHeader
                username={session.user?.name ?? "Music Lover"}
                avatarUrl={session.user?.image ?? "/assets/images/myspotifytaste.png"}
                songName="Sukida"
                artistName="YOASOBI"    
            />
            <HeaderTabs />  
        </Container>
    );
}