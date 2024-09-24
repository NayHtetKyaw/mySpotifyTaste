import { ApplicationShell } from "@/components/core/AppShell";
import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import type { Metadata } from "next";
import "@mantine/core/styles.css";
import "./globals.css"

export const metadata: Metadata = {
    title: "My Spotify Taste",
    description:
        "A web application that visualizes your Spotify listening history & stats.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    const theme = createTheme({
        breakpoints: {
            xs: "576px",
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
        },

        colors: {
            dark: [
			"#909296",
			"#5C5F66",
			"#373A40",
			"#2C2E33",
			"#25262B",
			"#1A1B1E",
			"#141517",
			"#101113",
			"#1A1B1C",
			"#0e0f14"
            ],
        },
    });

    return (
        <html lang="en">
            <head>
                <ColorSchemeScript defaultColorScheme="dark" />
            </head>
            <body>
                <MantineProvider theme={theme} defaultColorScheme="dark">
                    <ApplicationShell>{children}</ApplicationShell>
                </MantineProvider>
            </body>
        </html>
    );
}