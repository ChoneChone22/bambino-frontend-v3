"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        setLoading(true);

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

        if (!res.ok) {
          throw new Error(data.message || "Verification failed");
        }

        toast.success(data.message);
        router.push("/");
        localStorage.setItem("emailVerified", "true");
      } catch (e: any) {
        console.error(e);
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      {loading && (
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
          Verifying…
        </div>
      )}
    </main>
  );
}
