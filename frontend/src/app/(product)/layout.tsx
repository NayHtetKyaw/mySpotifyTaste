import {TabNav} from "@radix-ui/themes"


export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<div>
				hello
				{children}
			</div>
		</>
	);
}
