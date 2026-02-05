import { fetchWithAccessRefresh } from "./fetch-with-refresh";
import { User } from "@/components/UserContext";

export async function fetchUserProfile(): Promise<User | null> {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL!;
  const res = await fetchWithAccessRefresh(`${baseURL}/auth/user/profile`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) return null;

  const json = await res.json();
  // your code uses: data.data.user
  return json?.data?.user ?? null;
}
