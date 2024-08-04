import { ReactNode } from "react";

const CategoryTag: React.FC<{children?: ReactNode, className?: string}> = ({children, className}) => {
    return (
        <span className={`category-tag ${className}`}>
            {children}
        </span>
    );
};

export default CategoryTag;