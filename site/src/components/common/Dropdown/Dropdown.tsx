"use client";

import { cloneElement, Dispatch, ReactElement, SetStateAction, useState } from "react";

const DropdownWrapper:React.FC<{
    children: ReactElement | ReactElement[],
    className?: string
}> = ({children, className}) => {
    const [isOpen, setIsOpen] = useState(false);

    const injectProps = (element: ReactElement) => {
        if(element.type === DropdownTrigger || element.type === DropdownItems) {
            return cloneElement(element, {isOpen, setIsOpen})
        }
        return element;
    };

    return (
        <div className={`relative ${className}`}>
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
    key: string
    children: ReactElement | ReactElement[],
    isOpen?: boolean, 
    setIsOpen?: Dispatch<SetStateAction<boolean>>,
    className?: string
}> = ({key, children, isOpen, setIsOpen, className}) => {
    return (
        isOpen && <div className={`absolute flex flex-col top-full right-0 bg-light text-nowrap border border-light-gray shadow-sm shadow-black/20 p-1 text-black z-20 ${className}`}>
            {children}
        </div>
    );
};

export const Dropdown = {
    Wrapper: DropdownWrapper,
    Trigger: DropdownTrigger,
    Items: DropdownItems
};