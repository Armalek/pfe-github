"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Here you would typically call your authentication API
      // For example:
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ username, password }),
      // });

      // if (response.ok) {
      //   navigate('/dashboard');
      // } else {
      //   // Handle error
      // }

      // For demo purposes, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Login attempted with:", { username, password })

      // Redirect to dashboard (in a real app, only after successful authentication)
      navigate("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br  p-4">
    <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]
    ">
      <div className="flex flex-col items-center bg-gradient-to-b from-gray-50 to-white px-8 pt-8 pb-6">
        <img
          className="h-20 w-auto transition-transform duration-300 hover:scale-105"
          src="https://www.algerietelecom.dz/assets/front/img/logo.svg"
          alt="Algérie Telecom"
        />
        <h1 className="mt-6 text-2xl font-bold text-[#1f8034]">Authentification</h1>
        <p className="mt-2 text-center  text-gray-600 text-2xl-sm font-bold">Merci de s&apos;authentifier !</p>
      </div>

      <div className="px-8 pb-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-gray-700">
              Nom d'utilisateur
            </label>
            <div className="relative">
              <input
                id="username"
                type="text"
                placeholder="Entrer votre nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="h-11 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-[#e30613] focus:outline-none focus:ring-2 focus:ring-[#e30613] focus:ring-opacity-20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                placeholder="Entrer votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-[#e30613] focus:outline-none focus:ring-2 focus:ring-[#e30613] focus:ring-opacity-20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
               Confirmer Mot de passe
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                placeholder="Entrer votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-[#e30613] focus:outline-none focus:ring-2 focus:ring-[#e30613] focus:ring-opacity-20"
              />
            </div>
          </div>

          <button
            type="submit"
            className="h-11 w-full rounded-md bg-green-600 font-medium text-white shadow-md transition-all duration-200 hover:bg-[#c00510] focus:outline-none focus:ring-2 focus:ring-[#e30613] focus:ring-opacity-50 active:scale-[0.98]"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Chargement...
              </span>
            ) : (
              "S'authentifier"
            )}
          </button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default LoginForm ;

