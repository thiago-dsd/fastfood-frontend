import { getErrorResponse } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import {
  RegisterUserInput,
  RegisterUserSchema,
} from "@/lib/validations/user.schema";
import { hash } from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("session_token")?.value;
    
  try {
    const body = await req.json();

    const response = await fetch(`${process.env.NEXT_PUBLIC_CORE_API}/order`, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify(body),
    });
  

    return response;
  } catch (error: any) {
    return getErrorResponse(500, error.message);
  }
}

