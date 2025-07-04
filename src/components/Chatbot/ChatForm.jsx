// components/ChatForm.jsx
import React from "react";
import { SendHorizonal } from "lucide-react";

const ChatForm = ({ onSubmit, inputValue, setInputValue }) => {
  return (
    <form onSubmit={onSubmit} className="flex items-center gap-3">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 bg-white text-black placeholder-white/60 border rounded-full px-5 py-3 outline-none focus:ring-2 border-[#553EEE] backdrop-blur-sm"
      />
      <button
        type="submit"
        className="p-3 rounded-full bg-[#553EEE] transition shadow-xl text-white cursor-pointer"
      >
        <SendHorizonal size={20} />
      </button>
    </form>
  );
};

export default ChatForm;
