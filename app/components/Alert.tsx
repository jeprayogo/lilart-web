'use client';

import React, { useState } from "react";
import { BiX } from "react-icons/bi";

type AlertProps = {
    message: string;
    type?: 'info' | 'success' | 'warning' | 'error';
}

const Alert: React.FC<AlertProps> = ({ message, type = 'info' }: AlertProps) => {
    const [showAlert, setShowAlert] = useState(true);

    if (!showAlert) return null;

    const alertStyle: Record<typeof type, string> = {
        info: 'text-blue-800 bg-blue-50',
        success: 'bg-green-50 text-green-800',
        warning: 'bg-yellow-50 text-yellow-800',
        error: 'bg-red-50 text-red-800',
    }

    return (
        <div className={`${alertStyle[type]} flex items-center p-4 mb-4 rounded-lg shadow-md`} role="alert">
            <span className="sr-only">{type}</span>
            <div className="ms-3 text-sm font-medium">
                {message}
            </div>
            <button
                onClick={() => setShowAlert(false)}
                className="ms-auto -mx-1.5 -my-1.5 rounded-lg inline-flex items-center justify-center h-8 w-8"
            >
                <BiX />
            </button>
        </div>
    );

};
export default Alert;
