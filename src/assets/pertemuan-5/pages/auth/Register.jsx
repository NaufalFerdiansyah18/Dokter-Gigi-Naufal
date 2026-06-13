import React, { useState } from 'react'
import { BsFillExclamationDiamondFill } from 'react-icons/bs'
import { ImSpinner2 } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'
import { authAPI } from '../../../../services/authAPI'

const Register = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [dataForm, setDataForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setDataForm({ ...dataForm, [name]: value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!dataForm.email.trim()) {
      setError('Email tidak boleh kosong.')
      return
    }

    if (dataForm.password.length < 6) {
      setError('Password minimal 6 karakter.')
      return
    }

    if (dataForm.password !== dataForm.confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok.')
      return
    }

    setLoading(true)

    const { data, error: authError } = await authAPI.register(dataForm.email, dataForm.password)

    setLoading(false)

    if (authError) {
      setError(authError.message || 'Registrasi gagal. Silakan coba lagi.')
      return
    }

    // Supabase by default mengirim email konfirmasi
    // Jika email confirmation dimatikan di Supabase, user langsung bisa login
    if (data.session) {
      // Email confirmation dimatikan — langsung redirect ke login
      setSuccess('Registrasi berhasil! Mengarahkan ke halaman login...')
      setTimeout(() => navigate('/login'), 1500)
    } else {
      // Email confirmation aktif — minta user cek email
      setSuccess(`Registrasi berhasil! Cek inbox email ${dataForm.email} dan klik link konfirmasi, lalu login.`)
    }
  }

  return (
    <div className="flex flex-col space-y-6 w-full">
      <div className="text-left space-y-1">
        <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>
        <p className="text-sm font-medium text-gray-500">Daftar untuk mengakses dashboard</p>
      </div>

      {error && (
        <div className="bg-red-100 p-3 text-sm font-light text-gray-600 rounded-lg flex items-center">
          <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg shrink-0" />
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 p-3 text-sm font-light text-green-700 rounded-lg">
          ✅ {success}
        </div>
      )}

      {loading && (
        <div className="bg-gray-200 p-3 text-sm rounded-lg flex items-center">
          <ImSpinner2 className="me-2 animate-spin shrink-0" />
          Mohon Tunggu...
        </div>
      )}

      <form className="space-y-4" onSubmit={handleRegister}>
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Masukkan email Anda"
            value={dataForm.email}
            onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#2BB5A0] focus:ring-1 focus:ring-[#2BB5A0] transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Buat password (min. 6 karakter)"
              value={dataForm.password}
              onChange={handleChange}
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
          <label className="block text-xs font-medium text-gray-700">Konfirmasi Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Ulangi password"
            value={dataForm.confirmPassword}
            onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#2BB5A0] focus:ring-1 focus:ring-[#2BB5A0] transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#2BB5A0] text-white font-medium text-sm py-2.5 rounded-lg hover:bg-[#15675C] transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          Register
        </button>

        <div className="text-center mt-4">
          <span className="text-xs text-gray-500 font-medium">Sudah punya akun? </span>
          <a href="/login" className="text-xs text-[#2BB5A0] font-medium hover:underline">Login</a>
        </div>
      </form>
    </div>
  )
}

export default Register
