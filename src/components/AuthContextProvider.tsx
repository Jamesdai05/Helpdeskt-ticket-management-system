"use client"

import { createContext, useContext,type ReactNode} from "react"
import { type AuthContextType, type AuthUser } from "@/types/auth";


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export type AuthProviderProps = { user: AuthUser | null; children: ReactNode };


export const AuthProvider = ({children,user}:AuthProviderProps) => {
  return <AuthContext value={{user,isAuthenticated:!!user}}>{children}</AuthContext>
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used in the Auth provider");

  return context;
}



