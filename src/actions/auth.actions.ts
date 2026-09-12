import { prisma } from "@/db/prisma"; //use to the model to manipulate the data
import { signAuthToken, setAuthCookie } from "@/lib/auth";
import { logEvent } from "@/utils/sentry";
import bcrypt from "bcryptjs";


type ResponseRe = {
    success: boolean;
    message: string;
};

const userRegistration = async (prestate: ResponseRe, formData: FormData): Promise<ResponseRe> => {
    try {
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (!name || !email || !password) {
            logEvent('Missing required fields!', 'auth', { name, email }, 'warning');
            return { success: false, message: "All fields are required!" };
        }


        // check if user exsits
        // to
        const userExisted = await prisma.user.findUnique({
            where: { email },
        });

        if (!userExisted) {
            logEvent('User already Exists', 'auth', { email }, 'warning');
            return { success: false, message: "User already exists" };
        };

        // hash password
        const hashedpassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedpassword,
            }
        });

        // sign and set token
        const token = await signAuthToken({payload:{ userId: newUser.id }});
        await setAuthCookie(token);

        // monitor message
        logEvent('User registered successfully', 'auth', { userId: newUser.id, email }, 'info');

        return { success: true, message: "User has been successfully registered!" };
    } catch (error) {
        logEvent('Error occurred during registration', 'auth', {}, 'error', error);
        return { success: false, message: "Error occurred during registration" };
    }

};


export {
    userRegistration,
}