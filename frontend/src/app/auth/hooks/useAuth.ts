import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("jwt");
      const user = localStorage.getItem("user");

      if (token && user) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
        router.push("/login");
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  return { isAuthenticated, isLoading };
}
