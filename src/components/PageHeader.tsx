"use client";

import { useCallback } from "react";
import { FaBars } from "react-icons/fa";

interface PageHeaderProps {
    title: string;
}

export default function PageHeader({ title }: PageHeaderProps) {
    const toggleMobileSidebar = useCallback(() => {
        try {
            window.dispatchEvent(new CustomEvent('toggleMobileSidebar'));
        } catch (e) {
            // noop
        }
    }, []);

    return (
        <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button
                    onClick={toggleMobileSidebar}
                    className="lg:hidden p-2 rounded-md hover:bg-stone-100"
                    aria-label="Abrir menu"
                >
                    <FaBars />
                </button>
                <h1 className="text-3xl font-semibold text-stone-800">{title}</h1>
            </div>
        </div>
    );
}
