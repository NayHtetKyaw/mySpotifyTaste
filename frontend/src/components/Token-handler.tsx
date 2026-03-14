"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type SearchParams = { [key: string]: string | string[] | undefined };

export default function TokenHandler({
	searchParams,
}: { searchParams: SearchParams }) {
	const router = useRouter();

	useEffect(() => {
		const token =
			typeof searchParams?.token === "string" ? searchParams.token : undefined;
		if (token) {
			localStorage.setItem("token", token);
			router.replace("/dashboard"); // use replace to avoid back-navigation to token URL
		}
	}, [searchParams, router]);

	return null;
}
