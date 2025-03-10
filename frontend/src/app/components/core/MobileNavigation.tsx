import { AppShell, Button, NavLink, Flex, Stack } from "@mantine/core";
import { navigationItems } from "./ApplicationHeader";
import { useAuth } from "@/app/auth/hooks/useAuth";
import Link from "next/link";

interface MobileNavigationProps {
  opened: boolean;
}

export default function MobileNavigation({ opened }: MobileNavigationProps) {
  const { isAuthenticated } = useAuth();
  return (
    <AppShell.Navbar hidden={!opened} hiddenFrom="sm">
      <Stack align="center" p="sm">
        {navigationItems.map((items) => (
          <Flex justify="center" key={items.title} align="center">
            <NavLink
              label={items.title}
              href={items.href}
              leftSection={items.icon}
              style={{ fontSize: "var(--mantine-font-size-xl)" }}
            />
          </Flex>
        ))}
      </Stack>
      <Link
        href={isAuthenticated ? "" : "/login"}
        className="flex justify-center"
      >
        <Button color={isAuthenticated ? "yellow" : "green"} w="80%">
          {isAuthenticated ? "Logout" : "Login"}
        </Button>
      </Link>
    </AppShell.Navbar>
  );
}
