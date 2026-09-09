"use client";

import { useActionState,useEffect } from "react";
import { createTicket } from "@/actions/ticket.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


const NewTicketForm = () => {
    const [state, formAction] = useActionState(createTicket,
        {
            success: false,
            message: "",
        });

    const router = useRouter();
    useEffect(() => {
        // if the success is true, then ticket will be created and store in the database and page will be direct to the tickets page.
        if (state.success) {
            toast.success("Ticket has been created successfully!");
            router.push("/tickets")
        }
    },[state.success,router])


    return (
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 border border-gray-200">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Summit a Support Ticket</h1>
            {state.message && !state.success && (<p className="text-red-500 text-center mb-4">{state.message}</p>)}
            <form action={formAction} className="space-y-4 text-gray-700">
                <input type="text"
                    className="w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    name="subject"
                    id="subject"
                    placeholder="Enter the subject"
                />
                <textarea
                    className="w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    name="description"
                    placeholder="Enter the description"
                    rows={4}
                    // required
                />
                <select name="priority" id="priority" className="w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" defaultValue="Low">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <button className="w-full bg-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 p-3 text-white text-xl">Submit</button>
            </form>
        </div>
    );
};
export default NewTicketForm;