import { ReactNode } from "react";
import "./CategoryTag.css";

export const CategoryTag: React.FC<{children?: ReactNode, className?: string}> = ({children, className}) => {
    return (
        <span className={`category-tag ${className}`}>
            {children}
        </span>
    );
};