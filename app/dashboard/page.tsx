import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import SignOutButton from "../components/SignOutButton";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("api/auth/signin");
    }
    const email = session.user?.email ?? "";

    return (
        <div className="mt-14">
            <SignOutButton />
        </div>
    );
}