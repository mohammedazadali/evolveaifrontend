import React from "react";
import { motion } from "framer-motion";

const parseMessage = (text) => {
  const elements = [];

  const lines = text.split("\n"); // Handle line breaks first
  lines.forEach((line, lineIdx) => {
    const parts = line.split(/(\*\*[^*]+\*\*|\[.+?\]\(.+?\))/g);

    parts.forEach((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        elements.push(
          <strong key={`${lineIdx}-${i}`} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      } else if (part.startsWith("[") && part.includes("](")) {
        const match = /\[(.+?)\]\((.+?)\)/.exec(part);
        if (match) {
          const [, label, url] = match;
          elements.push(
            <a
              key={`${lineIdx}-${i}`}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              {label}
            </a>
          );
        } else {
          elements.push(<span key={`${lineIdx}-${i}`}>{part}</span>);
        }
      } else {
        elements.push(<span key={`${lineIdx}-${i}`}>{part}</span>);
      }
    });

    // Add line break between lines (except the last)
    if (lineIdx !== lines.length - 1) {
      elements.push(<br key={`br-${lineIdx}`} />);
    }
  });

  return elements;
};

const Message = ({ from, text, time, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
      className={`flex ${from === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`px-5 py-3 max-w-[75%] text-sm md:text-base rounded-2xl backdrop-blur-md shadow-lg ${
          from === "bot"
            ? "bg-white text-black border border-white/20"
            : "bg-[#553EEE] text-white"
        }`}
      >
        <p className="leading-snug whitespace-pre-wrap">{parseMessage(text)}</p>
        <span className="text-xs mt-1 block opacity-60 text-right">{time}</span>
      </div>
    </motion.div>
  );
};

export default Message;
