'use client';

import { Dropdown } from "../common";
import { ArticleIcon, BookmarkIcon, HandWaveIcon, SignOutIcon, UserIcon } from "../icons";
import Link from 'next/link';
import { useAuth } from "@/hooks";
import "./AccountDropdown.css";

export const AccountDropdown:React.FC = () => {
    const { user, logout } = useAuth();

    const logout_user = () => {
        logout();
    }

    const AuthMenu = () => <>
        <div className="border-b border-light-gray w-full mb-2 p-2 text-wrap flex items-center gap-1 font-light">
            <p>Hello, <strong>{user && user.displayName}</strong></p> 
            <HandWaveIcon />
        </div>
        <Link href={'#'} className="account-dropdown-item">
            <UserIcon />
            Profile
        </Link>
        <Link href={'/me/articles'} className="account-dropdown-item">
            <ArticleIcon />
            Articles
        </Link>
        <Link href={'/me/bookmarks'} className="account-dropdown-item">
            <BookmarkIcon />
            Bookmarks
        </Link>
        <Link href={'/me/settings'} className="account-dropdown-item">
            Settings
        </Link>
        <button className="account-dropdown-item text-red-400 cursor-pointer" onClick={logout_user}>
            <SignOutIcon />
            Sign out
        </button>
    </>;
    
    return (
        <>
            <Dropdown.Wrapper>
                <Dropdown.Trigger key={"account-dropdown-trigger"}>
                    <UserIcon size={28} className="hidden lg:inline-block" />
                </Dropdown.Trigger>
                <Dropdown.Items key={"account-dropdown-items"} anchor="right"  className="w-[280px] font-normal">
                    {
                        user ? <AuthMenu/> : <Link href={'/authenticate'}>Sign in</Link> 
                    }
                </Dropdown.Items>
            </Dropdown.Wrapper>
        </>
    );
};