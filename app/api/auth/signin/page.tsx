"use client";

import Alert from '@/app/components/Alert';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { BiSolidShow, BiSolidHide } from "react-icons/bi";

export default function SignIn() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        setLoading(false);

        if (result?.error) {
            setError(result.error);
        } else {
            router.push("/dashboard");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <div className='my-10 top-1 fixed'>
                {error && <Alert message={error} type='error' />}
            </div>
            <h1 className='text-gray-900 font-bold text-center mb-5 text-xl'>Sign In</h1>
            <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
                <div className='mb-5'>
                    <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900'>Email</label>
                    <input
                        type="email"
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                    />
                </div>
                <div className='mb-5 relative'>
                    <label htmlFor="password" className='block mb-2 text-sm font-medium text-gray-900'>Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                    />
                    <button
                        type='button'
                        onClick={togglePasswordVisibility}
                        className='absolute right-2 top-1/2'
                    >{showPassword ? <BiSolidHide size={24} fill='#9333ea' /> : <BiSolidShow size={24} fill='#9333ea' />}</button>
                </div>

                <button type="submit" disabled={loading} className={`text-white bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${loading ? 'opacity-50' : ''}`}>{loading ? 'Please Wait' : 'Masuk'}</button>
            </form>
        </div>
    );
}