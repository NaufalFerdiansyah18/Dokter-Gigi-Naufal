import { useState } from "react";
import { FaComments, FaPaperPlane } from "react-icons/fa";
import Card from "../../components/Card";
import Input from "../../components/Input";
import { Button } from "@/components/ui/button";

export default function ChatAdmin() {
  const [messages, setMessages] = useState([
    { id: 1, author: "admin", text: "Halo! Ada yang bisa dibantu?" },
    { id: 2, author: "user", text: "Saya ingin menambahkan janji kontrol." },
  ]);
  const [draft, setDraft] = useState("");

  const sendMessage = () => {
    if (!draft.trim()) return;
    const newMsg = {
      id: Date.now(),
      author: "admin",
      text: draft.trim(),
    };
    setMessages([...messages, newMsg]);
    setDraft("");
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Chat Admin</h2>
      <Card className="flex-1 flex flex-col p-4 overflow-y-auto mb-4">
        <div className="flex-1 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.author === "admin" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-xl ${{
                  admin: "bg-white text-gray-800 shadow",
                  user: "bg-[#1A7C6E] text-white",
                }[msg.author]}`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </Card>
      <div className="flex gap-2">
        <Input
          placeholder="Ketik pesan..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          leftIcon={<FaComments className="text-gray-400" />}
        />
        <Button onClick={sendMessage}>
          <FaPaperPlane className="mr-1" /> Kirim
        </Button>
      </div>
    </div>
  );
}
