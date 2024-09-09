import { ReactNode } from "react";

const SidePanel: React.FC<{children?: ReactNode}> = ({children}) => {
    return (
        <aside className="relative top-0 flex-shrink-0 w-full lg:max-w-[270px] lg:mx-16">
            {children}  
        </aside>
    );
};

export default SidePanel;