"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import { FaChevronDown, FaUser, FaRightFromBracket } from "react-icons/fa6";

export default function SidebarUserDropdown({ name }: { name: string }) {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div>
            <button onClick={toggleDropdown} className="flex items-center w-full font-medium rounded-md border px-4 py-2 " type="button">
                <FaUser className="me-2 fill-purple-600" />
                <p className="flex-1 ms-3 text-left whitespace-nowrap text-sm text-purple-600 hover:text-gray-600">{name}</p>
                <FaChevronDown className="fill" size={10} />
            </button>
            <div className={`z-10 bg-white divide-y divide-gray-100 w-full rounded-lg ${isDropdownOpen ? 'block' : 'hidden'}`}>
                <ul className="py-2">
                    <li>
                        <button
                            className="flex items-center px-2 py-1 w-full rounded-md hover:bg-gray-100"
                            onClick={() => signOut({ callbackUrl: "/" })}
                        >
                            <FaRightFromBracket />
                            <p className="flex-1 ms-3 text-left text-sm whitespace-nowrap text-gray-600"> Logout</p>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};
