"use client";
import { useEffect } from "react";
import { toast } from "sonner";

type TicketLoadedToastProps = {
  success: boolean;
  message: string;
  ticketId: string;
};

const TicketLoadedToast = ({ success, message, ticketId }: TicketLoadedToastProps) => {
  useEffect(() => {
    if (success) {
      toast.success(message);
    } else if (!success) {
      toast.error(message);
    }
  }, [success, message, ticketId]);
  return null;
};

export default TicketLoadedToast
