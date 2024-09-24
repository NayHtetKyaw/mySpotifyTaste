import { AppShell, Burger, NavLink, Flex, Title, Button } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";

interface ApplicationHeaderProps {
    opened: boolean;
    toggle: () => void;
    isLoggedIn: boolean;
    onLogin: () => void;
    onLogout: () => void;
}

export interface NavigationItem {
    title: string;
    href: string;
    subItems?: NavigationItem[];
    // icon: React.ReactNode;
}

interface LogoProps {
    link: string;
    src: string;
    alt: string;
    isRounded?: boolean;
}

function Logo({ link, src, alt, isRounded = false }: LogoProps) {
    return (
        <div
            className={`relative ${
                isRounded ? "aspect-square" : "aspect-[1.2]"
            } h-full ml-16`}
        >
            <Link href={link}>
                <Image
                    className={isRounded ? "rounded-full" : ""}
                    src={src}
                    alt={alt}
                    fill
                />
            </Link>
        </div>
    );
}

export const navigationItems: NavigationItem[] = [
    {
        title: "About us",
        href: "/about",
        // icon: <DashboardIcon />
    },
    {
        title: "Profile",
        href: "/profile",
        // icon: <ProfileIcon />
    },
];

export default function ApplicationHeader({
    opened,
    toggle,
    isLoggedIn,
    onLogin,
    onLogout,
}: ApplicationHeaderProps) {
    return (
        <AppShell.Header p="sm">
            <Flex align="center" h="100%">
                <div className="w-full relative max-auto h-full">
                    <div className="flex h-full flex-row items-center">
                        <Burger
                            opened={opened}
                            onClick={toggle}
                            hiddenFrom="lg"
                            size="lg"
                        />
                        <Logo
                            link="/"
                            src="/assets/images/myspotifytaste-logo.png"
                            alt="My Spotify Taste"
                        />
                        <Title order={3} className="min-w-56 text-sm md:text-lg lg:text-lg">
                            「My Spotify Taste」
                        </Title>
                        <Navigation items={navigationItems} />
                        <LoginButton
                            isLoggedIn={isLoggedIn}
                            onLogin={onLogin}
                            onLogout={onLogout}
                        /> 
                    </div>
                </div>
            </Flex>
        </AppShell.Header>
    );
}

function Navigation({ items }: { items: NavigationItem[] }) {
    return (
        <div className="ml-10 hidden h-full w-full flex row justify-end gap-x-4 lg:flex">
            {items.map((item) => (
                <div
                    key={"navitem" + item.title}
                    className="relative flex h-full sursor-pointer flex-col items-center"
                >
                    <NormalNavLink
                        {...item}
                        isExternal={item.href.startsWith("http")}
                    />
                </div>
            ))}
        </div>
    );
}

function NormalNavLink({
    title,
    href,
    isExternal = false,
}: NavigationItem & { isExternal?: boolean }) {
    return (
        <NavLink
            component={Link}
            href={href}
            label={title}
            target={isExternal ? "_blank" : "_self"}
            className="rounded-sm no-underline"
        />
    );
}

export function LoginButton({ isLoggedIn, onLogin, onLogout }: { isLoggedIn: boolean; onLogin: () => void; onLogout: () => void }) {
    return (
        <div className="hidden lg:ml-10 lg:mr-10 lg:inline w-fit">
            {isLoggedIn ? (
                <Button onClick={onLogout} variant="filled" color="green" radius={20}>
                    Logout
                </Button>
            ) : (
                <Button onClick={onLogin} variant="filled" color="green" radius={20}>
                    Login with spotify
                </Button>
            )}
        </div>
    );
}