import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, CheckCheck, Clock } from 'lucide-react';

// Mock data pasien dengan riwayat chat
const mockPatients = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=0D8ABC&color=fff',
    status: 'online',
    lastMessage: 'Terima kasih dokter!',
    timestamp: '10:30',
    unreadCount: 2,
    messages: [
      { id: 1, text: 'Halo dok, saya mau tanya jadwal kontrol saya', sender: 'patient', time: '10:25' },
      { id: 2, text: 'Halo Sarah, jadwal kontrol Anda adalah Jumat besok jam 14:00', sender: 'admin', time: '10:28' },
      { id: 3, text: 'Terima kasih dokter!', sender: 'patient', time: '10:30' }
    ]
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=7C3AED&color=fff',
    status: 'online',
    lastMessage: 'Apakah saya perlu puasa sebelum cabut gigi?',
    timestamp: '09:15',
    unreadCount: 5,
    messages: [
      { id: 1, text: 'Pagi dok, saya ada jadwal cabut gigi besok', sender: 'patient', time: '09:10' },
      { id: 2, text: 'Apakah saya perlu puasa sebelum cabut gigi?', sender: 'patient', time: '09:15' }
    ]
  },
  {
    id: 3,
    name: 'Jessica Martinez',
    avatar: 'https://ui-avatars.com/api/?name=Jessica+Martinez&background=EC4899&color=fff',
    status: 'offline',
    lastMessage: 'Baik, saya akan datang tepat waktu',
    timestamp: 'Yesterday',
    unreadCount: 0,
    messages: [
      { id: 1, text: 'Dok, untuk scaling gigi berapa lama prosesnya?', sender: 'patient', time: 'Yesterday 15:20' },
      { id: 2, text: 'Proses scaling sekitar 30-45 menit Jessica', sender: 'admin', time: 'Yesterday 15:25' },
      { id: 3, text: 'Baik, saya akan datang tepat waktu', sender: 'patient', time: 'Yesterday 15:30' }
    ]
  },
  {
    id: 4,
    name: 'David Brown',
    avatar: 'https://ui-avatars.com/api/?name=David+Brown&background=F59E0B&color=fff',
    status: 'offline',
    lastMessage: 'Oke siap dok',
    timestamp: '2 days ago',
    unreadCount: 0,
    messages: [
      { id: 1, text: 'Dok gigi saya masih sakit setelah tambal', sender: 'patient', time: '2 days ago 11:00' },
      { id: 2, text: 'Itu normal David, akan hilang dalam 1-2 hari. Jika masih sakit, segera hubungi kami', sender: 'admin', time: '2 days ago 11:05' },
      { id: 3, text: 'Oke siap dok', sender: 'patient', time: '2 days ago 11:10' }
    ]
  },
  {
    id: 5,
    name: 'Amanda Lee',
    avatar: 'https://ui-avatars.com/api/?name=Amanda+Lee&background=10B981&color=fff',
    status: 'online',
    lastMessage: 'Perlu bawa apa saja dok?',
    timestamp: '08:45',
    unreadCount: 1,
    messages: [
      { id: 1, text: 'Perlu bawa apa saja dok?', sender: 'patient', time: '08:45' }
    ]
  }
];

// Quick replies templates
const quickReplies = [
  {
    id: 1,
    label: 'Konfirmasi Kehadiran',
    text: 'Terima kasih atas konfirmasinya. Mohon datang 10 menit sebelum jadwal untuk proses administrasi.'
  },
  {
    id: 2,
    label: 'Instruksi Pasca-Cabut Gigi',
    text: 'Setelah cabut gigi: 1) Gigit kapas 30-45 menit, 2) Jangan berkumur 24 jam, 3) Hindari makanan panas, 4) Minum obat sesuai resep. Jika berdarah terus, segera hubungi kami.'
  },
  {
    id: 3,
    label: 'Jadwal Kontrol Berikutnya',
    text: 'Jadwal kontrol berikutnya Anda adalah [tanggal] pukul [waktu]. Mohon konfirmasi kehadiran H-1. Terima kasih.'
  }
];

