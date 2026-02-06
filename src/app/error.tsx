"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>

      <p className="sub_heading2 mb-6">
        An unexpected error occurred. Please try again.
      </p>

      <button
        onClick={() => reset()}
        className="px-4 py-2 rounded-md primary_background heading"
      >
        Try again
      </button>
    </main>
  );
}
