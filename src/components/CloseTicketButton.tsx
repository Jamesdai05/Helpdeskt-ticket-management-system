"use client";

import { useActionState, useEffect } from "react";
import { closeTheTicketById } from "@/actions/ticket.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type CloseTicketButtonProps = {
  ticketId: number;
  isClosed: boolean;
};

const CloseTicketButton = ({ ticketId, isClosed }: CloseTicketButtonProps) => {
  const initalState = { success: false, message: "" };

  const router = useRouter();

  const action = closeTheTicketById.bind(null, String(ticketId));

  const [state, formAction, isPending] = useActionState(action, initalState);

  useEffect(() => {
    if (!state.message) return;
    if (state.success) {
      toast.success(state.message);
      router.push("/tickets");
    } else {
      toast.error(state.message);
    }
  }, [state]);

  if (isClosed) return null;

  return (
    <form action={formAction} className="w-full flex justify-center">
      <button
        type="submit"
        disabled={isPending}
        className="w-full p-2 rounded bg-red-500 text-white hover:bg-red-700 disabled:opacity-50"
      >
        {isPending ? "Closing..." : "Close Ticket"}
      </button>
    </form>
  );
};
export default CloseTicketButton;
