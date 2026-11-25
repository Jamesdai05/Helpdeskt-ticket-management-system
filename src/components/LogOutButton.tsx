"use client"

import { logOut } from "../actions/auth.actions";
import { useFormStatus } from "react-dom";

const LogOutButton = () => {
  return (
    <form action={logOut}>
      <SubmitButton />
    </form>
  );
};
export default LogOutButton;


const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="button bg-red-500 rounded p-1.25 transition-colors text-white hover:bg-red-600
                 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={pending}
    >
      {pending ? "Logging out..." : "Log out"}
    </button>
  );

}