import { type JWTPayload } from "jose";
import { getCurrentUser } from "@/actions/currentUser";

export interface AuthTokenPayload extends JWTPayload {
  userId: string;
}

export type AuthUser=NonNullable<Awaited<ReturnType <typeof getCurrentUser>>>

export interface AuthContextType{
  user: AuthUser | null;
  isAuthenticated: boolean;
}
