"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Center, Container, Loader } from "@mantine/core";

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const userJson = searchParams.get("user");

    if (token) {
      localStorage.setItem("jwt", token);

      if (userJson) {
        try {
          const decoded = decodeURIComponent(userJson);
          localStorage.setItem("user", decoded);
        } catch (e) {
          console.error("Failed to parse user data", e);
        }
      }

      window.dispatchEvent(new Event("storage"));
      console.log("Authentication Success (Redirect)");
      router.push("/home");
      return;
    }

    const code = searchParams.get("code");
    const state = searchParams.get("state");

    const handleAuth = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/auth/callback?code=${code}&state=${state}`,
        );

        const { token, user } = await response.json();

        localStorage.setItem("jwt", token);
        localStorage.setItem("user", JSON.stringify(user));

        window.dispatchEvent(new Event("storage"));
        console.log("Authentication Success");

        router.push("/home");
      } catch (error) {
        console.log("Authentication failed: ", error);
        router.push("/");
      }
    };

    if (code && state) handleAuth();
  }, [router, searchParams]);

  return (
    <Container>
      <Center>
        <Loader color="green" size="lg" type="bars" />
      </Center>
    </Container>
  );
}
