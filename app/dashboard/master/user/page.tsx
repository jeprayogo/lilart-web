import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import DashboardBreadcrumb from "../../components/DashboardBreadcrumb";

export default async function user() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin");
    }

    return (
        <div>
            <DashboardBreadcrumb />
            <h1 className="mt-5">User</h1>
        </div>
    );
};
