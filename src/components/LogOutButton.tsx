"use client"

import { useActionState, useEffect, useReducer } from "react";
import { logOut } from "../actions/auth.actions";
import { useRouter } from "next/navigation"




const LogOutButton = () => {
    const initialState = {
        success: false,
        message: "",
    }

    const router = useRouter();

    const [state,formAction]=useActionState(logOut,initialState)

    useEffect(() => {
        if (state.success) {
            router.replace("/login");
        }
    },[state,router])

  return (
      <form action={formAction} className="text-white">
          <div>
              <button type="submit" className="button bg-red-300 rounded p-[5px]">Log out</button>
        </div>
    </form>
  )
}
export default LogOutButton