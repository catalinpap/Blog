import './Header.css';
import Link from "next/link";
import { ArrowDownIcon, MenuIcon, SearchIcon, UserIcon, WriteIcon } from "../icons";
import { AccountDropdown } from '../';

export const Header = () => {
    return (
        <header className="bg-light sticky flex justify-between items-center flex-row mx-4 w-full lg:mx-auto lg:min-w-[960px] px-8 py-2 rounded-b top-0 z-50 border-b border-light-gray">
            <nav className="flex items-center h-full gap-x-4">
                <MenuIcon size={28} className="cursor-pointer lg:hidden"/>
                <Link href={'/'} className="navbar-logo">LOGO</Link>
                <span className="navbar-link items-center gap-x-1 hidden lg:flex">
                    Categories
                    <ArrowDownIcon size={16} />
                </span>
                <span className="navbar-link hidden lg:inline-block">Discover</span>
                <span className="navbar-link hidden lg:inline-block">Daily Ideas</span>
            </nav>
            
            <div className="flex items-center h-full gap-x-3">
                <SearchIcon size={28} />
                <AccountDropdown />
                <Link href={"/write"} className="navbar-button flex items-center gap-x-2 capitalize">
                    <WriteIcon size={20} />
                    write
                </Link>
            </div>
        </header>
    );
};