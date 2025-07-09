// components/Chatbot.jsx
import React, { useState, useEffect } from "react";
import Message from "./Message";
import ChatForm from "./ChatForm";
import API from "../../utils/api";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
  const chatContainer = document.querySelector("main");
  if (chatContainer) {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
}, [messages]);


  // 🔁 Fetch chat history on load
  useEffect(() => {
    fetchChatHistory();
  }, []);

  const fetchChatHistory = async () => {
    try {
      const res = await axios.get("https://dantrendsapi-50029223867.development.catalystappsail.in/api/chat/history?page=1",{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };

  setMessages((prev) => [...prev, userMsg]);
  setInputValue("");

  try {
    const res = await axios.post("https://dantrendsapi-50029223867.development.catalystappsail.in/api/chat/send", { message: inputValue },{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

    const botReply = {
      from: "bot",
      text: res.data.reply,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // ✅ Delay the bot reply by 1.5 seconds
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
          text: "Sorry, I couldn't process that right now. Please try again.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1500);
  }
};


  return (
    <div className="h-screen w-full bg-purple-200 flex flex-col">
      <header className="h-16 w-full flex items-center justify-between px-6 bg-white backdrop-blur-sm border-b text-black shadow-sm">
        <h1 className="text-lg md:text-xl font-bold tracking-wide">
          🤖 Evolve AI Assistant
        </h1>
        <span className="text-sm opacity-70 hidden md:block">🟢 Online</span>
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto flex flex-col p-4 gap-4 overflow-y-auto backdrop-blur-md chatBody">

        {messages.map((msg) => (
  <Message
    key={msg.id} // instead of idx
    from={msg.from}
    text={msg.text}
    time={msg.time}
  />
))}
      </main>

      <footer className="w-full mx-auto p-4 border-t bg-white backdrop-blur-md">
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
