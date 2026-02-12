"use client";

interface PageHeaderProps {
    title: string;
}

export default function PageHeader({ title }: PageHeaderProps) {

    return (
        <div className="mb-6">
            <h1 className="text-3xl font-semibold text-stone-800">{title}</h1>
        </div>
    );
}
