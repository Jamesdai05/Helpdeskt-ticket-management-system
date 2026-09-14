"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { userLogIn } from "@/actions/auth.actions";
import { toast } from "sonner";
import { useFormState } from "react-dom";


const LoginForm = () => {

    const initialState = {
        success: false,
        message:"",
    }

    const router = useRouter();
    const [state, formAction] = useActionState(userLogIn, initialState);

    useEffect(() => {
        if (state.success) {
            toast.success("User log in successfully!");
            router.push("/tickets/mine");
        }
    })


    return (
        <div className="max-w-2xl p-8 flex flex-col items-center justify-center shadow-md bg-white rounded-lg">
            <h1 className="text-blue-400 font-semibold text-4xl">Log In</h1>
            <form className="flex flex-col max-w-lg p-6 space-y-6 mx-auto" action={formAction}>
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
                {/* <div className="form-group flex just    ify-between items-center gap-4"> */}
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
                    <button className="button bg-blue-400 p-2 text-white rounded-lg w-full hover:bg-blue-600">Log In</button>
                </div>
                <div className="form-group">
                    <p className="text-left text-sm text-foreground">Don't have an account?{"   "}
                        <span><Link href="/register" className="underline text-md font-bold text-blue-600 hover:text-blue-400 hover:underline-offset-4">Sign Up</Link></span>
                    </p>
                </div>
            </form>
        </div>

    );
};
export default LoginForm;