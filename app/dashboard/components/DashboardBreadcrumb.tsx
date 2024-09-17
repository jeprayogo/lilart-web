"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronRight } from "react-icons/fa";

export default function DashboardBreadcrumb() {

    const pathname = usePathname();
    const pathSegments = pathname.split("/").filter(Boolean);

    const pathSlice = pathSegments.slice(1, 3);

    return (
        <div className="flex px-3 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-200" aria-label="Breadcrumb">
            {pathname == '/dashboard' ? <ol className="inline-flex items-center space-x-1 md:space-x-2">
                <li className="flex items-center">
                    <p className="ms-1 text-base font-medium text-gray-700 capitalize">{pathSegments[0]}</p>
                </li>
            </ol>
                :
                <ol className="inline-flex items-center space-x-1 md:space-x-2">
                    <li className="flex items-center">
                        <p className="ms-1 text-base font-medium text-gray-700 capitalize">{pathSlice[0]}</p>

                    </li>
                    <FaChevronRight className="block w-3 h-3 mx-1 text-gray-400" size={24} />
                    <li className="flex items-center">
                        <p className="ms-1 text-base font-medium text-gray-700 capitalize">{pathSlice[1]}</p>
                    </li>
                </ol>
            }
        </div>
    );
};
