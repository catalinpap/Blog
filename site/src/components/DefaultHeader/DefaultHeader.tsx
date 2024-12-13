import './Header.css';
import Link from "next/link";
import { ArrowDownIcon, MenuIcon, WriteIcon } from "../icons";
import { AccountDropdown, Search } from '..';
import { Header } from '../common';

export const DefaultHeader = () => {
    return (
        <Header>
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
                <Search />
                <AccountDropdown />
                <Link href={"/write"} className="button-primary flex items-center gap-x-2 capitalize">
                    <WriteIcon size={20} />
                    write
                </Link>
            </div>
        </Header>
    );
};