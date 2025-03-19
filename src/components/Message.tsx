"use client";

import type { Message } from "@/lib/types/message";

interface MessageProps {
  message: Message;
}

export default function Message({ message }: MessageProps) {
  return (
    <div
      className={`flex ${
        message.type === "human" ? "justify-end" : "justify-start"
      } mb-4`}
    >
      <div
        className={`relative flex shrink-0 overflow-hidden rounded-full w-8 h-8`}
      >
        <div className="rounded-full bg-gray-100 border p-1">
          {message.type === "human" ? (
            <img
              src="/icons/user-avatar.svg" 
              alt="User Avatar"
              width={20}
              height={20}
            />
          ) : (
            <img
              src="/icons/ai-avatar.svg" 
              alt="AI Avatar"
              width={20}
              height={20}
            />
          )}
        </div>
      </div>

      <div
        className={`rounded-lg p-3 max-w-[70%] ${
          message.type === "human"
            ? "bg-gray-500 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        <p>{message.content}</p>
        <span className="text-xs text-gray-400 block mt-1">
          {new Date().toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}
