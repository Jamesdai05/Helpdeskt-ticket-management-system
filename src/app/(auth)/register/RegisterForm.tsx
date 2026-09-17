'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { userRegistration } from "@/actions/auth.actions";
import { toast } from "sonner";





const RegisterForm = () => {
    const initialState = {
        success: false,
        message:"",
    }

    const router = useRouter();
    const [state, formAction,pending] = useActionState(userRegistration, initialState)

    useEffect(() => {
        // console.log("ACTION STATE RECEIVED:", new Date().toISOString(), state);
        if (state.success) {
            toast.success(state.message);
            // console.time("navigate-to-tickets");
            router.replace("/tickets");
        }else if(state.message){
            toast.error(state.message);
        }
    },[state,router])

    return (
        <div className="max-w-2xl flex flex-col mx-auto items-center justify-center shadow-md rounded-lg bg-white p-8">
            <h1 className="text-blue-400 font-semibold text-4xl">Register</h1>
            <form
                className="flex flex-col max-w-lg p-6 space-y-6 mx-auto"
                action={formAction}
            >
                <div className="form-group space-y-2">
                    <label htmlFor="name" className="label">Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        id="name"
                        autoComplete="name"
                        className="input"/>
                </div>
                <div className="form-group space-y-2">
                    <label htmlFor="email" className="label">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        className="input"
                        />

                </div>
                <div className="form-group space-y-2">
                    <label htmlFor="password" className="label">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        id="password"
                        autoComplete="new-password"
                        className="input" />
                </div>

                <div className="form-group space-y-2">
                    <label htmlFor="confirmpassword" className="label">Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm your password"
                        name="confirmpassword"
                        id="confirmpassword"
                        autoComplete="new-password"
                        className="input" />
                </div>

                <div className="flex w-full justify-center">
                    <button type="submit" className="button bg-blue-400 p-2 text-white rounded-lg w-full hover:bg-blue-600" disabled={pending}>{pending ? "Registering..." : "Register"}</button>
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