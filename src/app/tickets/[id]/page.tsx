import { getTicketById } from "@/actions/ticket.actions";
import { logEvent } from "@/utils/sentry";
import Link from "next/link";
import { notFound } from "next/navigation";


const TicketDetailsPage = async (props: { params: Promise<{ id: string }> }) => {
    const { id } = await props.params
    
  return (
    <div>TicketDetailsPage {id}</div>
  )
}
export default TicketDetailsPage