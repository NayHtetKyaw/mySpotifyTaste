import {
    AppShell,
    Burger,
    NavLink,
    Flex,
    LoadingOverlay,
} from "@mantine/core";
import Link from "next/link";
import Image from "next/image";

interface ApplicationHeaderProps {
    opened: boolean;
    toggle: () => void;
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
        title: "Home",
        href: "/",
        // icon: <DashboardIcon />
    },
    {
        title: "Profile",
        href: "/profile",
        // icon: <ProfileIcon />
    },
    {
        title: "Settings",
        href: "/settings",
        // icon: <SettingsIcon />
    },
];

export default function ApplicationHeader({
    opened,
    toggle,
}: ApplicationHeaderProps) {
    return (
        <AppShell.Header p="sm">
            <Flex align="center" h="100%">
                <div className="container relative max-auto h-full">
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
                        <Navigation items={navigationItems} />
                    </div>
                </div>
            </Flex>
        </AppShell.Header>
    );
}

function Navigation({ items }: { items: NavigationItem[] }) {
    return (
        <div className="ml-10 hidden h-full w-full flex row items-center gap-x-4 lg:flex">
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
