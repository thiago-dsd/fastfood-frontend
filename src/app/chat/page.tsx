"use client"; // Necessário para usar hooks e interatividade no Next.js 13+

import Header from "@/components/Header";
import { Message } from "@/lib/types";
import useStore from "@/store";
import useChatStore from "@/store/chatStore"; // Importando a ChatStore
import { useEffect } from "react";




export default function ChatPage() {
  const user = useStore((state) => state.authUser); // Obtém o usuário autenticado do store
  const { messages, inputValue, setInputValue, addMessage } = useChatStore(); // Obtém estados e funções da ChatStore


  // Função para enviar uma nova mensagem
  const handleSendMessage = () => {
    if (inputValue.trim() === "") return; // Ignora mensagens vazias
  
    const newMessage: Message = {
      id: messages.length + 1, // ID único para a mensagem (pode ser substituído por um UUID)
      text: inputValue,
      sender: "user", // Aqui garantimos que o tipo seja "user" ou "ai"
      timestamp: new Date().toLocaleTimeString(), // Horário da mensagem
    };
  
    addMessage(newMessage); // Adiciona a nova mensagem ao estado
    setInputValue(""); // Limpa o input
  
    // Aqui você pode chamar a API para enviar a mensagem ao agente
    // Exemplo: await sendMessageToAgent(inputValue);
  };

  // Efeito para simular uma resposta do agente (apenas para teste)
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === "user") {
      const botResponse: Message = {
        id: messages.length + 1,
        text: "Olá! Eu sou o agente de IA. Como posso ajudar?",
        sender: "ai",
        timestamp: new Date().toLocaleTimeString(),
      };

      setTimeout(() => {
        addMessage(botResponse); // Adiciona a resposta do agente ao estado
      }, 1000); // Simula um atraso de 1 segundo para a resposta
    }
  }, [messages, addMessage]);

  return (
    <>
      <Header />
      <section className="bg-gradient-to-r from-red-400 to-red-300 min-h-screen pt-20">
        <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[calc(100vh-10rem)] p-6 flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                } mb-4`}
              >
                <div
                  className={`rounded-lg p-3 max-w-[70%] ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p>{message.text}</p>
                  <span className="text-xs text-gray-400 block mt-1">
                    {message.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
              placeholder="Digite sua mensagem..."
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Enviar
            </button>
          </div>
        </div>
      </section>
    </>
  );
}