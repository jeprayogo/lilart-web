import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import SignOutButton from "../components/SignOutButton";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("api/auth/signin");
    }

    return (
        <div className="mt-10">
            <h1 className="text-gray-900 text-center mb-4">Selamat Datang Di Dashboard, {session.user?.email}</h1>

            <SignOutButton />
        </div>
    );
}