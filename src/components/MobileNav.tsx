"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import LogOutButton from "./LogOutButton";

type MobileNavLink = {
    label: string;
    href: string;
};

type MobileNavProps = {
    links: MobileNavLink[];
    user: { name: string; } | null;
};

const MobileNav = ({ links, user }: MobileNavProps) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="md:hidden">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className="p-2 text-white"
            >
                {open ? <X size={24} /> : <Menu size={24} />}
            </button>

            {open && (
                <div className="absolute left-0 top-16 w-full border-b border-border bg-blue-600 px-4 pb-4 shadow-lg">
                    {user && (
                        <ul className="flex flex-col gap-1 pt-2">
                            {links.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        onClick={() => setOpen(false)}
                                        className="block rounded-lg px-3 py-2 text-md font-medium text-white transition-colors hover:bg-white hover:text-blue-600"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="mt-3 flex flex-col gap-3 border-t border-white/20 pt-3 text-white">
                        {user ? (
                            <>
                                <p>Welcome, {user.name}</p>
                                <LogOutButton />
                            </>
                        ) : (
                            <Link
                                href="/login"
                                onClick={() => setOpen(false)}
                                className="button"
                            >
                                LogIn
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MobileNav;
