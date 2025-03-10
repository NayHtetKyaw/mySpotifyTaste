import { Burger, Button, Title, Flex, Box, NavLink } from "@mantine/core";
import { AppShell } from "@mantine/core";
import Link from "next/link";
import {
  IconInfoSquareRoundedFilled,
  IconHomeFilled,
} from "@tabler/icons-react";
import { ReactElement } from "react";
import { useAuth } from "@/app/auth/hooks/useAuth";

interface ApplicationHeaderProps {
  opened: boolean;
  toggle: () => void;
}

interface NavigationItems {
  title: string;
  href: string;
  icon: ReactElement;
}

export const navigationItems: NavigationItems[] = [
  {
    title: "Home",
    href: "/home",
    icon: <IconHomeFilled size={18} />,
  },

  {
    title: "About",
    href: "/about",
    icon: <IconInfoSquareRoundedFilled size={18} />,
  },
];

export default function ApplicatoinHeader({
  opened,
  toggle,
}: ApplicationHeaderProps) {
  const { isAuthenticated } = useAuth();

  return (
    <AppShell.Header>
      <Flex justify="start" gap="sm" align="center" h="100%" px="sm" w="100%">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="md" />
        <Box>
          <Link href="/">
            <Title order={1} className="self-center">
              MySpotifyTaste
            </Title>
          </Link>
        </Box>
        <Flex align="center" justify="end" w="100%" gap="md" visibleFrom="sm">
          {navigationItems.map((items) => (
            <Box key={"navitem" + items.title}>
              <NavLink
                href={items.href}
                label={items.title}
                fw="bold"
                className="self-center"
                leftSection={items.icon}
              />
            </Box>
          ))}
        </Flex>

        <Link href={isAuthenticated ? "" : "/login"}>
          <Button
            color={isAuthenticated ? "yellow" : "green"}
            miw={100}
            className="justify-self-end"
            visibleFrom="sm"
          >
            {isAuthenticated ? "Logout" : "Login"}
          </Button>
        </Link>
      </Flex>
    </AppShell.Header>
  );
}
