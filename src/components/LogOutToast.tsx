"use client";


import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const LogoutToast = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        if (searchParams.get("logout") === "success") {
            toast.success(
                "You have been successfully logged out!"
            );
            router.replace("/login");
        } else if (searchParams.get("logout") === "failed") {
            toast.error("Logout failed,please try again!");
            router.replace("/login");
        }
    }, [searchParams, router]);

    return null;
};

export default LogoutToast;