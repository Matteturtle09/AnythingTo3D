import React, { FC } from 'react';

interface NavbarProps {
    title: string;
    avatarUrl: string;
    userName: string;
}

const Navbar: FC<NavbarProps> = ({ title, avatarUrl, userName }) => {
    return (
        <>
            <div className="navbar bg-base-100/30 backdrop-blur-lg ">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">{title}</a>
                </div>
                <div className="flex-none gap-2">
                    <div className="flex-1">
                        <a className="btn btn-ghost text-xl">{userName}</a>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src={avatarUrl} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;