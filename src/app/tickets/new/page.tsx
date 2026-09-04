"use client";

import { useActionState } from "react";
import { createTicket } from "@/actions/ticket.actions";


const TicketNewPage = () => {
    const [state, formAction] = useActionState(createTicket,
        {
            success: false,
            message: "",
        });

    return (
        <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 border border-gary-200"><h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Summit a Support Ticket</h1>
                <form action={formAction} className="space-y-4 text-gray-700">
                    <input type="text"
                        className="w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        name="subject"
                        id="subject"
                        placeholder="Enter the subject"
                        required
                    />
                    <textarea
                        className="w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        name="description"
                        placeholder="Enter the description"
                        rows={4}
                        required
                    />
                    <select name="priority" id="priority" className="w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" defaultValue="Low">
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    <button className="w-full bg-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 p-3 text-white text-xl">Submit</button>
                </form>
            </div>
        </div>
    );
};
export default TicketNewPage;