import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import DashboardBreadcrumb from "../../components/DashboardBreadcrumb";
import UserTable from "@/app/components/UserTable";

export default async function user() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin");
    }

    return (
        <div>
            <div className="mb-10">
                <DashboardBreadcrumb />
            </div>
            <UserTable />
        </div>
    );
};
