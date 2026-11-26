import { getTickets } from "@/actions/ticket.actions";
import { logEvent } from "@/utils/sentry";
import TicketCard from "./ticket";
import { getCurrentUser } from "@/actions/currentUser";
import { redirect } from "next/navigation";

const TicketsPage = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

    const tickets = await getTickets();

    return (
        <div className="min-h-screen bg-blue-50">
            <div className="p-4">
                <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">
                    Support tickets List
                </h1>
                {tickets?.length === 0 ? (<p className="text-3xl font-bold text-gray-600">There is no tickets yet.</p>) :
                    <div className="ticket-list space-y-4 max-w-3xl mx-auto">
                        {tickets.map(ticket => (
                            <TicketCard key={ticket.id} {...ticket} />
                            ))}
                    </div>
                }
            </div>
        </div>
    );
};


export default TicketsPage;

