"use client";

import Header from "@/components/Header";
import Message from "@/components/Message"; // Importando o componente Message
import { Message as MessageType } from "@/lib/types/message";
import useStore from "@/store";
import useChatStore from "@/store/chatStore";
import { apiInvokeAgent } from "@/lib/api-requests";
import { useEffect, useState } from "react";

export default function ChatPage() {
  const chatStore = useChatStore();

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
      const agentResponse = await apiInvokeAgent(chatStore.inputValue);
      const aiMessage: MessageType = {
        type: "ai",
        content: agentResponse.content,
      };
      console.log("Resposta da IA:", aiMessage);
      chatStore.addMessage(aiMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      chatStore.setRequestLoading(false);
    }
  };

  useEffect(() => {
    if (chatStore.messages.length === 0) {
      const botResponse: MessageType = {
        type: "ai",
        content: "Olá! Eu sou o agente de IA. Como posso ajudar?",
      };

      setTimeout(() => {
        chatStore.addMessage(botResponse);
      }, 1000);
    }
  }, [chatStore]);

  return (
    <>
      <Header />
      <section className="bg-gradient-to-r from-red-400 to-red-300 min-h-[calc(100vh-80px)]  flex flex-col">
        <div className="max-w-screen flex-grow bg-ct-dark-100 rounded-md m-6 p-6 flex flex-col min-h-[500px]">
          <div className="flex-1 overflow-y-auto mb-4">
            {chatStore.messages.map((message, index) => (
              <Message key={index} message={message} />
            ))}
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