import Link from 'next/link';
import { getCurrentUser } from '@/lib/currentUser';
import logo from "../../public/logo.jpg";
import Image from "next/image";


const Navbar = async () => {

    const links = [
        { label: "tickets", href: "/tickets" },
        { label: "my tickets", href: "/tickets/mine" },
        { label: "New ticket", href: "/tickets/new" },
    ];

    const user = await getCurrentUser();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-blue-600 backdrop-blur-sm">
            <nav className="mx-auto h-16 max-w-7xl flex justify-between items-center gap-4 px-4 sm:px-6">
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
                <div className='hidden items-center gap-3 text-white md:flex'>
                    {user ? (
                        <>
                            <p>Welcome,{user.name}</p>
                            <Link href="/logout">Logout</Link>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className='button'>LogIn</Link>
                            {/* <Link href="/register" className='primary'>SignUp</Link> */}
                        </>
                    )
                    }

                </div>
            </nav>
        </header>
    );
};
export default Navbar;