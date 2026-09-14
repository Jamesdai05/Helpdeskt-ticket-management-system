'use client';

import Link from "next/link";

const RegisterForm = () => {
    return (
        <div>
            <form className="flex flex-col max-w-lg p-6 space-y-6 mx-auto">
                <div className="form-group space-y-2">
                    <label htmlFor="text" className="label">Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        id="name"
                        autoComplete="name"
                        className="input" />
                </div>
                <div className="form-group space-y-2">
                    <label htmlFor="email" className="label">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        className="input" />
                </div>
                <div className="form-group space-y-2">
                    <div className="flex justify-between items-center">
                        <label htmlFor="password" className="label">Password</label>
                        <Link href="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                            Forgot password?
                        </Link>
                    </div>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        id="password"
                        className="input" />
                </div>

                <div className="flex w-full justify-center">
                    <button className="button bg-blue-400 p-2 text-white rounded-lg w-full hover:bg-blue-600">Register</button>
                </div>
                <div className="form-group">
                    <p className="text-left text-sm text-foreground">Already have an account?{"   "}
                        <span><Link href="/login" className="underline text-md font-bold text-blue-600 hover:text-blue-400 hover:underline-offset-4">Log In</Link></span>
                    </p>
                </div>
            </form>
        </div>
    );
};
export default RegisterForm;