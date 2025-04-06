"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "admin@example.com" && password === "admin123") {
      router.push("/adminpanel");  // Yönlendirme
    } else {
      setErrorMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-center py-4 bg-blue-900">
        <h1 className="text-3xl font-bold text-white">Admin Login</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-900">Admin Log In</h2>

          {errorMessage && (
            <div className="bg-red-600 text-white p-2 rounded-md text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 text-black"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 text-black"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Log In
            </button>
          </form>
        </div>
      </main>

      <footer className="text-center text-gray-400 py-4">
        <p>© 2025 Işık University. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "admin@example.com" && password === "admin123") {
      router.push("/adminpanel");  // Yönlendirme
    } else {
      setErrorMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-center py-4 bg-blue-900">
        <h1 className="text-3xl font-bold text-white">Admin Login</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-900">Admin Log In</h2>

          {errorMessage && (
            <div className="bg-red-600 text-white p-2 rounded-md text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 text-black"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 text-black"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Log In
            </button>
          </form>
        </div>
      </main>

      <footer className="text-center text-gray-400 py-4">
        <p>© 2025 Işık University. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
