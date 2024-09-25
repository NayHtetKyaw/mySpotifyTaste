"use client";

import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ApplicationHeader from "./ApplicationHeader";
import { ApplicationNavigation } from "./ApplicationNavigation";

export function ApplicationShell({ children }: { children: React.ReactNode }): JSX.Element {
	const [opened, { toggle }] = useDisclosure();

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: 300,
				breakpoint: "sm",
				collapsed: { mobile: !opened, desktop: !opened }
			}}
			padding="md"
		>
			<ApplicationHeader opened={opened} toggle={toggle} isLoggedIn={false} onLogin={() => {}} onLogout={() => {}}/>  //TODO: Implement login/logout
			<ApplicationNavigation opened={opened} />

			<AppShell.Main className="h-dvh">{children}</AppShell.Main>
		</AppShell>
	);
}