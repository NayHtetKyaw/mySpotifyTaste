"use client";

import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode, useEffect } from "react";

import ApplicatoinHeader from "./ApplicationHeader";
import { usePathname } from "next/navigation";

export default function ApplicationShell({
  children,
}: {
  children: ReactNode;
}) {
  const [opened, { toggle, close }] = useDisclosure();

  const pathname = usePathname();
  useEffect(() => {
    close();
  }, [pathname, close]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "lg",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <ApplicatoinHeader opened={opened} toggle={toggle} />
      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
