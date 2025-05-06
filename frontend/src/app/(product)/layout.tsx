import { TabNav } from "@radix-ui/themes";

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<div className="">
				<TabNav.Root className="">
					<TabNav.Link href="#" active>
						account
					</TabNav.Link>
					<TabNav.Link href="#">Documents</TabNav.Link>
					<TabNav.Link href="#">Settings</TabNav.Link>
				</TabNav.Root>{" "}
				{children}
			</div>
		</>
	);
}
