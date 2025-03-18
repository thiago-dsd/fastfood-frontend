import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_AGENT_API}/info`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch agent info" },
        { status: response.status }
      );
    }

    const agentInfo = await response.json();
    return NextResponse.json(agentInfo);
  } catch (error) {
    console.error("Error fetching agent info:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}