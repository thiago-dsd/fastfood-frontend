"use client";

import { Message } from "@/lib/types";
import { create } from "zustand";

// Definindo o tipo para o estado do chat
interface ChatStore {
  messages: Message[]; // Lista de mensagens
  inputValue: string; // Valor do input
  setInputValue: (value: string) => void; // Função para atualizar o input
  addMessage: (message: Message) => void; // Função para adicionar uma mensagem
  clearMessages: () => void; // Função para limpar as mensagens
}

// Criando a store do chat
const useChatStore = create<ChatStore>((set) => ({
  messages: [], // Estado inicial: lista vazia de mensagens
  inputValue: "", // Estado inicial: input vazio
  setInputValue: (value) => set({ inputValue: value }), // Atualiza o valor do input
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })), // Adiciona uma mensagem
  clearMessages: () => set({ messages: [] }), // Limpa todas as mensagens
}));

export default useChatStore;