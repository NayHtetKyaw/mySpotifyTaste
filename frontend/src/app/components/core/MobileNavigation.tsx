import { AppShell, Button, NavLink, Flex, Stack } from "@mantine/core";
import { navigationItems } from "./ApplicationHeader";

interface MobileNavigationProps {
  opened: boolean;
}

export default function MobileNavigation({ opened }: MobileNavigationProps) {
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

        <Button color="green" w="100%">
          Login
        </Button>
      </Stack>
    </AppShell.Navbar>
  );
}
