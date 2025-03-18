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