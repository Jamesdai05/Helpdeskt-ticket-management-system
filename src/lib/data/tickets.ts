import "server-only";

import { redirect } from "next/navigation";
import { prisma } from "@/db/prisma";
import { getCurrentUser } from "@/actions/currentUser";
import { logEvent } from "@/utils/sentry";

// Read-only data access for tickets.
// Kept out of "use server" files so these are NOT exposed as public server-action endpoints.

export async function getTickets() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  try {
    const tickets = await prisma.ticket.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    logEvent("Fetched ticket list", "ticket", { count: tickets.length }, "info");
    return tickets;
  } catch (error) {
    logEvent("Failed to fetch ticket list", "ticket", {}, "error", error);
    return [];
  }
}

export async function getTicketById(id: string) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const ticketId = Number(id);
  if (!Number.isSafeInteger(ticketId) || ticketId < 0) {
    return { success: false, message: "Invalid ticket id.", ticket: null };
  }

  try {
    // Filter by owner: someone else's ticket looks the same as a missing one.
    const ticket = await prisma.ticket.findFirst({
      where: { id: ticketId, userId: user.id },
    });

    if (!ticket) {
      logEvent("Ticket not found", "ticket", { ticketId }, "warning");
      return { success: false, message: "Failed to Get the ticket.", ticket: null };
    }
    return { success: true, message: "Successfully get the data", ticket };
  } catch (error) {
    logEvent("Error in fetching ticket", "ticket", { ticketId }, "error", error);
    return { success: false, message: "Error in the ticket fetching.", ticket: null };
  }
}
