"use client";
import Image from "next/image";
import Link from "next/link";
import logo from '../assets/logo.svg'
import { useState } from "react";

export default function Navbar() {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleButton = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/dashboard">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
                        <Image src={logo} alt="Logo" width={50} height={50} />
                    </div>
                </Link>
                <div className="w-full md:block md:w-auto">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 text-left">
                        <li></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
