"use server";

import { prisma } from "@/db/prisma"; //use to the model to manipulate the data
import { signAuthToken, setAuthCookie, removeAuthCookie } from "@/lib/auth";
import { logEvent } from "@/utils/sentry";
import bcrypt from "bcryptjs";
import { Prisma } from "@/generated/prisma/client";
import { redirect } from "next/navigation";


type ResponseRe = {
    success: boolean;
    message: string;
};

const userRegistration = async (prevstate: ResponseRe, formData: FormData): Promise<ResponseRe> => {

    try {
        const name = (formData.get('name') as string)?.trim();
        const email = (formData.get('email') as string)?.trim().toLowerCase();
        const password = formData.get('password') as string;
        const confirmpassword = formData.get('confirmpassword') as string;



        if (!name || !email || !password || !confirmpassword) {
            logEvent('Missing required fields!', 'auth', { name, email }, 'warning');
            return { success: false, message: "All fields are required!" };
        };

        if (password !== confirmpassword) {
            logEvent('Passwords not matched', 'auth', { name, email }, 'warning');
            return { success: false, message: "Passwords not matched" };
        };
        // Find user



        // check if user exsits
        const userExisted = await prisma.user.findUnique({
            where: { email },
        });


        if (userExisted) {
            logEvent('User already Exists', 'auth', { email }, 'warning');
            return { success: false, message: "User already exists" };

        };



        // Check password length
        if (password.length < 8) {
            return {
                success: false,
                message: "Password must be at least 8 characters.",
            };
        }


        // hash password

        const hashedpassword = await bcrypt.hash(password, 10);

        let newUser;

        try {
            // create user
            newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedpassword,
                }
            });
        } catch (err) {
            //  double-submit for the user creation
            if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
                logEvent('User already exists (race on create)', 'auth', { email }, 'warning');
                return { success: false, message: "User already exists" };
            }
            throw err; // let the outer catch handle anything else
        }


        // sign and set token
        // Sign token
        // start = performance.now();

        const token = await signAuthToken({ payload: { userId: newUser.id } });

        if (!token) {
            throw new Error("Failed to create authentication token");
        }

        await setAuthCookie(token);



        // monitor message
        logEvent('User registered successfully', 'auth', { userId: newUser.id, email }, 'info');


        return { success: true, message: 'User has been successfully registered!' };
    } catch (error) {
        logEvent('Error occurred during registration', 'auth', {}, 'error', error);
        return { success: false, message: "Error occurred during registration" };
    }

};

// Log user out and remove auth cookie

const logOut = async (formData:FormData): Promise<never> => {
    try {
        await removeAuthCookie();
        logEvent('Logged out successfully', 'auth', {}, 'info');
        // return { success: true, message: "User has been logged out successfully!" };

    } catch (error) {
        logEvent("Error occurred during log out", 'auth', {}, 'error', error);
        // return { success: false, message: "Logout failed,please try again!" };
    }
    redirect("/login?logout=success");
};


const userLogIn = async (prevState: ResponseRe, formData: FormData): Promise<ResponseRe> => {
    try {
        const email = (formData.get('email') as string)?.trim().toLowerCase();
        const password = formData.get('password') as string;

        if (!email || !password) {
            logEvent("All fields are required", "auth", { email }, 'warning');

            return { success: false, message: "Email and password are required" };
        };

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            logEvent('User not found', 'auth', { email }, 'warning');
            return { success: false, message: 'Invalid email or password' };
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            logEvent('Invalid email or password', 'auth', { email }, 'warning');
            return { success: false, message: 'Invalid email or password' };
        }

        const token = await signAuthToken({ payload: { userId: user.id } });

        if (!token) {
            throw new Error("No authentication token");
        }
        await setAuthCookie(token);
        logEvent('Log In successfully', 'auth', { userId: user.id }, 'info');
        return { success: true, message: "Log in successfully!" };
    } catch (error) {
        logEvent('Login error occurred', 'auth', {}, 'error', error);
        return { success: false, message: "Error during log in!" };
    }
};


export {
    userRegistration,
    logOut,
    userLogIn,
};