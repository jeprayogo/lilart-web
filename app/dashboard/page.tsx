import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import DashboardBreadcrumb from "./components/DashboardBreadcrumb";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("api/auth/signin");
    }
    const name = session.user?.name ?? "";

    return (
        <div>
            <DashboardBreadcrumb />
            <div className="mt-5">
                <h1>Welcome to Dashboard,  <strong>{name}</strong></h1>
            </div>
        </div>
    );
}