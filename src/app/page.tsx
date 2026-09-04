import { FaTicketAlt } from "react-icons/fa";
import Link from 'next/link';


const page = () => {
  return (
      <main className="min-h-screen px-4 flex flex-col text-center items-center justify-center">
          <FaTicketAlt className="mx-auto mb-4 text-red-400" size={80} />
          <h1 className="text-4xl font-bold mb-4 text-blue-400 md:text-5xl">Welcome to Ticket System</h1>
          <p className="text-lg text-gray-600 mb-8">Fast and simple ticket management system</p>
          <div className="flex flex-col md:flex-row justify-center gap-4 animate-slide">
              <Link href="/tickets/new" className="text-white bg-blue-500 outline-none p-2 rounded shadow hover:bg-blue-300 transition">Summit a Ticket</Link>
              <Link href="/tickets" className="text-white bg-blue-500 outline-none p-2 rounded shadow hover:bg-blue-300 transition">View Tickets</Link>
          </div>
    </main>
  )
}
export default page
