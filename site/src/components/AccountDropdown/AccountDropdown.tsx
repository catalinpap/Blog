'use client';

import { useEffect, useState } from "react";
import { Dropdown } from "../common";
import { UserIcon } from "../icons";
import { auth } from "@/utils/auth";
import Link from 'next/link';
import { User } from "@/types";

export const AccountDropdown:React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    // TODO: implement user in Context API to trigger re-renders when user state is changing
    useEffect(() => {
        const getUser = async () => {
            const user = await auth.user();
            setUser(user);
        }

        getUser();
    }, []);


    const logout = () => {
        auth.logout();
        setUser(null);
    }

    const AuthMenu = () => <>
        <p className="border-b border-light-gray w-full mb-2 p-2 text-wrap">Hello, {user && user.username}</p>
        <p className="p-2 cursor-pointer hover:font-medium">Profile</p>
        <Link href={'/me/articles'} className="p-2 cursor-pointer hover:font-medium">Articles</Link>
        <p className="p-2 text-red-400  cursor-pointer hover:font-medium" onClick={logout}>Sign out</p>
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