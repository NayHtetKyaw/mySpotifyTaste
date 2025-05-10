import { TabNav } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Card, CardContent } from "@/components/ui/card";
import ProfileBanner from "@/components/profilebanner";
import Navbar from "@/components/navbar";

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<ProfileBanner />
			<Navbar />
			{" "}
			{children}
		</>
	);
}
