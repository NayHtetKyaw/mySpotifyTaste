"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Center, Flex, Loader } from "@mantine/core";

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleAuthentication = async () => {
      try {
        const token = searchParams.get("token");
        const userJson = searchParams.get("user");
        const code = searchParams.get("code");
        const state = searchParams.get("state");

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

          router.push("/home");
          return;
        }

        if (code && state) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE}/auth/callback?${window.location.search}`,
            {
              method: "GET",
              credentials: "include",
            },
          );

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.details || "Authentication failed");
          }

          const { token, user } = await response.json();

          // Store credentials
          localStorage.setItem("jwt", token);
          localStorage.setItem("user", JSON.stringify(user));

          router.push("/home");
          return;
        }

        router.push("/login");
      } catch (error) {
        console.error("Authentication error:", error);
        router.push("/?error=auth_failed");
      }
    };

    handleAuthentication();
  }, [router, searchParams]);

  return (
    <Flex mih={1000} align="center" justify="center">
      <Center>
        <Loader color="green" size="lg" type="bars" />
      </Center>
    </Flex>
  );
}
