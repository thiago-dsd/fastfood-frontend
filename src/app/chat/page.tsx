"use client";

import Header from "@/components/Header";
import Message from "@/components/Message";
import { Message as MessageType } from "@/lib/types/message";
import useStore from "@/store";
import useChatStore from "@/store/chatStore";
import { apiCreateOrder, apiGetAllOrders, apiInvokeAgent } from "@/lib/api-requests";
import { useEffect, useRef } from "react";
import Order from "@/components/Order";

export default function ChatPage() {
  const chatStore = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatStore.messages]);

  const loadOrders = async () => {
    try {
      const orders = await apiGetAllOrders();
      chatStore.replaceOrders(orders);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleSendMessage = async () => {
    if (chatStore.inputValue.trim() === "") return;

    const userMessage: MessageType = {
      type: "human",
      content: chatStore.inputValue,
    };

    chatStore.addMessage(userMessage);
    chatStore.setInputValue("");

    chatStore.setRequestLoading(true);

    try {
      const aux = await apiInvokeAgent(chatStore.inputValue);

      const aiMessage: MessageType = {
        type: aux.type,
        content: aux.content,
        response_metadata: aux.response_metadata,
      };

      if (aux.response_metadata?.order_details?.description) {
        await apiCreateOrder(aux.response_metadata.order_details.description);
        const response = await apiGetAllOrders();
        chatStore.replaceOrders(response);
      }

      chatStore.addMessage(aiMessage);
    } catch (error) {
    } finally {
      chatStore.setRequestLoading(false);
    }
  };

  useEffect(() => {
    if (chatStore.messages.length === 0) {
      const botResponse: MessageType = {
        type: "ai",
        content: "Olá! Eu sou o assistente virtual da FastFood.\nOque você gostaria de pedir hoje?",
      };

      setTimeout(() => {
        chatStore.clearMessages();
        chatStore.addMessage(botResponse);
      }, 1000);
    }
  }, [chatStore]);

  return (
    <>
      <Header />
      <section
        className="bg-cover bg-center bg-no-repeat min-h-[calc(100vh-80px)] flex flex-row p-6 space-x-6"
        style={{
          backgroundImage: "url('/images/login-background.jpg')",
          backgroundBlendMode: "overlay",
        }}
      >
        {chatStore.orders.length > 0 && (
          <div className="flex flex-col space-y-3 bg-ct-dark-100 rounded-md p-3 w-[400px] h-[calc(100vh-140px)] overflow-y-auto">
            <p className="text-xl font-semibold text-gray-600">Seus pedidos!</p>
            <p className="text-md text-gray-600">Veja detalhes dos seus pedidos anteriores.</p>
            {chatStore.orders.map((order, index) => (
              <Order key={index} order={order} />
            ))}
          </div>
        )}

        <div className="flex-grow bg-ct-dark-100 rounded-md p-6 flex flex-col h-[calc(100vh-140px)]">
          <div className="flex-1 overflow-y-auto mb-4">
            {chatStore.messages.map((message, index) => (
              <Message key={index} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={chatStore.inputValue}
              onChange={(e) => chatStore.setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
              placeholder="Digite sua mensagem..."
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={chatStore.requestLoading}
              className="bg-ct-primary text-white px-4 py-2 rounded-lg hover:bg-red-400 transition-colors"
            >
              {chatStore.requestLoading ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}