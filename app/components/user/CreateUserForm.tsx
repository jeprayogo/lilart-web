'use client';

import React, { useState } from "react";
import Alert from "../Alert";
import { useRouter } from 'next/navigation';
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import Link from "next/link";

export default function CreateUserForm() {
    const [formData, setFormData] = useState({
        UserID: '',
        NamaDepan: '',
        NamaBelakang: '',
        Password: '',
        KonfirmasiPassword: '',
        Email: '',
        NoHP: '',
        bAktif: true,
    });

    const [errors, setErrors] = useState({
        UserID: '',
        NamaDepan: '',
        NamaBelakang: '',
        Password: '',
        KonfirmasiPassword: '',
        Email: '',
        NoHP: '',
    });

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<{ message: string; type: 'info' | 'error' | 'success' | 'warning' | undefined }>({ message: '', type: undefined });
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        const userIdValue = name === 'UserID' ? value.replace(/\s+/g, '') : value;

        const nameMaxLength = 50;
        const nameValue = name === 'NamaDepan' && value.length > nameMaxLength || name === 'NamaBelakang' && value.length > nameMaxLength ? value.slice(0, nameMaxLength) : value;

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
            [name]: userIdValue,
            [name]: nameValue,
        });
    };

    // Validasi form
    const validateForm = () => {
        let formIsValid = true;
        let newErrors = {
            UserID: '',
            NamaDepan: '',
            NamaBelakang: '',
            Password: '',
            KonfirmasiPassword: '',
            Email: '',
            NoHP: '',
        };

        // Validasi Email
        if (!formData.Email) {
            newErrors.Email = 'Email harus diisi';
            formIsValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.Email)) {
            newErrors.Email = 'Email tidak valid';
            formIsValid = false;
        }

        // Validasi Password
        if (!formData.Password) {
            formIsValid = false;
            newErrors.Password = "Password harus diisi.";
        } else if (formData.Password.length < 6) {
            formIsValid = false;
            newErrors.Password = "Password harus memiliki setidaknya 6 karakter.";
        }

        // Validasi Konfirmasi Password
        if (formData.Password !== formData.KonfirmasiPassword) {
            formIsValid = false;
            newErrors.KonfirmasiPassword = "Passwords tidak cocok.";
        }

        // Validasi nomor HP
        if (!formData.NoHP) {
            formIsValid = false;
            newErrors.NoHP = "Nomor HP harus diisi.";
        } else if (!/^\d+$/.test(formData.NoHP)) {
            formIsValid = false;
            newErrors.NoHP = "Nomor HP harus berupa angka.";
        }

        if (!formData.NamaDepan) {
            formIsValid = false;
            newErrors.NamaDepan = "Nama depan harus diisi.";
        }
        if (!formData.NamaBelakang) {
            formIsValid = false;
            newErrors.NamaBelakang = "Nama belakang harus diisi.";
        }

        setErrors(newErrors);
        return formIsValid;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            setLoading(true);
            try {
                const res = await fetch('/api/users/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const data = await res.json();

                if (res.ok) {

                    setFormData({
                        UserID: '',
                        NamaDepan: '',
                        NamaBelakang: '',
                        Password: '',
                        KonfirmasiPassword: '',
                        Email: '',
                        NoHP: '',
                        bAktif: true,
                    });

                    if (data.redirectUrl) {
                        router.push(data.redirectUrl);
                        setTimeout(() => {
                            router.refresh();
                        }, 500);
                    }
                } else {
                    setAlert({ message: `Error: ${data.error}`, type: "error" });
                }

            } catch (error) {
                setAlert({ message: "Terjadi kesalahan menambahkan user", type: "error" });
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            {alert.message && <Alert message={alert.message} type={alert.type} />}
            <div className="mb-5">
                <label htmlFor="UserID" className="block mb-2 text-sm font-medium text-gray-900">User ID</label>
                <input
                    type="text"
                    name="UserID"
                    placeholder="Masukan User ID"
                    value={formData.UserID}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                {errors.UserID && <p className="mt-2 text-sm text-red-600">{errors.UserID}</p>}
            </div>
            <div className="mb-5">
                <label htmlFor="Email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                <input
                    type="email"
                    name="Email"
                    placeholder="contoh@email.com"
                    value={formData.Email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                {errors.Email && <p className="mt-2 text-sm text-red-600">{errors.Email}</p>}
            </div>
            <div className="mb-5 relative">
                <label htmlFor="Password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    name="Password"
                    value={formData.Password}
                    placeholder="Password minimal 6 karakter"
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                <button
                    type='button'
                    onClick={togglePasswordVisibility}
                    className='absolute right-2 top-1/2'
                >{showPassword ? <BiSolidHide size={24} fill='#9333ea' /> : <BiSolidShow size={24} fill='#9333ea' />}</button>
                {errors.Password && <p className="mt-2 text-sm text-red-600">{errors.Password}</p>}
            </div>
            <div className="mb-5 relative">
                <label htmlFor="KonfirmasiPassword" className="block mb-2 text-sm font-medium text-gray-900">Ulangi Password</label>
                <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="KonfirmasiPassword"
                    value={formData.KonfirmasiPassword}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                <button
                    type='button'
                    onClick={toggleConfirmPasswordVisibility}
                    className='absolute right-2 top-1/2'
                >{showConfirmPassword ? <BiSolidHide size={24} fill='#9333ea' /> : <BiSolidShow size={24} fill='#9333ea' />}</button>
                {errors.KonfirmasiPassword && <p className="mt-2 text-sm text-red-600">{errors.KonfirmasiPassword}</p>}
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="NamaDepan" className="block mb-2 text-sm font-medium text-gray-900">Nama Depan</label>
                    <input
                        type="text"
                        name="NamaDepan"
                        value={formData.NamaDepan}
                        onChange={handleChange}
                        placeholder="John"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                    {errors.NamaDepan && <p className="mt-2 text-sm text-red-600">{errors.NamaDepan}</p>}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="NamaBelakang" className="block mb-2 text-sm font-medium text-gray-900">Nama Belakang</label>
                    <input
                        type="text"
                        name="NamaBelakang"
                        value={formData.NamaBelakang}
                        placeholder="Doe"
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                    {errors.NamaBelakang && <p className="mt-2 text-sm text-red-600">{errors.NamaBelakang}</p>}
                </div>
            </div>
            <div className="mb-5">
                <label htmlFor="NoHP" className="block mb-2 text-sm font-medium text-gray-900">Nomor HP</label>
                <input
                    type="text"
                    name="NoHP"
                    placeholder="081200000000"
                    value={formData.NoHP}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                {errors.NoHP && <p className="mt-2 text-sm text-red-600">{errors.NoHP}</p>}
            </div>
            <div className="flex items-center mb-5">
                <input
                    type="checkbox"
                    id="checkbox"
                    name="bAktif"
                    checked={formData.bAktif}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="bAktif" className="ms-2 text-sm font-medium text-gray-900">Aktif</label>
            </div>
            <button type="submit" className={`text-white bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 mr-2 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${loading ? 'opacity-50' : ''}`} disabled={loading}>{loading ? (
                <>
                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" /> Proses
                    </svg>
                </>
            ) : 'Simpan'}</button>
            <Link href="/dashboard/master/user" className="text-white bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                Kembali
            </Link>
        </form>
    );
};