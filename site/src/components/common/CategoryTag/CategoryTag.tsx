'use client';

import { MouseEvent, ReactNode, useCallback } from "react";
import "./CategoryTag.css";
import { useRouter } from "next/navigation";

export const CategoryTag: React.FC<{
    href: string,
    children?: ReactNode,
    className?: string}> = ({children, className, href}) => {
        const router = useRouter();

        const navigate = useCallback((href: string, event: MouseEvent) => {
            event.stopPropagation();
            router.push(`/topic/${href}`);
        }, [router]);

        return (
            <button onClick={(e) => navigate(href, e)} className={`category-tag ${className}`}>
                {children}
            </button>
        );
};