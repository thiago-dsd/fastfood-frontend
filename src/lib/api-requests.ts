import { cookies } from "next/headers";
import { AgentInfo } from "./types/agent";
import { UserLoginResponse, UserResponse, FilteredUser} from "./types/user";
import { Message } from "./types/message";
import { Order } from "./types/order";

const SERVER_ENDPOINT = process.env.NEXT_PUBLIC_CORE_API || "http://127.0.0.1:4200";

async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("Content-Type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    if (isJson && data.errors !== null) {
      throw new Error(JSON.stringify(data.errors));
    }

    throw new Error(data.message || response.statusText);
  }

  return data as T;
}

export async function apiRegisterUser(
  credentials: string
) {
  const response = await fetch(`/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: credentials,
  });
}

export async function apiLoginUser(credentials: string): Promise<string> {
  const response = await fetch(`/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: credentials,
  });
  
  return handleResponse<UserLoginResponse>(response).then((data) => data.token);
}

export async function apiLogoutUser(): Promise<void> {
  const response = await fetch(`/api/auth/logout`, {
    method: "GET",
    credentials: "include", 
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse<void>(response);
}

export async function apiGetAuthUser(): Promise<FilteredUser> {  
  const response = await fetch(`/api/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });


  return handleResponse<FilteredUser>(response).then((data) => data);
}

export async function apiGetChatHistory(threadId: string): Promise<Message[]> {
  const response = await fetch(`/api/chat/history?thread_id=${threadId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse<Message[]>(response);
}

export async function apiGetAgentInfo(): Promise<AgentInfo> {
  const response = await fetch(`/api/chat/info`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse<AgentInfo>(response);
}

export async function apiInvokeAgent(
  message: string,
): Promise<Message> {
  const response = await fetch(`/api/chat/invoke`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
    }),
  });

  return handleResponse<Message>(response);
}

export async function apiStreamAgent(
  message: string,
  model?: string,
  threadId?: string
): Promise<ReadableStream<Uint8Array>> {
  const response = await fetch(`/api/chat/stream`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, model, thread_id: threadId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to stream agent response");
  }

  return response.body!;
}

export async function apiCreateOrder(description: string): Promise<void> {  
  const response = await fetch(`/api/order/create`, { 
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description })
  });

  if (!response.ok) {
    throw new Error(`Erro ao criar pedido: ${response.statusText}`);
  }
}

export async function apiGetAllOrders(): Promise<Order[]> {
  console.log("Iniciando apiGetAllOrders..."); // Log inicial
  try {
    const response = await fetch(`/api/order/all`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Resposta da API recebida:", response); // Log da resposta bruta

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Dados brutos da API:", data); // Log dos dados brutos

    const orders: Order[] = data.map((order: any) => ({
      id: order.id,
      userId: order.user_id,
      description: order.description,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
    }));

    console.log("Dados mapeados para Order[]:", orders); // Log dos dados mapeados
    return orders;
  } catch (error) {
    console.error("Erro em apiGetAllOrders:", error); // Log de erro
    throw error;
  }
}
