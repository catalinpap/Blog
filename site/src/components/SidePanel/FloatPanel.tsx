import { ReactNode } from "react";

export const FloatPanel: React.FC<{children?: ReactNode}> = ({children}) => {
    return (
        <aside className="relative top-0 flex-shrink-0 w-full 2xl:max-w-[270px] 2xl:mx-8">
            <div className="sticky top-28">
                {children} 
            </div> 
        </aside>
    );
};