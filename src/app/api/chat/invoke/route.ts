import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    
    const cookieStore = cookies();
    const token = cookieStore.get("session_token")?.value;
      
    const { message, model, thread_id } = await req.json();

    const response = await fetch(`${process.env.NEXT_PUBLIC_AGENT_API}/invoke`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message, model, thread_id }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to invoke agent" },
        { status: response.status }
      );
    }

    const agentResponse = await response.json();
    return NextResponse.json(agentResponse);
  } catch (error) {
    console.error("Error invoking agent:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}