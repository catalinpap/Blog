import { ReactNode } from "react";

const CategoryTag: React.FC<{children: ReactNode}> = ({children}) => {
    return (
        <span className="inline-block bg-orange-300 text-white text-xs font-light px-2 py-1 rounded-md cursor-pointer hover:brightness-105">{children}</span>
    );
};

export default CategoryTag;