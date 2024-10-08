import { ReactNode } from "react";

export const FloatPanel: React.FC<{children?: ReactNode}> = ({children}) => {
    return (
        <aside className="relative top-0 flex-shrink-0 w-full lg:max-w-[270px] lg:mx-16">
            <div className="sticky top-28">
                {children} 
            </div> 
        </aside>
    );
};