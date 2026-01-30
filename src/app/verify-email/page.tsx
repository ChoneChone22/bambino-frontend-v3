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
    console.log("VerifyEmail", token);

    (async () => {
      try {
        setLoading(true);

        const accessToken = localStorage.getItem("accessToken");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/user/verify-email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(accessToken
                ? { Authorization: `Bearer ${accessToken}` }
                : {}),
            },
            body: JSON.stringify({ token }),
          },
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Verification failed");
        }

        router.push("/");
      } catch (e: any) {
        console.error(e);
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [searchParams]);

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
