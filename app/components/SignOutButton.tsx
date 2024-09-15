"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
    return (
        <button className="flex mx-auto p-2 text-black font-bold rounded-md bg-blue-100" onClick={() => signOut({ callbackUrl: "/" })}>
            Log Out
        </button>
    );
};