const ChatAdmin = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(mockPatients[0]);
  const [patients, setPatients] = useState(mockPatients);
  const [messageInput, setMessageInput] = useState('');
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const chatBodyRef = useRef(null);

  // Filter pasien berdasarkan search
  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Auto scroll ke bawah saat messages berubah
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [selectedPatient?.messages]);

  // Handle kirim pesan
  const handleSendMessage = () => {
    if (messageInput.trim() === '') return;

    const newMessage = {
      id: selectedPatient.messages.length + 1,
      text: messageInput,
      sender: 'admin',
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setPatients(patients.map(patient => {
      if (patient.id === selectedPatient.id) {
        return {
          ...patient,
          messages: [...patient.messages, newMessage],
          lastMessage: messageInput,
          timestamp: 'Just now'
        };
      }
      return patient;
    }));

    setSelectedPatient({
      ...selectedPatient,
      messages: [...selectedPatient.messages, newMessage]
    });

    setMessageInput('');
    setShowQuickReplies(false);
  };

  // Handle quick reply
  const handleQuickReply = (text) => {
    setMessageInput(text);
    setShowQuickReplies(false);
  };

  // Handle pilih pasien
  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    // Reset unread count
    setPatients(patients.map(p => 
      p.id === patient.id ? { ...p, unreadCount: 0 } : p
    ));
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-gray-50 -m-4 mt-4 rounded-xl overflow-hidden shadow-sm border border-gray-200">
      {/* Left Sidebar - Patient List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari pasien..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E]"
            />
          </div>
        </div>

        {/* Patient List */}
        <div className="flex-1 overflow-y-auto">
          {filteredPatients.map((patient) => (
            <div
              key={patient.id}
              onClick={() => handleSelectPatient(patient)}
              className={`flex items-start gap-3 p-4 cursor-pointer transition-colors border-b border-gray-100 hover:bg-gray-50 ${
                selectedPatient?.id === patient.id ? 'bg-[#E8F8F6] border-l-4 border-l-[#0F766E]' : ''
              }`}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <img
                  src={patient.avatar}
                  alt={patient.name}
                  className="w-12 h-12 rounded-full"
                />
                <span
                  className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                    patient.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {patient.name}
                  </h3>
                  <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                    {patient.timestamp}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {patient.lastMessage}
                </p>
              </div>

              {/* Unread Badge */}
              {patient.unreadCount > 0 && (
                <div className="flex-shrink-0 bg-[#0F766E] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  {patient.unreadCount}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Chat Window */}
      <div className="flex-1 flex flex-col">
        {selectedPatient ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
              <img
                src={selectedPatient.avatar}
                alt={selectedPatient.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <h2 className="font-semibold text-gray-900">
                  {selectedPatient.name}
                </h2>
                <div className="flex items-center gap-2 text-sm">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      selectedPatient.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  />
                  <span className="text-gray-600">
                    {selectedPatient.status === 'online' ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
            </div>

            {/* Chat Body */}
            <div
              ref={chatBodyRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50"
            >
              {selectedPatient.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-md lg:max-w-lg xl:max-w-xl px-4 py-2.5 rounded-2xl ${
                      message.sender === 'admin'
                        ? 'bg-[#0F766E] text-white rounded-br-sm'
                        : 'bg-white text-gray-900 border border-gray-200 rounded-bl-sm shadow-sm'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {message.text}
                    </p>
                    <div
                      className={`flex items-center gap-1 justify-end mt-1 text-xs ${
                        message.sender === 'admin' ? 'text-[#A7F3D0]' : 'text-gray-500'
                      }`}
                    >
                      <span>{message.time}</span>
                      {message.sender === 'admin' && (
                        <CheckCheck className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Replies */}
            {showQuickReplies && (
              <div className="bg-white border-t border-gray-200 px-6 py-3">
                <p className="text-xs text-gray-600 mb-2 font-medium">Quick Replies:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply.id}
                      onClick={() => handleQuickReply(reply.text)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors border border-gray-300"
                    >
                      {reply.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Input */}
            <div className="bg-white border-t border-gray-200 px-6 py-4">
              <div className="flex gap-3">
                <button
                  onClick={() => setShowQuickReplies(!showQuickReplies)}
                  className="flex-shrink-0 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
                >
                  Quick
                </button>
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    placeholder="Ketik pesan..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E]"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={messageInput.trim() === ''}
                    className="flex-shrink-0 bg-[#0F766E] hover:bg-[#0A5E58] disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    <span className="hidden sm:inline">Kirim</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Empty State
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Pilih Pasien
              </h3>
              <p className="text-gray-600">
                Pilih pasien dari daftar untuk memulai percakapan
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatAdmin;
