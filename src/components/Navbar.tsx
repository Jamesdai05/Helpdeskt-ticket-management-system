"use client"

import Link from 'next/link';
import logo from "../../public/logo.jpg";
import Image from "next/image";
import { useRouter } from 'next/navigation';

const Navbar = () => {

    const links = [
        { label: "tickets", href: "/tickets" },
        { label: "my tickets", href: "/tickets/mine" },
        { label: "New ticket", href: "/tickets/new" },
    ];

    const router = useRouter();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-blue-600 backdrop-blur-sm">
            <nav className="mx-auto h-16 max-w-12xl flex justify-between items-center gap-4 px-4 sm:px-6">
                <Link
                    href="/"
                    className="flex items-center gap-2 font-semibold text-white"
                >
                    <Image
                        src={logo}
                        alt="QuickTicket logo"
                        width={40}
                        height={40}
                        priority
                        className="size-10 rounded-md"
                    />
                    <span className='text-xl tracking-tight'>QuickTicket</span>
                </Link>
                <ul className="hidden items-center gap-1 md:flex">
                    {links.map(link => (
                        <li key={link.label}>
                            <Link className='rounded-lg px-3 py-2 text-md font-lg text-white transition-colors hover:bg-muted hover:text-blue-600 hover:bg-white' href={link.href}>{link.label}</Link>
                        </li>
                    )
                    )}
                </ul>
                <div className='hidden items-center gap-3 text-white md:flex'>
                    <Link href="/login" className='button'>LogIn</Link>
                    <Link href="/signup" className='primary'>SignUp</Link>
                </div>
            </nav>
        </header>
    );
};
export default Navbar;