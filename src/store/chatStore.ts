import { Message } from "@/lib/types/message";
import { create } from "zustand";

interface ChatStore {
  requestLoading: boolean;
  messages: Message[];
  inputValue: string;
  setInputValue: (value: string) => void;
  addMessage: (message: Message) => void;
  setRequestLoading: (isLoading: boolean) => void;
  clearMessages: () => void;
}

const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  inputValue: "",
  requestLoading: false,
  setInputValue: (value) => set({ inputValue: value }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setRequestLoading: (isLoading) =>
    set((state) => ({ ...state, requestLoading: isLoading })),
  clearMessages: () => set({ messages: [] }),
}));

export default useChatStore;