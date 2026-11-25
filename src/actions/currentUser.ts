import "server-only";

import { verifyAuthToken, getAuthCookie } from "../lib/auth";
import { prisma } from "@/db/prisma";
import { cache } from "react";

type AuthPayload = {
  userId: string;
};

export const getCurrentUser = cache(async () => {
  try {
    const token = await getAuthCookie();
    if (!token) return null;

    const payload = await verifyAuthToken<AuthPayload>(token); // to check the session or the userId, 

    if (!payload?.userId || typeof payload.userId !== "string" || !payload.userId) return null;

    const currentUser = await prisma.user.findUnique({
      where: { id: payload.userId },
      // select the data
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
    return currentUser;
  } catch (error) {
    console.error("Error in getting the current user!", error);
    return null;
  }
});
