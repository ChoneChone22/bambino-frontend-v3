"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  console.log("token",token);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    console.log("token");
    
    const verifyEmail = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/user/verify-email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          },
        );
        const data = await res.json();
        console.log("Verification:", data);

        if (!res.ok) {
          throw new Error(data.message);
        }
        toast.success(data.message);
        router.replace("/checkout");
      } catch (error: any) {
        console.error("Email verification error:", error);
        toast.error(error.message || "An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      {loading && (
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
          Verifying email…
        </div>
      )}
    </main>
  );
}
