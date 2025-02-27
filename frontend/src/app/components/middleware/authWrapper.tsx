"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const validateAuth = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) {
        router.push("/");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/auth/validate`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (!response.ok) throw new Error("Invalid token");
      } catch (error) {
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
        router.push("/");
      }
    };

    validateAuth();
  }, [router]);

  return <>{children}</>;
}
