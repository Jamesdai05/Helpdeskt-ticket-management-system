// this is the function for data seeding
import { prisma } from "../src/db/prisma";
import data from "@/db/data.json";
import { users } from "@/db/user";
import bcrypt from "bcryptjs";


// deleting the data before seeding
async function seeding() {
    await prisma.ticket.deleteMany();

    for (const user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 10);

        // update or insert the new user
        await prisma.user.upsert({
            where: {
                email: user.email,
            },
            update: {
                password: hashedPassword,
            },
            create: {
                email: user.email,
                name: user.name,
                password: hashedPassword,
            },
        });
    }



    const seedUser = await prisma.user.findUnique({
        where: {
            email: users[0].email,
        },
    });

    if (!seedUser) {
        throw new Error("Seed user was not created.");
    }

    const tickets = data.map((ticket) => (
        {
            ...ticket,
            userId: seedUser.id,
            createdAt: new Date(ticket.createdAt),
            updatedAt: new Date(ticket.updatedAt),
        }));
    await prisma.ticket.createMany({
        data: tickets
    });

    console.log("Tickets seeded successfully.");
}


seeding()
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });