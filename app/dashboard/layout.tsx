import React, { ReactNode } from "react";
import DashboardSidebar from "./components/DashboardSidebar";
// import logo from '../assets/logo.svg'

interface DashboardLayoutProps {
    children: ReactNode;
    email: string;
}

export default function DashboardLayout({ children, email }: DashboardLayoutProps) {
    return (
        <>
            <DashboardSidebar />
            <div className="p-4 sm:ml-56">
                {children}
            </div>
        </>

    );
}