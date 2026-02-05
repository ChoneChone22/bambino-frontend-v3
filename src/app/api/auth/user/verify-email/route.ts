import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token } = (await req.json()) as { token?: string };

    if (!token) {
      return NextResponse.json(
        { message: "Verification token is required" },
        { status: 400 }
      );
    }

    const backendBase = process.env.NEXT_PUBLIC_BASE_URL;
    if (!backendBase) {
      return NextResponse.json(
        { message: "BACKEND_URL is not set" },
        { status: 500 }
      );
    }

    const cookie = req.headers.get("cookie") ?? "";
    const authorization = req.headers.get("authorization");
    const guestToken = req.headers.get("x-guest-token");

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      cookie,
    };

    if (authorization) headers["Authorization"] = authorization;
    if (guestToken) headers["X-Guest-Token"] = guestToken;

    const res = await fetch(`${backendBase}/auth/user/verify-email`, {
      method: "POST",
      headers,
      body: JSON.stringify({ token }),
    });

    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    console.error("POST /api/auth/user/verify-email error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
