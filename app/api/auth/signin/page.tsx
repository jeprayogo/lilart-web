"use client";

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function SignIn() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });
        if (result?.error) {
            setError(result.error);
        } else {
            router.push("/dashboard");
        }
    };

    return (
        <div className='container'>
            <h1 className='text-gray-900 font-bold text-center mb-5 text-xl'>Sign In</h1>
            <form onSubmit={handleSubmit} className='max-w-sm mx-auto'>
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
                <div className='mb-5'>
                    <label htmlFor="password" className='block mb-2 text-sm font-medium text-gray-900'>Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                    />
                </div>
                {error && <p className='text-red-500'>{error}</p>}
                <button type="submit" className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Submit</button>
            </form>
        </div>
    );
}