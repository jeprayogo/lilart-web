import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import SignOutButton from "../components/SignOutButton";
import DashboardBreadcrumb from "./components/DashboardBreadcrumb";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("api/auth/signin");
    }
    const email = session.user?.email ?? "";

    return (
        <div>
            <DashboardBreadcrumb />
            <div className="mt-5">
                <h1>Welcome {email}</h1>
                <SignOutButton />
            </div>
        </div>
    );
}