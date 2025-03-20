import { getErrorResponse } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import { Order } from "@/lib/types/order";
import {
  RegisterUserInput,
  RegisterUserSchema,
} from "@/lib/validations/user.schema";
import { hash } from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("session_token")?.value;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CORE_API}/order?created_at=desc&limit=10&offset=0&updated_at=desc`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error: any) {
    console.error("Erro ao buscar pedidos:", error.message);
    throw error; // Rejeita a Promise para que o chamador possa lidar com o erro
  }
}