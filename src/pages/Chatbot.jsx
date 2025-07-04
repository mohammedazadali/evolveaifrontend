import React from "react";
import { motion } from "framer-motion";
import { Bot, SendHorizonal } from "lucide-react";

const messages = [
  { from: "bot", text: "Hi there! How can I assist you today?", time: "10:00 AM" },
  { from: "user", text: "I need help with a recent order.", time: "10:01 AM" },
  { from: "bot", text: "Sure, please share your order ID.", time: "10:02 AM" },
];

const Chatbot = () => {
  return (
    <div className="h-screen w-full bg-purple-200 flex flex-col">
      <header className="h-16 w-full flex items-center justify-between px-6 bg-white backdrop-blur-sm border-b text-black shadow-sm">
        <h1 className="text-lg md:text-xl font-bold tracking-wide">
          🤖 BrickBot AI Assistant
        </h1>
        <span className="text-sm opacity-70 hidden md:block">🟢 Online</span>
      </header>

     
      <main className="flex-1 w-full max-w-3xl mx-auto flex flex-col p-4 gap-4 overflow-y-auto backdrop-blur-md">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15 }}
            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-5 py-3 max-w-[75%] text-sm md:text-base rounded-2xl backdrop-blur-md shadow-lg ${
                msg.from === "bot"
                  ? "bg-white text-black border border-white/20"
                  : "bg-[#553EEE] text-white"
              }`}
            >
              <p className="leading-snug">{msg.text}</p>
              <span className="text-xs mt-1 block opacity-60 text-right">
                {msg.time}
              </span>
            </div>
          </motion.div>
        ))}
      </main>


      {/* Input */}
      <footer className="w-full  mx-auto p-4 border-t bg-white backdrop-blur-md">
        <form className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-white text-black placeholder-white/60 border border-white/20 rounded-full px-5 py-3 outline-none focus:ring-2 focus:ring-[#553EEE] backdrop-blur-sm"
          />
          <button
            type="submit"
            className="p-3 rounded-full bg-[#553EEE] transition shadow-xl text-white cursor-pointer"
          >
            <SendHorizonal size={20} />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default Chatbot;
