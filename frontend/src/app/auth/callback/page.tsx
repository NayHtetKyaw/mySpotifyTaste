"use client";
import { Suspense, use, useEffect } from "react";
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
			console.log(token);
			localStorage.setItem("token", token.toString());
			router.push("/dashboard");
		}
	}, [router, searchParams]);

	return (
		<div className="relative w-screen h-screen">
			<LoaderOne className="absolute inset-0" />
			{/* {searchParams.token} */}
		</div>
	);
}

// import { Suspense } from "react";
// import TokenHandler from "@/components/Token-handler";
// import LoaderOne from "@/components/ui/loader-one"; // import your spinner
//
// type Params = { slug: string };
// type SearchParams = { [key: string]: string | string[] | undefined };
//
// export default function Page({
// 	params,
// 	searchParams,
// }: {
// 	params: Params;
// 	searchParams: SearchParams;
// }) {
// 	return (
// 		<Suspense fallback={<LoaderOne />}>
// 			<TokenHandler searchParams={searchParams} />
// 		</Suspense>
// 	);
// }
