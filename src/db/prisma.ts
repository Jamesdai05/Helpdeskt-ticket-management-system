import "server-only";

import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";


const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("Database url is missing!");
}

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

const adapter = new PrismaPg ({
    connectionString,
    connectionTimeoutMillis: 15000,
    idleTimeoutMillis: 30000,
    max: 10,
})

//  to create a new prosma with nullish coalescing operator, means null or empty.
//  not null then use left value, otherwise, them right value is used.
export const prisma = globalForPrisma.prisma ?? new PrismaClient({adapter});

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
