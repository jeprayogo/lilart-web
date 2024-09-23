import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import CreateUserForm from "@/app/components/user/CreateUserForm";

export default async function user() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin");
    }

    return (
        <div>
            <div className="mb-10">
                <h1 className="font-bold text-xl mb-5">Tambah User</h1>
                <CreateUserForm />
            </div>
        </div>
    );
};
