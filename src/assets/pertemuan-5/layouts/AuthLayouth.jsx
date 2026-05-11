import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2A2A2A] p-4">
      <div className="w-full max-w-5xl h-auto md:h-[650px] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        
        {/* Sisi Kiri (Biru + Ilustrasi) - Disembunyikan di layar kecil */}
        <div className="hidden md:flex md:w-[45%] bg-[#2BB5A0] relative items-center justify-center p-8">
          {/* Header kiri */}
          <div className="absolute top-8 left-8 flex space-x-6 text-white font-semibold text-sm">
            <span className="cursor-pointer border-b-2 border-white pb-1">About</span>
          </div>

          {/* Placeholder Ilustrasi */}
          <div className="w-full max-w-xs aspect-square bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm flex flex-col items-center justify-center text-white/50 relative">
            <svg className="w-24 h-24 mb-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            <p className="text-center text-sm font-medium">Illustration<br/>Placeholder</p>
            {/* Dekorasi kecil */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-white/20 rounded-full blur-md"></div>
            <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          </div>
        </div>

        {/* Sisi Kanan (Form) */}
        <div className="w-full md:w-[55%] bg-white relative">
          {/* Not Registered Link (Desktop) */}
          <div className="absolute top-8 right-8 hidden md:block text-xs font-medium text-gray-500">
            Not registered? <a href="/register" className="text-[#2BB5A0] hover:underline">Create an account</a>
          </div>
          
          {/* Container Form */}
          <div className="w-full h-full flex items-center justify-center p-8 lg:p-16">
            <div className="w-full max-w-sm">
              <Outlet />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;
