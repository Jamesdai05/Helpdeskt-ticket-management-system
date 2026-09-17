import "server-only"; // only used in server

import { JWTPayload, jwtVerify, SignJWT } from 'jose';
import { cookies } from "next/headers";
import { logEvent } from '@/utils/sentry';


// type AuthTokenPayload = {
//     userId: string;
//     email: string;
// };
const authSecrets=process.env.AUTH_SECRETS

if (!authSecrets) {
    throw new Error("Auth secret is not defined!");
}


const secret = new TextEncoder().encode(authSecrets);




// set cookiename
const cookieName = 'auth-token';


// sign token
const signAuthToken = async ({ payload }: { payload: JWTPayload }):Promise<string | null> => {
    try {
        const token = await new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256" }) // different algorithm 384,512
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(secret)

        return token;
    } catch (error) {
        logEvent("Token sign failed", 'auth', {}, 'error', error);
        // throw new Error("Token sign error!");
        return null;
    }
}


// verify token
const verifyAuthToken = async <T>(token:string):Promise<T|null> => {
    try {
        const { payload } = await jwtVerify(token, secret, {
            algorithms:['HS256'],
        })
        return payload as T;
    } catch (error) {
        logEvent("Verification of token failed", 'auth', {}, 'error', error)
        // throw new Error("Token verification failed!");
        return null;
    }
}

//set the auth cookie
const setAuthCookie=async(token: string):Promise<void>=>{
    try {
        const cookieStore = await cookies();
        cookieStore.set(cookieName, token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 Days
        });
    } catch (error) {
        logEvent('Failed to set cookie', 'auth', {}, 'error', error);
        throw new Error("Set auth cookie failed!");
    }
}

// get the token from cookie
const getAuthCookie = async() :Promise<string | undefined> => {
    const cookieStored = await cookies();
    const token = cookieStored.get(cookieName);
    return token?.value;
}


// delete the token cookie
const removeAuthCookie = async ():Promise<void> => {
    const cookieStored = await cookies();
    cookieStored.delete(cookieName);
}


export {
    signAuthToken,
    verifyAuthToken,
    setAuthCookie,
    getAuthCookie,
    removeAuthCookie,
}
