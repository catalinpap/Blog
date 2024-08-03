import { ReactNode } from "react";

const SidePanel: React.FC<{children?: ReactNode}> = ({children}) => {
    return (
        <aside className="relative w-full max-w-[270px]">
            {children}  
        </aside>
    );
};

export default SidePanel;