'use client';

import React, { useState } from "react";
import Alert from "../Alert";
import { useRouter } from 'next/navigation';
import { BiSolidShow, BiSolidHide } from "react-icons/bi";

export default function CreateUserForm() {
    const [formData, setFormData] = useState({
        NamaDepan: '',
        NamaBelakang: '',
        Password: '',
        KonfirmasiPassword: '',
        Email: '',
        NoHP: '',
        bAktif: true,
    });

    const [errors, setErrors] = useState({
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
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // Validasi form
    const validateForm = () => {
        let formIsValid = true;
        let newErrors = {
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
                const res = await fetch('/api/user/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const data = await res.json();

                if (res.ok) {

                    setFormData({
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
            <button type="submit" className={`text-white bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${loading ? 'opacity-50' : ''}`} disabled={loading}>{loading ? 'Proses...' : 'Simpan'}</button>
        </form>
    );
};