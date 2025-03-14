import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("session_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized - Token not found" }, { status: 401 });
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_CORE_API}/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    },
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: response.status }
    );
  }

  const userData = await response.json();

  return NextResponse.json(userData);
}
