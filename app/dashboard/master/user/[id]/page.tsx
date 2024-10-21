'use client';

import { decrypt } from "@/app/lib/util";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserDetailPage({ params }: { params: { id: string } }) {
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const fetchUserData = async (userId: string) => {
        try {
            const res = await fetch(`/api/users/${decrypt(decodeURIComponent(userId))}`);
            if (!res.ok) {
                throw new Error('Failed to fetch user data');
            }

            const data = await res.json();

            setUserData(data);
            setLoading(false);

        } catch (error) {
            console.error('Error fetching user data:', error);
            router.push("/dashboard/master/user");
        }
    };


    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (params.id) {
            fetchUserData(params.id);
        }
    }, [params.id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!userData) {
        return <div>No user data found</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Detail User</h2>
            <div className="max-w-lg mx-auto p-4">
                <form className="max-w-lg mx-auto">
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900">User ID</label>
                        <input
                            type="text"
                            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            value={userData.UserID}
                            readOnly
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <input
                            type="email"
                            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            value={userData.Email}
                            readOnly
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Nama</label>
                        <input
                            type="text"
                            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            value={`${userData.NamaDepan} ${userData.NamaBelakang}`}
                            readOnly
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Nomor Handphone</label>
                        <input
                            type="text"
                            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            value={userData.NoHP}
                            readOnly
                        />
                    </div>
                    <div className="flex items-center mb-5">

                        <input
                            type="checkbox"
                            checked={userData.bAktif}
                            readOnly
                        />
                        <label className="ms-2 block mb-2 text-sm font-medium text-gray-900">Aktif</label>
                    </div>
                    <Link href="/dashboard/master/user" className="text-white bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                        Kembali
                    </Link>
                </form>
            </div>
        </div>
    );
};