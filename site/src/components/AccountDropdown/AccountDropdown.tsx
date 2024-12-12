'use client';

import { Dropdown } from "../common";
import { UserIcon } from "../icons";
import Link from 'next/link';
import { useAuth } from "@/hooks";

export const AccountDropdown:React.FC = () => {
    const { user, logout } = useAuth();

    const logout_user = () => {
        logout();
    }

    const AuthMenu = () => <>
        <p className="border-b border-light-gray w-full mb-2 p-2 text-wrap">Hello, {user && user.displayName}</p>
        <p className="p-2 cursor-pointer hover:font-medium">Profile</p>
        <Link href={'/me/articles'} className="p-2 cursor-pointer hover:font-medium">Articles</Link>
        <Link href={'/me/bookmarks'} className="p-2 cursor-pointer hover:font-medium">Bookmarks</Link>
        <p className="p-2 text-red-400  cursor-pointer hover:font-medium" onClick={logout_user}>Sign out</p>
    </>;
    
    return (
        <>
            <Dropdown.Wrapper>
                <Dropdown.Trigger key={"account-dropdown-trigger"}>
                    <UserIcon size={28} className="hidden lg:inline-block" />
                </Dropdown.Trigger>
                <Dropdown.Items key={"account-dropdown-items"} className="w-[280px] font-normal">
                    {
                        user ? <AuthMenu/> : <Link href={'/authenticate'}>Sign in</Link> 
                    }
                </Dropdown.Items>
            </Dropdown.Wrapper>
        </>
    );
};