"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Center, Flex, Loader } from "@mantine/core";

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
          `${process.env.NEXT_PUBLIC_API_BASE}/auth/callback?${window.location.search}`,
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.details || "Authentication failed");
        }

        const { token, user } = await response.json();

        // Store credentials
        localStorage.setItem("jwt", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Redirect to home
        window.location.href = "/home";
      } catch (error) {
        console.error("Authentication error:", error);
        window.location.href = "/?error=auth_failed";
      }
    };

    handleAuth();

    if (code && state) handleAuth();
  }, [router, searchParams]);

  return (

    <Flex mih={1000} align="center" justify="center">

      <Center>
        <Loader color="green" size="lg" type="bars" />
      </Center>
    </Flex>
  );
}
