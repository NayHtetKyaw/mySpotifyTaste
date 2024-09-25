import { NavLink } from "@mantine/core";
import Link from "next/link";
import { NavigationItem } from "./ApplicationHeader";

interface RecursiveNavLinkProps {
	item: NavigationItem;
}
export default function RecursiveNavLink({ item }: RecursiveNavLinkProps) {
	return item.href ? (
		<NavLink component={Link} label={item.title} href={item.href} className="no-underline" />
	) : (
		<NavLink label={item.title} />
	);
}