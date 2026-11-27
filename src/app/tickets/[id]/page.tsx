import { getTicketById } from "@/lib/data/tickets";
// import { logEvent } from "@/utils/sentry";
import Link from "next/link";
import { notFound } from "next/navigation";
import TicketLoadedToast from "@/components/TicketLoadedToast";
import CloseTicketButton from "@/components/CloseTicketButton";


const TicketDetailsPage = async (props: { params: Promise<{ id: string }> }) => {
    const { id } = await props.params

  const {success,message,ticket } =await getTicketById(id)
    // console.log(ticket)

    if(!ticket || !success){
        notFound();
    }


  return (
    <>
      <TicketLoadedToast success={success} message={message} ticketId={id} />
      <div className="max-h-screen bg-blue-50 m-auto flex justify-center items-center">
        <div className="max-w-lg w-120 bg-white rounded-lg shadow border border-gray-200 p-8 space-y-6">
          <h1 className="text-blue-600 text-3xl font-bold">{ticket.subject}</h1>

          <div className="text-gray-600">
            <h2 className="text-lg font-semibold mb-2">Description:</h2>
            <p>{ticket.description}</p>
          </div>

          <div className="text-gray-600">
            <h2 className="text-lg font-semibold mb-2">Priority:</h2>
            <p>{ticket.priority}</p>
          </div>
          <div className="text-gray-600">
            <h2 className="text-lg font-semibold mb-2">Status:</h2>
            <p>{ticket.status}</p>
          </div>
          <div className="text-gray-600 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-2">Created At:</h2>
              <p>{new Date(ticket.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Updated At:</h2>
              <p>{new Date(ticket.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <Link
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              href="/tickets"
            >
              Back
            </Link>
            <Link
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              href={`/tickets/${id}/edit`}
            >
              Edit
            </Link>
          </div>
          <CloseTicketButton ticketId={ticket.id} isClosed={ticket.status==="closed"} />
        </div>
      </div>
    </>
  );
}

export default TicketDetailsPage