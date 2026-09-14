import { verifyAuthToken, getAuthCookie } from "./auth";
import { prisma } from "@/db/prisma";


type AuthPayload = {
    userId: string;
};


export const getCurrentUser = async () => {
    try {
        const token = await getAuthCookie();
        if (!token) return null;

        const payload = await verifyAuthToken<AuthPayload>(token);

        if (!payload?.userId) return null;

        const currentUser = await prisma.user.findUnique({
            where: { id: payload.userId },
            // select the data
            select: {
                id: true,
                email: true,
                name:true,
            },
        })
        return currentUser;
    } catch (error) {
        console.error("Error in getting the current user!",error);
        return null;
    }
};
