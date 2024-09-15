"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        namaDepan: "",
        namaBelakang: "",
        noHP: "",
    });
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Password anda tidak sama");
            return;
        }

        const res = await fetch("api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            router.push("/auth/signin");
        } else {
            const { message } = await res.json();
            setError(message || "Terjadi kesalahan saat mendaftar");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="namaDepan">Nama Depan</label>
                    <input type="text" id="namaDepan" name="namaDepan" value={formData.namaDepan} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="namaBelakang">Nama Belakang</label>
                    <input type="text" id="namaBelakang" name="namaBelakang" value={formData.namaBelakang} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="noHP">Nama Depan</label>
                    <input type="text" id="noHP" name="noHP" value={formData.noHP} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Register</button>
            </form>
        </div>
    );

}