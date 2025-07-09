// src/components/ChatbotWrapper.jsx
import React, { useState } from "react";
import { IoChatbubbles } from "react-icons/io5";
import { X } from "lucide-react";
import Chatbot from "./Chatbot/Chatbot";

const ChatbotWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 z-50 p-4 bg-[#A6C18F] text-white rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        aria-label="Toggle chatbot"
      >
        {isOpen ? <X size={24} /> : <IoChatbubbles size={24} />}
      </button>

      {/* Chatbot Panel */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-2 w-[95vw] sm:w-[380px] h-[80vh] sm:h-[75vh] bg-white shadow-xl rounded-xl border border-gray-200 z-40 flex flex-col"
        >
          <Chatbot />
        </div>
      )}
    </>
  );
};

export default ChatbotWrapper;
