import React, { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password dan konfirmasi password tidak cocok!');
      return;
    }
    if (username && password) {
      setMessage('Registrasi berhasil! (Simulasi)');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
    } else {
      setMessage('Silakan lengkapi semua data.');
    }
  };

  return (
    <div className="flex flex-col space-y-6 w-full">
      <div className="text-left space-y-1">
        <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>
        <p className="text-sm font-medium text-gray-500">Join us to manage your dashboard</p>
      </div>

      <form className="space-y-4" onSubmit={handleRegister}>
        {message && (
          <p className={`text-xs font-medium p-3 rounded-lg border ${message.includes('berhasil') ? 'text-green-600 bg-green-50 border-green-100' : 'text-red-500 bg-red-50 border-red-100'}`}>
            {message}
          </p>
        )}
        
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-gray-700">Username</label>
          <input 
            type="text" 
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#2BB5A0] focus:ring-1 focus:ring-[#2BB5A0] transition-all" 
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-gray-700">Password</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#2BB5A0] focus:ring-1 focus:ring-[#2BB5A0] transition-all" 
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {showPassword ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-gray-700">Confirm Password</label>
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#2BB5A0] focus:ring-1 focus:ring-[#2BB5A0] transition-all" 
          />
        </div>

        <button type="submit" className="w-full bg-[#2BB5A0] text-white font-medium text-sm py-2.5 rounded-lg hover:bg-[#15675C] transition-colors mt-2">
          Register
        </button>

        <div className="text-center mt-4">
          <span className="text-xs text-gray-500 font-medium">Already have an account? </span>
          <a href="/login" className="text-xs text-[#2BB5A0] font-medium hover:underline">Login</a>
        </div>
      </form>
    </div>
  );
};

export default Register;
