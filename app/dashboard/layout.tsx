"use client";
import Image from "next/image";
import React, { ReactNode } from "react";
import DashboardNavbar from "./components/DashboardNavbar";
import DashboardSidebar from "./components/DashboardSidebar";
// import logo from '../assets/logo.svg'

interface DashboardLayoutProps {
    children: ReactNode;
    email: string;
}

export default function DashboardLayout({ children, email }: DashboardLayoutProps) {
    return (
        <>
            <DashboardNavbar />
            <DashboardSidebar />
            <div className="p-4 sm:ml-64">
                {children}
            </div>
        </>

    );
}