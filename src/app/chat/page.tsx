"use client";

import Header from "@/components/Header";
import Message from "@/components/Message"; // Importando o componente Message
import { Message as MessageType } from "@/lib/types/message";
import useStore from "@/store";
import useChatStore from "@/store/chatStore";
import { apiCreateOrder, apiGetAllOrders, apiInvokeAgent } from "@/lib/api-requests";
import { useEffect, useRef } from "react"; // Adicionando useRef
import Order from "@/components/Order";

export default function ChatPage() {
  const chatStore = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref para o final das mensagens do chat

  // Função para rolar para o final das mensagens do chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Efeito para rolar para o final sempre que as mensagens forem atualizadas
  useEffect(() => {
    scrollToBottom();
  }, [chatStore.messages]);

  const loadOrders = async () => {
    try {
      console.log("Buscando pedidos..."); // Log inicial
      const orders = await apiGetAllOrders(); // Busca os pedidos da API
      console.log("Pedidos recebidos:", orders); // Log dos pedidos recebidos
      chatStore.replaceOrders(orders); // Atualiza a store com os pedidos
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error); // Log de erro
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleSendMessage = async () => {
    console.log("Iniciando handleSendMessage..."); // Log inicial
    if (chatStore.inputValue.trim() === "") return;

    const userMessage: MessageType = {
      type: "human",
      content: chatStore.inputValue,
    };

    console.log("Adicionando mensagem do usuário ao estado:", userMessage); // Log da mensagem do usuário
    chatStore.addMessage(userMessage);
    chatStore.setInputValue("");

    chatStore.setRequestLoading(true);
    console.log("Estado de loading definido como true"); // Log do estado de loading

    try {
      const aux = await apiInvokeAgent(chatStore.inputValue);
      console.log("Resposta da IA recebida:", aux); // Log da resposta da IA

      const aiMessage: MessageType = {
        type: aux.type,
        content: aux.content,
        response_metadata: aux.response_metadata,
      };

      if (aux.response_metadata?.order_details?.description) {
        console.log("Detalhes do pedido encontrados na resposta da IA:", aux.response_metadata.order_details); // Log dos detalhes do pedido
        await apiCreateOrder(aux.response_metadata.order_details.description);
        const response = await apiGetAllOrders();
        console.log("Pedidos recebidos após criação:", response); // Log dos pedidos recebidos
        chatStore.replaceOrders(response);
      }

      console.log("Adicionando mensagem da IA ao estado:", aiMessage); // Log da mensagem da IA
      chatStore.addMessage(aiMessage);
    } catch (error) {
      console.error("Erro em handleSendMessage:", error); // Log de erro
    } finally {
      console.log("Estado de loading definido como false"); // Log do estado de loading
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
        {/* Área de pedidos com barra de rolagem */}
        {chatStore.orders.length > 0 && (
          <div className="flex flex-col space-y-3 bg-ct-dark-100 rounded-md p-3 w-[400px] h-[calc(100vh-140px)] overflow-y-auto">
            <p className="text-xl font-semibold text-gray-600">Seus pedidos!</p>
            <p className="text-md text-gray-600">Veja detalhes dos seus pedidos anteriores.</p>
            {chatStore.orders.map((order, index) => (
              <Order key={index} order={order} />
            ))}
          </div>
        )}

        {/* Área do chat com barra de rolagem */}
        <div className="flex-grow bg-ct-dark-100 rounded-md p-6 flex flex-col h-[calc(100vh-140px)]">
          {/* Contêiner das mensagens com barra de rolagem */}
          <div className="flex-1 overflow-y-auto mb-4">
            {chatStore.messages.map((message, index) => (
              <Message key={index} message={message} />
            ))}
            {/* Elemento invisível para rolar até o final */}
            <div ref={messagesEndRef} />
          </div>

          {/* Área de entrada de mensagens */}
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