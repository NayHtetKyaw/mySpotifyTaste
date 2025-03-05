"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Flex, Button, Loader } from "@mantine/core";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initiateLogin = async () => {
      const token = localStorage.getItem("jwt");

      if (token) {
        router.push("/home");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/auth/login`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.login_url) {
          throw new Error("login_url is missing in the response");
        }

        window.location.href = data.login_url;
      } catch (error) {
        console.error("Login failed:", error);
        setLoading(false);
      }
    };

    initiateLogin();
  }, [router]);

  return (
    <Flex w="100%" h="100vh" align="center" justify="center">
      <Loader color="green" size="lg" type="bars" />
    </Flex>
  );
}
