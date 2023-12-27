"use client";

import React, { FC } from 'react';
import Link from "next/link"
import { Menu } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type NavigationLink = {
    title: string;
    path: string;
};

type NavigationLinksArray = NavigationLink[];

interface NavbarProps {
    title: string;
    avatarUrl: string;
    menus: NavigationLinksArray;
    isLoggedIn: boolean;
}



const Navbar: FC<NavbarProps> = ({ title, avatarUrl, menus, isLoggedIn }) => {
    const [state, setState] = React.useState(false)

    return (
        <nav className="bg-white w-full border-b md:border-0">
            <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    <Link href="/">
                        <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
                    </Link>
                    <div className="md:hidden">
                        <button
                            className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                            onClick={() => setState(!state)}
                        >
                            <Avatar>
                                {isLoggedIn ? <AvatarImage src={avatarUrl} /> : ""}
                                <AvatarFallback>{isLoggedIn ? <Menu></Menu> : "..."}</AvatarFallback>
                            </Avatar>
                        </button>
                    </div>
                </div>
                <div
                    className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? "block" : "hidden"
                        }`}
                >
                    <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                        {menus.map((item, idx) => (
                            <li key={idx} className="text-slate-600 hover:text-red-600">
                                <Link href={item.path}>{item.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;