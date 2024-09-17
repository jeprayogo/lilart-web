import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import SignOutButton from "../components/SignOutButton";
import DashboardLayout from "./layout";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("api/auth/signin");
    }
    const email = session.user?.email ?? "";

    return (
        <DashboardLayout email={email}>
            <div className="mt-10">
                <SignOutButton />
            </div>
        </DashboardLayout>
    );
}