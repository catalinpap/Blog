import { ReactNode } from "react";
import "./CategoryTag.css";
import Link from "next/link";

export const CategoryTag: React.FC<{
    href: string,
    children?: ReactNode,
    className?: string}> = ({children, className, href}) => {
    return (
        <Link href={`/topic/${href}`} className={`category-tag ${className}`}>
            {children}
        </Link>
    );
};