"use client";

import Link from "next/link";

interface Ticket{
    priority: string;
    subject: string;
    id: number;
}

const TicketCard = ({ priority,subject, id }:Ticket) => {

    const getPriorityClass = (p:string) => {
        switch (p) {
            case "Low":
                return "text-green-400 font-bold";
            case "Medium":
                return "text-yellow-600 font-bold";
            case "High":
                return "text-red-500 font-bold";
        }
    }


  return (
      <div className="flex justify-between items-center bg-white rounded-lg border shadow border-gray-200 p-6">
          <div>
              <h2 className="text-xl text-center font-semibold">{ subject }</h2>
          </div>
          <div className="space-y-2 text-right">
              <div className="text-sm text-center text-gray-500">
                  Priority:{" "}
                  <span className={getPriorityClass(priority)}>{priority}</span>
              </div>
              <Link href={`/tickets/${id}`} className="inline-block mt-2 px-3 py-1 rounded transition text-center bg-blue-300 text-white">View More</Link>
          </div>
    </div>
  )
}
export default TicketCard;