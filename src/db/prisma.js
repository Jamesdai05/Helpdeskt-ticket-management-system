"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
var client_1 = require("@/generated/prisma/client");
var adapter_pg_1 = require("@prisma/adapter-pg");
var connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("Database url is not found!");
}
var globalForPrisma = globalThis;
var adapter = new adapter_pg_1.PrismaPg({
    connectionString: connectionString
});
//  to create a new prosma with nullish coalescing operator, means null or empty.
//  not null then use left value, otherwise, them right value is used.
exports.prisma = (_a = globalForPrisma.prisma) !== null && _a !== void 0 ? _a : new client_1.PrismaClient({ adapter: adapter });
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = exports.prisma;
}
