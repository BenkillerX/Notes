import React, { useState } from 'react'
import api from '../config/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useAuth } from '../hooks/AuthContext';
import { AxiosError } from 'axios';

const Login = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const navigate = useNavigate()
  const {login} = useAuth()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }
    setError(null)
    try {
    const res = await api.post(`/auth/login`, {email, password})
      const token = res.data.token
      login(token)
      toast.success(res.data.message)
      setEmail("")
      setPassword("")
      navigate("/")
    } catch (err) {
      const error = err as AxiosError<{message:string}>;
      // Axios puts server response under err.response
      const serverMessage = error.response?.data?.message || "Login failed"
      toast.error(serverMessage)
      console.error(serverMessage)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        
        {error && (
          <div className="mb-4 text-red-600 text-sm font-medium">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

             <div>
                     <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                       Password
                     </label>
                     
                    <div className="relative">
                 <input
                     id="password"
                     type={showPassword ? "text" : "password"}
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     placeholder="Enter your password"
                 />
                 <button
                     type="button"
                     onClick={() => setShowPassword(!showPassword)}
                     className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                 >
                     {showPassword ? (
                     <EyeSlashIcon className="h-5 w-5" />
                     ) : (
                     <EyeIcon className="h-5 w-5" />
                     )}
                 </button>
                 </div>
         
         
                   </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md 
                       hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
