"use client"

import { useActionState } from "react";
import { editTicketById } from "@/actions/ticket.actions";
import { type Ticket } from "./page";
import Link from 'next/link';

const EditTicketForm = ({ ticket }: { ticket: Ticket }) => {
  const action = editTicketById.bind(null, String(ticket.id))

  const initalState = { success: false, message: "" };

  const [state,formAction,isPending]=useActionState(action,initalState)

  return (
    <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Update A Support Ticket</h1>
      {state.message && !state.success && (
        <p className="text-red-500 text-center mb-4">{state.message}</p>
      )}
      <form action={formAction} className="space-y-4 text-gray-700">
        <input
          type="text"
          className="w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="subject"
          id="subject"
          defaultValue={ticket.subject}
          placeholder="Enter the subject"
        />
        <textarea
          className="w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="description"
          placeholder="Enter the description"
          rows={4}
          defaultValue={ticket.description}
          // required
        />
        <select
          name="priority"
          id="priority"
          className="w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          defaultValue={ticket.priority}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <div className="flex justify-center gap-6">
          <button className="bg-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 text-white  hover:bg-blue-600 transition" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
          </button>
          <Link
            href={`/tickets/${ticket.id}`}
            className="bg-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 text-white hover:bg-blue-600 transition"
          >
            Cancle
          </Link>
        </div>
      </form>
    </div>
  );
}
export default EditTicketForm