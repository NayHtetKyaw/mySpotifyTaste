import { TabNav } from "@radix-ui/themes";

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<div className="pt-4 px-6">
				<TabNav.Root>
					<TabNav.Link href="#" active>
						account
					</TabNav.Link>
					<TabNav.Link href="#">Documents</TabNav.Link>
					<TabNav.Link href="#">Settings</TabNav.Link>
				</TabNav.Root>{" "}
			</div>
			{children}
		</>
	);
}
