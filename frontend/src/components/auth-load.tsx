"use client";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoaderOne from "@/components/ui/loader-one";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default function Page(props: {
	params: Params;
	searchParams: SearchParams;
}) {
	const router = useRouter();
	const searchParams = use(props.searchParams);

	useEffect(() => {
		const token = searchParams.token;
		if (token) {
			// console.log(token);
			localStorage.setItem("token", token.toString());
			router.push("/dashboard");
		}
	}, [router, searchParams]);

	return (
		<>
			<LoaderOne />
		</>
	);
}
