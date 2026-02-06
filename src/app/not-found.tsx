import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="sub_heading2 mb-6">
        The page you’re looking for doesn’t exist.
      </p>

      <Link
        href="/"
        className="px-4 py-2 rounded-md primary_background heading"
      >
        Go home
      </Link>
    </main>
  );
}
