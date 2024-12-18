"use client";

import { cloneElement, Dispatch, ReactElement, SetStateAction, useEffect, useRef, useState } from "react";

const DropdownWrapper:React.FC<{
    children: ReactElement | ReactElement[],
    className?: string
}> = ({children, className}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdown = useRef<HTMLDivElement>(null);

    const injectProps = (element: ReactElement) => {
        if(element.type === DropdownTrigger || element.type === DropdownItems) {
            return cloneElement(element, {isOpen, setIsOpen});
        }
        return element;
    };

    useEffect(() => {
        if(!isOpen) return;

        /**
         * Hide the dropdown when clicking outside of it
         * @param event 
         */
        const hideOnBlur = (event: MouseEvent) => {
            if(dropdown.current && event.target instanceof Node && !dropdown.current.contains(event.target))
                setIsOpen(false);
        };
        window.addEventListener('click', hideOnBlur);
        return () => {
            window.removeEventListener('click', hideOnBlur);
        };
    }, [isOpen])

    return (
        <div ref={dropdown} className={`relative ${className}`}>
            {
                (Array.isArray(children))
                ? children.map(child => injectProps(child))
                : injectProps(children)
            }
        </div>
    );
};

const DropdownTrigger:React.FC<{
    children: ReactElement | ReactElement[], 
    isOpen?: boolean, 
    setIsOpen?: Dispatch<SetStateAction<boolean>>,
    className?: string
}> = ({children, isOpen, setIsOpen, className}) => {
    return (
        <span onClick={() => {setIsOpen && setIsOpen(!isOpen)}} 
            className={`cursor-pointer ${className}`}>
            {children}
        </span>
    );
};

const DropdownItems:React.FC<{
    key?: string
    children: ReactElement | ReactElement[],
    isOpen?: boolean, 
    setIsOpen?: Dispatch<SetStateAction<boolean>>,
    anchor?: "right" | "left",
    className?: string
}> = ({key, children, isOpen, setIsOpen, anchor = "left", className}) => {
    let anchorClasses = "";
    if (anchor === "right") anchorClasses = "right-0";
    else if (anchor === "left") anchorClasses = "left-0";
    return (
        isOpen && <div className={`absolute flex flex-col top-full ${anchorClasses} bg-light text-nowrap border border-light-gray shadow-sm shadow-black/20 p-1 text-black z-20 ${className}`}>
            {children}
        </div>
    );
};

export const Dropdown = {
    Wrapper: DropdownWrapper,
    Trigger: DropdownTrigger,
    Items: DropdownItems
};