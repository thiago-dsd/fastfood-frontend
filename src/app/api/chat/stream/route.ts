import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, model, thread_id } = await req.json();

    const response = await fetch(`${process.env.NEXT_PUBLIC_AGENT_API}/stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, model, thread_id }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to stream agent response" },
        { status: response.status }
      );
    }

    const stream = response.body;
    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error streaming agent response:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}