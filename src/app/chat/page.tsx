"use client";

import Header from "@/components/Header";
import Message from "@/components/Message"; // Importando o componente Message
import { Message as MessageType } from "@/lib/types/message";
import useStore from "@/store";
import useChatStore from "@/store/chatStore";
import { apiCreateOrder, apiInvokeAgent } from "@/lib/api-requests";
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
      const aux = await apiInvokeAgent(chatStore.inputValue);
      const aiMessage: MessageType = {
        type: aux.type,
        content: aux.content,
        response_metadata: aux.response_metadata
      };

      if (aux.response_metadata?.order_details?.description) {
        await apiCreateOrder(aux.response_metadata.order_details.description);
      }

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
      <section className="bg-cover bg-center bg-no-repea min-h-[calc(100vh-80px)] flex flex-row p-6 space-x-6"
      style={{ backgroundImage: "url('/images/login-background.jpg')",
        backgroundBlendMode: "overlay",
      }}>
        <div className="flex flex-col space-y-3 max-w-screen flex-grow bg-ct-dark-100 rounded-md max-w-[400px] p-3"> 
          
        <p className="text-xl font-semibold text-gray-600">Seus pedidos!</p>
                  <p className="text-md text-gray-600">Veja detalhes dos seus pedidos anteriores.</p>
          <div className="flex bg-ct-dark-100 border p-4 rounded-lg space-x-4">
              <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gray-100 border p-2">
                <img src="/icons/food-icon.svg" alt="Ícone de comida" className="w-full h-full object-contain" />
              </div>


              <div className="flex flex-col justify-between w-full">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-md font-semibold text-gray-600">Pedido #12345</p>
                  <p className="text-sm text-gray-400">22/03/2025 - 15:30</p>
                </div>


                <p className="text-sm text-gray-500">
                  Pedido: 1 Pizza Margherita, 1 Coca-Cola. Aguardando o preparo.
                </p>
              </div>
          </div>
        </div>
        <div className="max-w-screen flex-grow bg-ct-dark-100 rounded-md p-6 flex flex-col min-h-[500px]">
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