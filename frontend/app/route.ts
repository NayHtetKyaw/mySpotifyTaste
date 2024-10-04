import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (session?.accessToken) {
        redirect("/home");
    } else {
        redirect("/welcome");
    }
}