import {AppShell, RemoveScroll, Stack, Button} from "@mantine/core";
import { navigationItems } from "./ApplicationHeader";
import RecursiveNavLink from "./RecursiveNavlink";
import { LoginButton } from "./ApplicationHeader";

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

                    <div className="mt-auto lg:ml-2">
                        <LoginButton isLoggedIn={false} onLogin={() => {}} onLogout={() => {}} />
					</div>
                </Stack> 
            </RemoveScroll>
        </AppShell.Navbar>
    );
}