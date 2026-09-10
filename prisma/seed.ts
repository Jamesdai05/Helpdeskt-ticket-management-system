// this is the function for data seeding
import { prisma } from "../src/db/prisma";
import data from "@/db/data.json";

// deleting the data before seeding
async function seeding() {
    await prisma.ticket.deleteMany();

    const tickets=data.map((ticket)=>(
        {
        ...ticket,
        createdAt:new Date(ticket.createdAt),
        updatedAt:new Date(ticket.updatedAt),
    }));
    await prisma.ticket.createMany({
        data:tickets
    });

    console.log("Tickets seeded successfully.");
}


seeding()
    .catch((err)=>{
        console.error(err);
        process.exit(1);
    })
    .finally(async()=>{
        await prisma.$disconnect();
    })