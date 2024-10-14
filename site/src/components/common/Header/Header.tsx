import { ReactNode } from "react";

export const Header: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <header className="bg-light sticky flex justify-between items-center flex-row mx-4 w-full lg:mx-auto lg:min-w-[960px] px-8 py-2 rounded-b top-0 z-50 border-b border-light-gray">
            {children}
        </header>
    );
};