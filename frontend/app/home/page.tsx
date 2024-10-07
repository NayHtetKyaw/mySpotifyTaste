"use client";
import { Container, Loader, Center, Text } from "@mantine/core";
import PageHeader from "@components/ui/page-header";
import HeaderTabs from "@components/ui/header-tabs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface userData {
    user: {
        display_name: string;
        followers: { total: number };
        images: { url: string }[];
        favoriteGenre: string;
    };

    topTracks: any[];
    topArtists: any[];
    topGenres: string[];
}

export default function HomePage(): JSX.Element {
    const [userData, setUserData] = useState<userData | null>(null);
    const [Loading, setloading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const urlParms = new URLSearchParams(window.location.search);
                const access_token = urlParms.get("access_token");  

                if ( !access_token ) {
                    router.push("/");
                    return;
                }

                const response = await fetch(`/api/spotify?access_token=${access_token}`);
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    console.error("Failed to fetch user data");
                }
            } catch (error){
                console.error("Error fetching user data:", error);
            } finally {
                setloading(false);
            }
        }

        fetchUserData();
    }, [router]);

    if (Loading) {
        return (
            <Center>
                <Loader />
            </Center>
        );
    }

    if(!userData) { 
        return (
            <Container>
                <Text size="xl">
                    Error fetching user data
                </Text>
            </Container>
        );
    }

     return (
        <Container fluid>
            <PageHeader
                username={userData.user.display_name}
                profilePicture={userData.user.images[0]?.url || "/assets/images/myspotifytaste.png"}
                followers={userData.user.followers}
                favoriteGenre={userData.topArtists[0]?.genres[0] || "N/A"}
            /> 
            <HeaderTabs />  
        </Container>
    );
}