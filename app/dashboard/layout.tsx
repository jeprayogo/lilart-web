"use client";

import React, { ReactNode } from "react";
import DashboardSidebar from "./components/DashboardSidebar";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
// import logo from '../assets/logo.svg'

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps, session: Session) {
    return (
        <>
            <SessionProvider session={session}>
                <DashboardSidebar />
                <div className="p-4 sm:ml-56">
                    {children}
                </div>
            </SessionProvider>
        </>

    );
}