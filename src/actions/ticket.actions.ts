'use server';
import * as Sentry from "@sentry/nextjs";
import { logEvent } from "@/app/utils/sentry";

import { prisma } from "@/db/prisma";

import { revalidatePath } from "next/cache";

export async function createTicket(prevState: { success: boolean, message: string; }, formdata: FormData): Promise<{success:boolean,message:string}> {
    const subject = formdata.get("subject") as string;
    const description = formdata.get("description") as string;
    const priority = formdata.get("priority") as string;

    console.log(subject, description, priority);

    try {
        // below for error testing.
        // throw new Error("simulated prisma error!")
        if (!subject || !description || !priority) {
            //here the info status of the sentry message for dubugging
            logEvent("Validation Error: Missing fields", "ticket", { subject, description, priority }, "warning");
            return { success: false, message: "All fields are required!" };
        }

        // creation of ticket
        const ticket = await prisma.ticket.create({
            data: { subject, description, priority }
        });

        Sentry.addBreadcrumb({
            category: "ticket",
            message: `Ticket created:${ticket.id}`,
            level:"info"
        })

        Sentry.captureMessage(`Ticket was created successfully:${ticket.id}!`);

        revalidatePath("/tickets");
        return { success: true, message: "New ticket are created successfully!" };
    } catch (error) {
        //  to send the status to the sentry server and for developer to troubleshooting.
        Sentry.captureException(error as Error, {
            // to show the formdata which user has entered
            extra: { formdata: Object.fromEntries(formdata.entries()) }
        })
        return { success: false, message: "Ticket creation is failed!" };
    }
}