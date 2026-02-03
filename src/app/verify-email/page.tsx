import { Suspense } from "react";
import VerifyEmailClient from "@/components/VerifyEmailClient";

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
            Verifying…
          </div>
        </main>
      }
    >
      <VerifyEmailClient />
    </Suspense>
  );
}