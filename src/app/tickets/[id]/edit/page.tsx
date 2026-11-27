import { notFound } from "next/navigation";
import { getTicketById } from "@/actions/ticket.actions"
import EditTicketForm from "./EditTicketForm";

export type Ticket = {
  id: number;
  subject: string;
  description: string;
  priority: string;
}


const EditTicketPage = async({params}:{params:Promise<{id:string}>}) => {
  const { id } = await params

  const { ticket } = await getTicketById(id);
  if (!ticket) notFound();
  // console.log(ticket);

  return (
    <div className="min-h-screen px-4 justify-center items-center bg-blue-50 flex">
      <EditTicketForm ticket={ticket} />
    </div>
  )
}
export default EditTicketPage;
