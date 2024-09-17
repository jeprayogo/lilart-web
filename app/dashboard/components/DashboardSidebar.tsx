'use client';

import Link from "next/link";
import Image from 'next/image'
import { useState } from "react";
import logo from '../../assets/logo.svg';
import { IconContext } from "react-icons";
import { BiSolidDashboard, BiSolidServer, BiPlus, BiMinus, BiChevronRightCircle, BiChevronLeftCircle } from "react-icons/bi";


export default function DashboardSidebar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const iconStyle = { color: "#ffffff", fontSize: "24px", hover: { color: "#581c87" } };

    return (
        <>
            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-56 h-screen pt-5 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 shadow-lg" aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white drop-shadow-xl">
                    <Link href="/dashboard" className="flex items-center ps-2.5 mb-5">
                        <Image src={logo} width={50} height={50} alt="logo" priority />
                    </Link>
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link href="/dashboard" className="flex items-center p-2 text-gray-800 rounded-lg   hover:text-gray-600 group">
                                <BiSolidDashboard style={iconStyle} />
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-gray-800 hover:text-gray-600">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <button type="button" onClick={toggleDropdown} className="flex items-center w-full p-2 text-base text-gray-800 transition ease-in-out delay-150 rounded-lg group hover:text-gray-600" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                <div className="flex  items-center w-full text-white hover:text-purple-900">
                                    <BiSolidServer style={iconStyle} />
                                    <p className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-gray-800 hover:text-gray-600">Master</p>
                                    {isDropdownOpen ? <BiMinus style={iconStyle} /> : <BiPlus style={iconStyle} />}
                                </div>
                            </button>
                            <div className={`transition ease-in-out delay-150 overflow-hidden ${isDropdownOpen ? 'block' : 'hidden'}`}>
                                <ul id="dropdown-example" className={`py-2 space-y-2`}>
                                    <li>
                                        <Link href="/dashboard/master/user" className="flex items-center w-full p-2 text-gray-800 transition duration-75 rounded-lg pl-11 group  hover:text-gray-600">User</Link>
                                    </li>
                                    <li>
                                        <Link href="/dashboard/master/portfolio" className="flex items-center w-full p-2 text-gray-800 transition duration-75 rounded-lg pl-11 group  hover:text-gray-600">Portfolio</Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="flex items-center w-full p-2 text-gray-800 transition duration-75 rounded-lg pl-11 group  hover:text-gray-600 ">Technology</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </aside >
        </>
    );
};
