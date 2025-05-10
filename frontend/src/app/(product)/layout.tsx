import { TabNav } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Card, CardContent } from "@/components/ui/card";
import ProfileBanner from "@/components/profilebanner";

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<ProfileBanner />
			<TabNav.Root className="">
				<TabNav.Link href="#" active>
					account
				</TabNav.Link>
				<TabNav.Link href="#dashboard">Dashboard</TabNav.Link>
				<TabNav.Link href="#artist">Artists</TabNav.Link>
				<TabNav.Link href="#song">Songs</TabNav.Link>
			</TabNav.Root>{" "}
			{children}
		</>
	);
}
