import {AppShell, RemoveScroll, Stack} from "@mantine/core";
import Link from "next/link";
import { navigationItems } from "./ApplicationHeader";
import RecursiveNavLink from "./RecursiveNavlink";

interface ApplicationNavigationProps {
    opened: boolean;
}

export function ApplicationNavigation({ opened }: ApplicationNavigationProps) {
    return (
        <AppShell.Navbar p="md" hidden={!opened}>
            <RemoveScroll enabled={opened}>
                <Stack className="h-full" gap="xs">
                   {navigationItems.map(({ title, href, subItems }) => (
                        <RecursiveNavLink key={title} item={{ title, href }} />
                    ))}
                </Stack> 
            </RemoveScroll>
        </AppShell.Navbar>
    );
}