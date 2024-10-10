'use client';

import { Dropdown } from "../common";
import { UserIcon } from "../icons";

export const AccountDropdown:React.FC = () => {
    return (
        <>
            <Dropdown.Wrapper>
                <Dropdown.Trigger>
                    <UserIcon size={28} className="hidden lg:inline-block" />
                </Dropdown.Trigger>
                <Dropdown.Items className="w-[240px]">
                    <p className="border-b border-light-gray w-full mb-2 p-2">Hello, Reader!</p>
                    <p className="p-2 cursor-pointer hover:font-medium">My profile</p>
                    <p className="p-2 text-red-400  cursor-pointer hover:font-medium">Sign out</p>
                </Dropdown.Items>
            </Dropdown.Wrapper>
        </>
    );
};