"use client"

import Link from 'next/link';
import { getCurrentUser } from "@/actions/currentUser";
import logo from "../../public/logo.jpg";
import Image from "next/image";
import LogOutButton from './LogOutButton';
import MobileNav from './MobileNav';
import { useAuth } from './AuthContextProvider';


const Navbar = () => {

    const links = [
        { label: "Tickets", href: "/tickets" },
        { label: "My Tickets", href: "/tickets/mine" },
        { label: "New Ticket", href: "/tickets/new" },
    ];

  const { user, isAuthenticated } = useAuth();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-blue-600 backdrop-blur-sm">
            <nav className="mx-auto h-16 max-w-7xl flex justify-between items-center gap-4 px-4 sm:px-6 relative">
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
                {user && (
                    <ul className="hidden items-center gap-1 md:flex">
                        {links.map(link => (
                            <li key={link.label}>
                                <Link className='rounded-lg px-3 py-2 text-md font-medium text-white transition-colors hover:bg-muted hover:text-blue-600 hover:bg-white' href={link.href}>{link.label}</Link>
                            </li>
                        )
                        )}
                    </ul>
                )}
                <div className='hidden items-center gap-2 text-white md:flex'>
                    {isAuthenticated ? (
                        <>
                            <p>Welcome,{user?.name}</p>
                            <LogOutButton />
                        </>
                    ) : (
                        <>
                            <Link href="/login" className='button'>LogIn</Link>
                            {/* <Link href="/register" className='primary'>SignUp</Link> */}
                        </>
                    )
                    }

                </div>
                <MobileNav links={links} user={user} />
            </nav>
        </header>
    );
};
export default Navbar;