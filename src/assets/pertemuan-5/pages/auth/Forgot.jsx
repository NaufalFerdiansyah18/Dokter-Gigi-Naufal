import React, { useState } from 'react';

const Forgot = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = (e) => {
    e.preventDefault();
    if (username) {
      setMessage(`Tautan reset password telah dikirim ke akun/email terkait dengan username: ${username}`);
    } else {
      setMessage('Silakan masukkan username terlebih dahulu.');
    }
  };

  return (
    <div className="flex flex-col space-y-6 w-full">
      <div className="text-left space-y-1">
        <h1 className="text-2xl font-bold text-gray-900">Forgot Password</h1>
        <p className="text-sm font-medium text-gray-500">Enter your username to reset your password</p>
      </div>

      <form className="space-y-4" onSubmit={handleReset}>
        {message && <p className="text-[#2BB5A0] text-xs font-medium bg-[#E8F8F6] p-3 rounded-lg border border-[#2BB5A0]/20">{message}</p>}
        
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-gray-700">Username</label>
          <input 
            type="text" 
            placeholder="Please enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#2BB5A0] focus:ring-1 focus:ring-[#2BB5A0] transition-all" 
          />
        </div>

        <button type="submit" className="w-full bg-[#2BB5A0] text-white font-medium text-sm py-2.5 rounded-lg hover:bg-[#15675C] transition-colors mt-2">
          Reset Password
        </button>

        <div className="text-left mt-2">
          <a href="/login" className="text-xs text-gray-500 font-medium hover:underline hover:text-[#2BB5A0]">← Back to Login</a>
        </div>
      </form>
    </div>
  );
};

export default Forgot;
