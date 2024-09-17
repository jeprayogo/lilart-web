'use client';

import Link from "next/link";
import { useState } from "react";
import { BiSolidDashboard, BiSolidServer } from "react-icons/bi";


export default function DashboardSidebar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleButton = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-purple-700 border-r border-gray-200 sm:translate-x-0 mt-5" aria-label="Sidebar">
            <div className="h-full px-3 pb-4 overflow-y-auto bg-purple-700">
                <ul className="space-y-2 font-medium">
                    <li>
                        <Link href="#" className="flex items-center p-2 text-white rounded-lg  hover:bg-white hover:text-purple-900 group">
                            <BiSolidDashboard size={24} className="text-white" />
                            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-white hover:text-purple-900">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <button type="button" onClick={toggleButton} className="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group hover:bg-white hover:text-purple-900 dark:text-white" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                            <BiSolidServer size={24} className="text-white" />
                            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-white hover:text-purple-900">Master</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isDropdownOpen ? 'block' : 'hidden'}`}>
                            <ul id="dropdown-example" className={`py-2 space-y-2`}>
                                <li>
                                    <Link href="#" className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group hover:bg-white hover:text-purple-700 dark:text-white dark:hover:bg-gray-700">User</Link>
                                </li>
                                <li>
                                    <Link href="#" className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group hover:bg-white hover:text-purple-700 dark:text-white dark:hover:bg-gray-700">Portfolio</Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </aside>
    );
};
