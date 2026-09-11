import { JWTPayload, jwtVerify, SignJWT } from 'jose';
import { cookies } from "next/headers";
import { logEvent } from '@/utils/sentry';


type AuthTokenPayload = {
    userId: string;
    email: string;
};

const secret = new TextEncoder().encode(process.env.AUTH_SECRETS);
// set cookiename
const cookieName = 'auth-token';


// Encrypt and sign token
const signAuthToken = async ({ payload }: { payload: JWTPayload }) => {
    try {
        const token = await new SignJWT(payload)
            .setProtectedHeader({ alg: "256" }) // different algorithm 384,512
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(secret)

        return token;
    } catch (error) {
        logEvent("Token sign failed", 'auth', { payload }, 'error', error);
        throw new Error("Token sign failed");
    }
}


// Decrypt and verify
const verifyAuthToken = async <T>(token:string):Promise<T|null> => {
    try {
        const { payload } = await jwtVerify(token, secret, {
            algorithms:['HS256'],
        })
        return payload as T;
    } catch (error) {
        logEvent("Verifcation of token failed", 'auth', { tokenSnippet: token.slice(0, 10) }, 'error', error)
        throw new Error("Token verification failed!");
    }
}

//set the auth cookie
const setAuthCookie=async(token: string)=>{
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
        logEvent('Failed to set cookie', 'auth', { token }, 'error', error);
    }
}

// get the token from cookie
const getAuthCookie = async() => {
    const cookieStored = await cookies();
    const token = cookieStored.get(cookieName);
    return token?.value;
}


// delete the token cookie
const removeCookie = async () => {
    try {
        const cookieStored = await cookies();
        cookieStored.delete(cookieName);
    } catch (error) {
        logEvent("Failed to delete cookie", 'auth', {}, 'error', error);
    }
}


export {
    signAuthToken,
    verifyAuthToken,
    setAuthCookie,
    getAuthCookie,
    removeCookie,
}
