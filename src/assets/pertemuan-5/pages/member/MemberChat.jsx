import { useState } from "react";
import { FaPaperPlane, FaUserMd } from "react-icons/fa";

export default function MemberChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, sender: "admin", text: "Halo! Ada yang bisa kami bantu?", time: "10:30" },
    { id: 2, sender: "user", text: "Saya mau tanya soal jadwal dokter besok", time: "10:32" },
    { id: 3, sender: "admin", text: "Tentu, untuk jadwal besok Dr. Sarah tersedia jam 10:00 dan 14:00. Mau booking?", time: "10:33" },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setMessages([...messages, {
      id: messages.length + 1,
      sender: "user",
      text: message,
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
    }]);
    setMessage("");
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-200px)] flex flex-col">
      <div className="mb-4">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Chat dengan Admin</h1>
        <p className="text-gray-500">Tanya langsung seputar layanan dan jadwal</p>
      </div>

      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#0F766E] text-white flex items-center justify-center">
            <FaUserMd />
          </div>
          <div>
            <p className="font-bold text-gray-900">Admin Klinik</p>
            <p className="text-xs text-green-500">● Online</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] ${msg.sender === "user" ? "bg-[#0F766E] text-white" : "bg-gray-100 text-gray-900"} rounded-2xl px-4 py-3`}>
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-white/70" : "text-gray-500"}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSend} className="p-4 border-t border-gray-100">
          <div className="flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ketik pesan..."
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#0F766E] text-white rounded-xl hover:bg-[#0A5E58] transition-colors flex items-center gap-2 font-semibold"
            >
              <FaPaperPlane />
              Kirim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
