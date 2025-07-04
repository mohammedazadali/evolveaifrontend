import React, { useEffect, useRef, useState } from "react";
import { chat } from "../assets/data";
import ChatbotForm from "../components/Chatbot/ChatbotForm";
import ChatMessage from "../components/Chatbot/ChatMessage";
import ChatIcon from "../components/Chatbot/ChatIcon";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import ServiceOptions from "../components/Chatbot/ServiceOptions";

import { FaAngleDown } from "react-icons/fa6";
import { chatBot } from "../constant";

const SERVICES = [
  "Website Design",
  "Web Development",
  "Android App Development",
  "E-Commerce Website",
  "ChatBot & Automation",
  "AI Solution For Business",
  "Billing And Inventory Application",
];

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [collectingInfo, setCollectingInfo] = useState({
    step: 0,
    service: "",
    budget: "",
    timeline: "",
    name: "",
    phone: "",
  });
  const [buttonBottom, setButtonBottom] = useState(24); // default bottom: 6 = 24px

  useEffect(() => {
  if (chatOpen) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }

  // Cleanup when component unmounts
  return () => {
    document.body.classList.remove("overflow-hidden");
  };
}, [chatOpen]);


  console.log(collectingInfo);
  const chatBodyRef = useRef();

  const updateHistory = (text, isHtml = false) => {
    setChatHistory((prev) => [
      ...prev.filter((msg) => msg.text !== "Thinking...."),
      { role: "model", text, isHtml },
    ]);
  };

  const handleServiceSelect = (service) => {
    setCollectingInfo((prev) => ({ ...prev, service, step: 1 }));
    setChatHistory((prev) => [
      ...prev,
      { role: "user", text: service },
      { role: "bot", text: "Awesome! What's your estimated budget?" },
    ]);
  };
  const generateBotResponse = async (history) => {
    const userMessage = history[history.length - 1].text;
    const step = collectingInfo.step; // snapshot at this moment

    switch (step) {
      case 1:
        setCollectingInfo((prev) => ({
          ...prev,
          budget: userMessage,
          step: 2,
        }));
        updateHistory("Thanks! What's your expected timeline to get started?");
        return;
      case 2:
        setCollectingInfo((prev) => ({
          ...prev,
          timeline: userMessage,
          step: 3,
        }));
        updateHistory("May I know your name?");
        return;
      case 3:
        setCollectingInfo((prev) => ({
          ...prev,
          name: userMessage,
          step: 4,
        }));
        updateHistory("Lastly, your phone number please.");
        return;
      case 4:
        setCollectingInfo((prev) => ({
          ...prev,
          phone: userMessage,
          step: 5,
        }));
        updateHistory("✅ Thank you! Our team will reach out to you shortly.");
        return;
    }

    // Service selection handling
    if (collectingInfo.step === 0 && SERVICES.includes(userMessage)) {
      setCollectingInfo((prev) => ({ ...prev, service: userMessage, step: 1 }));
      updateHistory("Great choice! What is your estimated budget?");
      return;
    }

    // // First time: show services
    // if (
    //   userMessage.toLowerCase().includes("interested") ||
    //   userMessage.toLowerCase().includes("services") ||
    //   userMessage.toLowerCase().includes("need")
    // ) {
    //   const serviceButtons = SERVICES.map(
    //     (s) =>
    //       `<button class="px-3 py-1 bg-blue-100 text-sm text-blue-700 rounded-full border border-blue-300 hover:bg-blue-200 transition">${s}</button>`
    //   ).join(" ");
    //   updateHistory(
    //     `Sure! Please select a service below:<div class="flex flex-wrap gap-2 mt-2">${serviceButtons}</div>`,
    //     true
    //   );
    //   return;
    // }

    // Default Gemini AI fallback
    const systemPrompt = {
      role: "user",
      parts: [
        {
          text: chatBot,
        },
      ],
    };

    const historyData = [
      systemPrompt,
      ...history.map(({ role, text }) => ({
        role,
        parts: [{ text }],
      })),
    ];

    try {
      const response = await fetch(import.meta.env.VITE_GEMINI_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: historyData }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error.message || "Something went wrong");

      const botText = data.candidates[0].content.parts[0].text.replace(
        /\*\*(.*?)\*\*/g,
        "$1"
      );
      updateHistory(botText);
    } catch (err) {
      console.error(err);
      updateHistory("Oops! Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    if (chatOpen && chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory, chatOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setButtonBottom(100); // Raise the button
      } else {
        setButtonBottom(24); // Default position
      }
    };

    // Listen to scroll
    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Floating Button */}
      <div
        onClick={() => setChatOpen((prev) => !prev)}
        style={{ bottom: `${buttonBottom}px` }}
        className="fixed  right-3 h-[50px] w-[50px] bg-gradient-to-r from-blue-600 to-blue-500 rounded-full p-2 cursor-pointer flex items-center justify-center shadow-lg z-[9999]"
      >
        {chatOpen ? (
          <span className="text-white text-2xl font-semibold">
            <MdClose />
          </span>
        ) : (
          <img src={chat} alt="Chat" className="h-full w-full object-contain" />
        )}
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {chatOpen && (
          <motion.section
  initial={{ scale: 0, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  exit={{ scale: 0, opacity: 0 }}
  transition={{ duration: 0.3, ease: "easeInOut" }}
  className="fixed sm:bottom-20 bottom-0 sm:right-3 right-0 sm:w-[350px] w-full sm:h-[480px] h-[90%] z-[9999] shadow-2xl sm:rounded-2xl rounded-none overflow-hidden border border-gray-300 bg-white origin-bottom-right"
>

            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 h-[50px] text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-[10px]">
                {" "}
                <img src={chat} alt="Chat" className="w-[32px]" />
                <h1 className="text-xl font-semibold">Brick Assistant</h1>
              </div>
              <span
                onClick={() => setChatOpen((prev) => !prev)}
                className="cursor-pointer"
              >
                <FaAngleDown />
              </span>
            </div>

            {/* Chat Body */}
          <div
  ref={chatBodyRef}
  className="flex flex-col gap-2 px-4 py-3 sm:h-[370px] h-[calc(100%-110px)] overflow-y-auto"
>

              <div className="flex items-start gap-2 justify-start">
                <ChatIcon />
                <div className="bg-gray-100 text-sm text-gray-800 px-3 py-2 rounded-xl rounded-tl-none max-w-[75%]">
                  Hi! I’m your assistant from Brick Web Studio. How can I help
                  you today?
                </div>
              </div>
              {collectingInfo.step === 0 && (
                <ServiceOptions onSelect={handleServiceSelect} />
              )}
              {chatHistory.map((chat, i) => (
                <ChatMessage key={i} chat={chat} />
              ))}
            </div>

            {/* Input */}
          <div className="bg-white border-t border-blue-500 p-2 sm:h-[60px] sticky bottom-0">
  <ChatbotForm
    setChatHistory={setChatHistory}
    generateBotResponse={generateBotResponse}
    chatHistory={chatHistory}
    isDisabled={collectingInfo.step >= 5}
  />
</div>

          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
