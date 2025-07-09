import React from "react";
import { IoChatbubbles } from "react-icons/io5";

const ChatbotFloat = () => {
  return (
    <button
      className="fixed bottom-6 right-4 z-50 p-4 bg-[#A6C18F] text-white rounded-full shadow-lg hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none"
      aria-label="Open chatbot"
    >
      <IoChatbubbles size={24} />
    </button>
  );
};

export default ChatbotFloat;
