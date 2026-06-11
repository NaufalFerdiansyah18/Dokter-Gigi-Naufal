import { useState, useRef, useEffect } from "react";
import { useClinic } from "../../context/ClinicContext";
import { FaPaperPlane, FaCheckDouble } from "react-icons/fa";

const ACTIVE_PATIENT_ID = "PS-001";

export default function GuestChat() {
  const { patients, setPatients } = useClinic();
  const patient = patients.find((p) => p.id === ACTIVE_PATIENT_ID);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const messages = patient?.chatHistory || [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    const newMsg = {
      id: messages.length + 1,
      text,
      sender: "patient",
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      tanggal: new Date().toISOString().split("T")[0],
    };

    setPatients(patients.map((p) =>
      p.id === ACTIVE_PATIENT_ID
        ? { ...p, chatHistory: [...(p.chatHistory || []), newMsg], lastChatMessage: text, lastChatTime: newMsg.time, unreadCount: 0 }
        : p
    ));
    setInput("");
  };

  if (!patient) return null;

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">

      {/* Chat header */}
      <div className="px-4 py-3 bg-white border-b border-gray-100 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1A9E96] to-[#0F766E] flex items-center justify-center text-white font-bold text-sm shrink-0">
          N
        </div>
        <div>
          <p className="text-sm font-bold text-gray-800">Admin Nopall Clinic</p>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <p className="text-[11px] text-gray-400">Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">💬</p>
            <p className="text-sm text-gray-400 font-medium">Belum ada pesan</p>
            <p className="text-xs text-gray-300 mt-1">Mulai percakapan dengan admin klinik</p>
          </div>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "patient" ? "justify-end" : "justify-start"}`}>
            {msg.sender === "admin" && (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1A9E96] to-[#0F766E] flex items-center justify-center text-white font-bold text-[10px] mr-2 shrink-0 mt-auto">
                N
              </div>
            )}
            <div
              className={`max-w-[72%] px-4 py-2.5 rounded-2xl text-sm ${
                msg.sender === "patient"
                  ? "bg-[#0F766E] text-white rounded-br-sm"
                  : "bg-white text-gray-800 border border-gray-100 rounded-bl-sm shadow-sm"
              }`}
            >
              <p className="leading-relaxed">{msg.text}</p>
              <div className={`flex items-center gap-1 justify-end mt-1 text-[10px] ${msg.sender === "patient" ? "text-white/60" : "text-gray-400"}`}>
                <span>{msg.time}</span>
                {msg.sender === "patient" && <FaCheckDouble className="text-[9px]" />}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 bg-white border-t border-gray-100 flex gap-3 items-end">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ketik pesan..."
          className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E]"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="w-10 h-10 rounded-xl bg-[#0F766E] hover:bg-[#0A5E58] disabled:bg-gray-200 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors shrink-0"
        >
          <FaPaperPlane className="text-sm" />
        </button>
      </div>
    </div>
  );
}
