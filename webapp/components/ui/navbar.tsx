"use client";
import React, { FC } from 'react';
import Link from 'next/link';
interface NavbarProps {
    title: string;
    avatarUrl: string;
    userName: string;
    isLoggedIn: boolean;
}


const Navbar: FC<NavbarProps> = ({ title, avatarUrl, userName, isLoggedIn }) => {
    return (
        <>
            <div className="navbar bg-base-100/30 backdrop-blur-sm top-0 sticky z-10 b-10 b-slate-800/10 ">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">{title}</a>
                </div>
                <div className="flex-none gap-2">
                    {isLoggedIn ?
                        <>
                            <div className="flex-1 invisible md:visible">
                                <a className="btn btn-ghost text-xl">{userName}</a>
                            </div>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="Tailwind CSS Navbar component" src={avatarUrl} />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100/30 backdrop-blur-sm rounded-box w-52">
                                    <li className='rounded-lg hover:text-white hover:bg-primary/30 hover:backdrop-blur-sm'><Link href={"/generate"} legacyBehavior><a>Generate</a></Link></li>
                                    <li className='rounded-lg hover:text-white hover:bg-primary/30 hover:backdrop-blur-sm'><a>Logout</a></li>
                                </ul>
                            </div>
                        </>
                        : <div className="flex-1 invisible md:visible">
                            <a className="btn btn-primary text-xl">Log In</a>
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

export default Navbar;