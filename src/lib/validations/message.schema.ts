import { z } from "zod";

export const MessageSchema = z.object({
  id: z.number().optional(),
  type: z.enum(["human", "ai"]),
  content: z.string().min(1, "Por favor, escreva sua mensagem."),
  timestamp: z.string().optional(),
  model: z.string().optional(),
  thread_id: z.string().optional(),
  agent_config: z
    .object({
      spicy_level: z.number().min(0).max(1),
    })
    .optional(),
});

export type MessageInput = z.infer<typeof MessageSchema>;