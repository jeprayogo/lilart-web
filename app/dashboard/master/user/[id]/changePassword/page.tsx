"use client";

import ChangePasswordForm from "@/app/components/user/ChangePasswordForm";

export default function ChangePassword({ params }: { params: { id: string } }) {
    return (
        <div>
            <div className="mb-10">
                <h1 className="font-bold text-xl mb-5">Ubah Password</h1>
                <ChangePasswordForm params={params} />
            </div>
        </div>
    );
};
