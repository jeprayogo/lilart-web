'use client';

import { decrypt } from "@/app/lib/util";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';

export default function EditUser({ params }: { params: { id: string } }) {

    const { data: session } = useSession();

    const currentUser = session?.user?.email;

    const [userData, setUserData] = useState({
        UserID: "",
        Email: "",
        NamaDepan: "",
        NamaBelakang: "",
        NoHP: "",
        bAktif: true,
    });
    const [errors, setErrors] = useState({
        Email: "",
        NamaDepan: "",
        NamaBelakang: "",
        NoHP: "",
    });
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchUserData = async (userId: string) => {
        try {
            const response = await fetch(`/api/users/${decrypt(decodeURIComponent(userId))}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const data = await response.json();
            setUserData({
                UserID: data.UserID,
                Email: data.Email,
                NamaDepan: data.NamaDepan,
                NamaBelakang: data.NamaBelakang,
                NoHP: data.NoHP,
                bAktif: data.bAktif,
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user data:', error);
            router.push('/dashboard/master/user');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        const nameMaxLength = 50;
        const nameValue = name === 'NamaDepan' && value.length > nameMaxLength || name === 'NamaBelakang' && value.length > nameMaxLength ? value.slice(0, nameMaxLength) : value;

        setUserData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
            [name]: nameValue,
        }));
    };

    const validateForm = () => {
        let formIsValid = true;
        let newErrors = {
            Email: "",
            NamaDepan: "",
            NamaBelakang: "",
            NoHP: "",
        };

        //validasi Email
        if (!userData.Email) {
            newErrors.Email = "Email harus diisi.";
            formIsValid = false;
        } else if (!/\S+@\S+\.\S+/.test(userData.Email)) {
            newErrors.Email = "Email tidak valid.";
            formIsValid = false;
        }

        //Validasi Nama Depan
        if (!userData.NamaDepan) {
            newErrors.NamaDepan = "Nama Depan harus diisi.";
            formIsValid = false;
        }

        //Validasi Nama Belakang
        if (!userData.NamaBelakang) {
            newErrors.NamaBelakang = "Nama Belakang harus diisi.";
            formIsValid = false;
        }

        //Validasi No HP
        if (!userData.NoHP) {
            newErrors.NoHP = "No HP harus diisi.";
            formIsValid = false;
        } else if (!/^\d+$/.test(userData.NoHP)) {
            newErrors.NoHP = "No HP harus berupa angka.";
            formIsValid = false;
        }

        setErrors(newErrors);
        return formIsValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {
            setLoading(true);
            try {
                const response = await fetch(`/api/users/${decrypt(decodeURIComponent(params.id))}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                });

                if (response.ok) {
                    router.push('/dashboard/master/user');
                    Swal.fire({
                        title: 'Success',
                        text: 'data user berhasil diubah',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                } else {
                    throw new Error('Gagal mengupdate data user');
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchUserData(params.id);
    }, [params.id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
            <div className="max-w-lg mx-auto p-4">
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                    <div className="mb-5">
                        <label htmlFor="UserID" className="block mb-2 text-sm font-medium text-gray-900">User ID</label>
                        <input
                            type="text"
                            name="UserID"
                            placeholder="Masukan User ID"
                            value={userData.UserID}
                            className="bg-gray-200 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            readOnly
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <input
                            type="email"
                            name="Email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            value={userData.Email}
                            onChange={handleInputChange}
                        />
                        {errors.Email && <p className="mt-2 text-sm text-red-600">{errors.Email}</p>}
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Nama Depan</label>
                        <input
                            type="text"
                            name="NamaDepan"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            value={userData.NamaDepan}
                            onChange={handleInputChange}
                        />
                        {errors.NamaDepan && <p className="mt-2 text-sm text-red-600">{errors.NamaDepan}</p>}
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Nama Belakang</label>
                        <input
                            type="text"
                            name="NamaBelakang"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            value={userData.NamaBelakang}
                            onChange={handleInputChange}
                        />
                        {errors.NamaBelakang && <p className="mt-2 text-sm text-red-600">{errors.NamaBelakang}</p>}
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Nomor Handphone</label>
                        <input
                            type="text"
                            name="NoHP"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            value={userData.NoHP}
                            onChange={handleInputChange}
                        />
                        {errors.NoHP && <p className="mt-2 text-sm text-red-600">{errors.NoHP}</p>}
                    </div>
                    <div className="flex items-center mb-5">

                        <input
                            type="checkbox"
                            name="bAktif"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            checked={userData.bAktif}
                            onChange={handleInputChange}
                            disabled={userData.Email === currentUser ? true : false}
                        />
                        <label className="ms-2 block mb-2 text-sm font-medium text-gray-900">Aktif</label>
                    </div>
                    <div className="mb-5">
                        <button type="submit" className={`text-white bg-purple-600 hover:bg-purple-800 mr-2 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${loading ? 'opacity-50' : ''}`} disabled={loading}>{loading ? 'Proses...' : 'Simpan'}</button>
                        <Link href="/dashboard/master/user" className="text-white bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                            Kembali
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );

};
