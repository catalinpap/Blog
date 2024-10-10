'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { Dropdown } from "../common";
import { UserIcon } from "../icons";
import { auth } from "@/utils/auth";
import Link from 'next/link';

export const AccountDropdown:React.FC = () => {
    const [user, setUser] = useState<any>(null); // TODO: implement 'User' type

    const getUser = async () => {
        const user = await auth.user();
        setUser(user);
    }

    useEffect(() => {
        (async () => {
            await getUser();
        })();
    }, []);

    const router = useRouter();
    const logout = () => {
        auth.logout();
        router.refresh();
    }

    const AuthMenu = () => <>
        <p className="border-b border-light-gray w-full mb-2 p-2">Hello, {user && user.username}</p>
        <p className="p-2 cursor-pointer hover:font-medium">Profile</p>
        <p className="p-2 text-red-400  cursor-pointer hover:font-medium" onClick={logout}>Sign out</p>
    </>;
    
    return (
        <>
            <Dropdown.Wrapper>
                <Dropdown.Trigger key={"account-dropdown-trigger"}>
                    <UserIcon size={28} className="hidden lg:inline-block" />
                </Dropdown.Trigger>
                <Dropdown.Items key={"account-dropdown-items"} className="w-[240px] font-normal">
                    {
                        user ? <AuthMenu/> : <Link href={'/authenticate'}>Sign in</Link> 
                    }
                </Dropdown.Items>
            </Dropdown.Wrapper>
        </>
    );
};