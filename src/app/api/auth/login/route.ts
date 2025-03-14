import { getEnvVariable, getErrorResponse } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import { signJWT } from "@/lib/token";
import { LoginUserInput, LoginUserSchema } from "@/lib/validations/user.schema";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const API_URL = process.env.NEXT_PUBLIC_CORE_API;

  if (!API_URL) {
    return new NextResponse(JSON.stringify({ error: "Server configuration error" }), { status: 500 });
  }

  const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_CORE_API}/user/auth/token`, { 
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!apiResponse.ok) {
    return new NextResponse(JSON.stringify({ error: "Erro ao autenticar" }), { status: apiResponse.status });
  }

  const { token } = await apiResponse.json();

  const response = new NextResponse(
    JSON.stringify({ token }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  response.cookies.set("session_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 60 * 60 * 24, 
    path: "/",
  });

  return response;
}
