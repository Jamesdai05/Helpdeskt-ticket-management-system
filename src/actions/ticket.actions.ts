"use server";
// import * as Sentry from "@sentry/nextjs";
import { logEvent } from "@/utils/sentry";

import { prisma } from "@/db/prisma";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/actions/currentUser";
import { redirect } from "next/navigation";
import { success } from "zod";

type ResponseRe = {
  success: boolean;
  message: string;
};

export async function createTicket(prevState: ResponseRe, formdata: FormData): Promise<ResponseRe> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      logEvent("Unauthorized ticket creation attempt", "auth", {}, "warning");
      return { success: false, message: "Please log in first!" };
    }

    const subject = formdata.get("subject") as string;
    const description = formdata.get("description") as string;
    const priority = formdata.get("priority") as string;
    // below for error testing.
    // throw new Error("simulated prisma error!")
    if (!subject || !description || !priority) {
      //here the info status of the sentry message for dubugging
      logEvent(
        "Validation Error: Missing fields",
        "ticket",
        { subject, description, priority },
        "warning"
      );
      return { success: false, message: "All fields are required!" };
    }

    // creation of ticket
    const ticket = await prisma.ticket.create({
      data: {
        subject,
        description,
        priority,
        user: {
          connect: { id: user.id },
        },
      },
    });

    logEvent(`Ticket created:${ticket.id}`, "ticket", { ticketId: ticket.id }, "info");

    revalidatePath("/tickets");
    return { success: true, message: "New ticket are created successfully!" };
  } catch (error) {
    //  to send the status to the sentry server and for developer to troubleshooting.
    // Sentry.captureException(error as Error, {
    // to show the formdata which user has entered
    //     extra: { formdata: Object.fromEntries(formdata.entries()) }
    // })

    logEvent(
      "Ticket creation failed",
      "ticket",
      { formdata: Object.fromEntries(formdata.entries()) },
      "error",
      error
    );
    return { success: false, message: "Ticket creation is failed!" };
  }
}

export async function getTickets() {
  const user = await getCurrentUser();
  if (!user) {
    logEvent("Please log in first", "auth", {}, "warning");
    return { success: false, message: "You need to log in first!" };
  }
  try {
    const tickets = await prisma.ticket.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    logEvent("Fetched ticket list", "ticket", { count: tickets.length }, "info");
    return tickets;
  } catch (error) {
    logEvent("Failed to fetch ticket list", "ticket", { data: "" }, "error", error);
    return [];
  }
}

export async function getTicketById(id: string) {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!ticket) {
      logEvent("Ticket not found", "ticket", { ticketId: id }, "warning");
      return {success:false,message:"Failed to Get the ticket.",ticket:null}
    }
    return {success:true,message:"Successfully get the data",ticket}
  } catch (error) {
    logEvent("Error in fetching ticket", "ticket", { ticketId: id }, "error", error);
    return {success:false,message:"Error in the ticket fetching.",ticket:null};
  }
}

export async function editTicketById(
  id: string,
  prevState: ResponseRe,
  formData: FormData
): Promise<ResponseRe> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const subject = formData.get("subject") as string;
  const description = formData.get("description") as string;
  const priority = formData.get("priority") as string;

  const ticketId = Number(id);

  // console.log("Ticket ID:", id);
  // console.log("Form Data:", Object.fromEntries(formData.entries()));
  if (!Number.isSafeInteger(ticketId) || ticketId<0) {
    return { success: false, message: "Invalid ticket id." };
  }

  if (!subject?.trim() || !description.trim() || !priority) {
    logEvent("All fields are required.", "ticket", {ticketId}, "warning");
    return { success: false, message: "Ticket creation failed." };
  }

  try {

    const ticket= await prisma.ticket.update({
      where: { id: Number(id),userId:user.id }, // add the id and userId as the filter
      data: {
        subject,
        description,
        priority,
      },
    });
    if (!ticket) {
      return { success: false, message: "No ticket are found!" };
    }
  } catch (err) {
    console.error("Error in updating the ticket", err);
    return { success: false, message: "Ticket failed to update." };
  }

  revalidatePath("/tickets");
  revalidatePath(`/tickets/${id}`);
  redirect(`/tickets/${id}`);
}

export async function closeTheTicketById(
  id: string,
  _prevState: ResponseRe,
  _formData?: FormData
): Promise<ResponseRe> {
  try {
    const user = await getCurrentUser();
  if (!user) {
    // redirect("/login");
    return { success: false, message: "Please log in first!" };
   };

  const ticketId = Number(id);

  if (!Number.isSafeInteger(ticketId) || ticketId < 0) {
    logEvent("Invalid ticket id", "ticket", {}, "warning");
    return { success: false, message: "Invalid ticket id." };
  }

    const ticket = await prisma.ticket.update({
      where: {
        id: ticketId,
        userId: user.id,
        status: {
          not: "closed"
        }
      },
      data: {
        status: "closed"
      },
    });

    if (!ticket) {
      return { success: false, message: "Ticket not found!" };
    }
  } catch (e) {
    console.error("Error occurred during update", e);
    return { success: false, message: "Failed to update the ticket." };
  }

  revalidatePath("/tickets");
  revalidatePath(`/tickets/${id}`);
  // redirect("/tickets")
  return { success: true, message: "Ticket has been closed." };
}
