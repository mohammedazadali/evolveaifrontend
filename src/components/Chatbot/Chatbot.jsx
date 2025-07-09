import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import ChatForm from "./ChatForm";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef(null);
  const token = localStorage.getItem("token");

  // Scroll to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Fetch chat history
  useEffect(() => {
    fetchChatHistory();
  }, []);

  const fetchChatHistory = async () => {
    try {
      const res = await axios.get(
        "https://dantrendsapi-50029223867.development.catalystappsail.in/api/chat/history?page=1",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages(res.data);
    } catch (error) {
      console.error("Error loading history:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = {
      from: "user",
      text: inputValue,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    try {
      const res = await axios.post(
        "https://dantrendsapi-50029223867.development.catalystappsail.in/api/chat/send",
        { message: inputValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const botReply = {
        from: "bot",
        text: res.data.reply,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, botReply]);
      }, 1500);
    } catch (err) {
      console.error("Bot error:", err.message);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            from: "bot",
            text:
              "⚠️ Sorry, I couldn't process that right now. Please try again.",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-xl overflow-hidden shadow-xl z-[9999]">
      {/* Header */}
      <header className="bg-[#A6C18F] text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-lg font-bold">🤖 DanTrend Assistant</h1>
        <span className="text-sm opacity-80 hidden sm:inline">🟢 Online</span>
      </header>

      <main
  className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F9FAFB] scrollbar-thin scrollbar-thumb-gray-300"
  style={{ maxHeight: "calc(100% - 130px)" }} 
>
  {messages.map((msg, index) => (
    <Message key={msg.id || index} from={msg.from} text={msg.text} time={msg.time} />
  ))}
  <div ref={chatEndRef} />
</main>

      {/* Input */}
      <footer className="p-3 border-t bg-white">
        <ChatForm
          onSubmit={handleSubmit}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      </footer>
    </div>
  );
};

export default Chatbot;
