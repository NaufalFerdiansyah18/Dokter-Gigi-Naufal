import axios from "axios"
import React, { useState } from "react"
import { BsFillExclamationDiamondFill } from "react-icons/bs"
import { ImSpinner2 } from "react-icons/im"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [dataForm, setDataForm] = useState({
    username: "",
    password: "",
  })

  const handleChange = (evt) => {
    const { name, value } = evt.target
    setDataForm({
      ...dataForm,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setError(false)

    axios
      .post("https://dummyjson.com/user/login", {
        username: dataForm.username,
        password: dataForm.password,
      })
      .then((response) => {
        if (response.status !== 200) {
          setError(response.data.message)
          return
        }
        navigate("/")
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message || "An error occurred")
        } else {
          setError(err.message || "An unknown error occurred")
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const errorInfo = error ? (
    <div className="bg-red-200 mb-4 p-3 text-sm font-light text-gray-600 rounded-lg flex items-center">
      <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg shrink-0" />
      {error}
    </div>
  ) : null

  const loadingInfo = loading ? (
    <div className="bg-gray-200 mb-4 p-3 text-sm rounded-lg flex items-center">
      <ImSpinner2 className="me-2 animate-spin shrink-0" />
      Mohon Tunggu...
    </div>
  ) : null

  return (
    <div className="flex flex-col space-y-6 w-full">
      <div className="text-left space-y-1">
        <p className="text-sm font-medium text-gray-500">Welcome back 👋</p>
        <h1 className="text-2xl font-bold text-gray-900">Login to your account</h1>
      </div>

      {errorInfo}
      {loadingInfo}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Please enter your username"
            value={dataForm.username}
            onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#2BB5A0] focus:ring-1 focus:ring-[#2BB5A0] transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
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

        <button type="submit" disabled={loading} className="w-full bg-[#2BB5A0] text-white font-medium text-sm py-2.5 rounded-lg hover:bg-[#15675C] transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed">
          Login
        </button>

        <div className="text-left mt-2">
          <a href="/forgot" className="text-xs text-[#2BB5A0] font-medium hover:underline">Forgot Password?</a>
        </div>
      </form>
    </div>
  )
}
