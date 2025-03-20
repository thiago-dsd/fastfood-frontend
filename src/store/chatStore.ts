import { apiGetAllOrders } from "@/lib/api-requests";
import { Message } from "@/lib/types/message";
import { Order } from "@/lib/types/order";
import { create } from "zustand";

interface ChatStore {
  requestLoading: boolean;
  messages: Message[];
  orders: Order[];
  inputValue: string;
  setInputValue: (value: string) => void;
  addMessage: (message: Message) => void;
  setRequestLoading: (isLoading: boolean) => void;
  clearMessages: () => void;
  setOrders: (value: Order[]) => void;
}

const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  orders: [],
  inputValue: "",
  requestLoading: false,
  setInputValue: (value) => set({ inputValue: value }),
  setOrders: (value: Order[]) => {orders: value},
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  addOrder: (currentOrder: Order) =>
    set((state) => ({ orders: [...state.orders, currentOrder] })),
  setRequestLoading: (isLoading) =>
    set((state) => ({ ...state, requestLoading: isLoading })),
  clearMessages: () => set({ messages: [] }),
  clearOrders: () => set({ orders: [] }),
}));

export default useChatStore;