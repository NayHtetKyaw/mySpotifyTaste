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
			<div style={{ background: "linear-gradient(135deg, #031208 0%, #1a1a2e 30%, #16213e 70%, #0f3460 100%)" }}>
				<ProfileBanner />
				<Navbar />
				{children}
			</div>
		</>
	);
}
