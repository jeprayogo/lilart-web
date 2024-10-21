'use client';


import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Alert from "@/app/components/Alert";
import Swal from "sweetalert2";
import Link from "next/link";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { decrypt } from "@/app/lib/util";

export default function ChangePasswordForm({ params }: { params: { id: string } }) {
    const { data: session } = useSession();

    const [passData, setPassData] = useState({
        Password: "",
        KonfirmasiPassword: "",
    });

    const [errors, setErrors] = useState({
        Password: "",
        KonfirmasiPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [alert, setAlert] = useState<{ message: string; type: 'info' | 'error' | 'success' | 'warning' | undefined }>({ message: '', type: undefined });
    const router = useRouter();

    const decryptedId = decrypt(decodeURIComponent(params.id));

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setPassData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const validateForm = () => {
        let formIsValid = true;
        let newErrors = {
            Password: "",
            KonfirmasiPassword: "",
        };

        if (!passData.Password) {
            formIsValid = false;
            newErrors.Password = "Password harus diisi.";
        } else if (passData.Password.length < 6) {
            formIsValid = false;
            newErrors.Password = "Password harus memiliki setidaknya 6 karakter.";
        }

        // Validasi Konfirmasi Password
        if (passData.Password !== passData.KonfirmasiPassword) {
            formIsValid = false;
            newErrors.KonfirmasiPassword = "Passwords tidak cocok.";
        }

        setErrors(newErrors);
        return formIsValid;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {
            setLoading(true);
            try {
                const response = await fetch(`/api/users/${decryptedId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(passData),
                });

                if (response.ok) {
                    if (decryptedId === session?.id) {
                        signOut({ callbackUrl: "/" });
                        Swal.fire({
                            title: 'Success',
                            text: 'Password berhasil diubah, Silahkan login kembali',
                            icon: 'success',
                            confirmButtonText: 'OK',
                        });
                    } else {
                        router.push('/dashboard/master/user');
                        Swal.fire({
                            title: 'Success',
                            text: 'Password berhasil diubah',
                            icon: 'success',
                            confirmButtonText: 'OK',
                        });
                    }
                }
            } catch (error) {
                setAlert({ message: "Terjadi kesalahan menambahkan user", type: "error" });
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            {alert.message && <Alert message={alert.message} type={alert.type} />}
            <div className="mb-5 relative">
                <label htmlFor="Password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    name="Password"
                    value={passData.Password}
                    onChange={handleInputChange}
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
                    value={passData.KonfirmasiPassword}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                <button
                    type='button'
                    onClick={toggleConfirmPasswordVisibility}
                    className='absolute right-2 top-1/2'
                >{showConfirmPassword ? <BiSolidHide size={24} fill='#9333ea' /> : <BiSolidShow size={24} fill='#9333ea' />}</button>
                {errors.KonfirmasiPassword && <p className="mt-2 text-sm text-red-600">{errors.KonfirmasiPassword}</p>}
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
