import { Burger, Title, Flex } from "@mantine/core";
import { AppShell } from "@mantine/core";

interface ApplicationHeaderProps {
  opened: boolean;
  toggle: () => void;
}

interface NavigationItems {
  title: string;
  href: string;
}

export default function ApplicatoinHeader({
  opened,
  toggle,
}: ApplicationHeaderProps) {
  return (
    <AppShell.Header>
      <Flex justify="start" gap="sm" align="center" h="100%" px="sm">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="md" />
        <Title ml="md">My Spotify Taste</Title>
      </Flex>
    </AppShell.Header>
  );
}
