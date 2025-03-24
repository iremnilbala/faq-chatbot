"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [chat, setChat] = useState([
    { from: "bot", text: "Hello! You can type your question below." },
  ]);
  const [questionInput, setQuestionInput] = useState("");

  const handleSend = async () => {
    const trimmedQuestion = questionInput.trim();
    if (!trimmedQuestion) return;

    setChat((prev) => [...prev, { from: "user", text: trimmedQuestion }]);

    try {
      const res = await fetch("http://localhost:5000/questions");
      const data = await res.json();

      if (!Array.isArray(data)) throw new Error("Invalid response from server");

      const found = data.find((q) =>
        q && q.question && q.question.toLowerCase().includes(trimmedQuestion.toLowerCase())
      );

      if (found && found.answer) {
        setChat((prev) => [...prev, { from: "bot", text: found.answer }]);
      } else {
        setChat((prev) => [
          ...prev,
          { from: "bot", text: "This question is not yet in the system." },
        ]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setChat((prev) => [
        ...prev,
        { from: "bot", text: "An error occurred. Please try again." },
      ]);
    }

    setQuestionInput("");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-blue-900 text-white py-4 px-4 flex items-center justify-between shadow">
        {/* Admin Login */}
        <div className="text-sm">
          <Link href="/admin" className="hover:underline text-white font-medium">
            Admin Login
          </Link>
        </div>

        {/* Logo */}
        <div className="flex-1 flex justify-center">
          <div className="text-center">
            <Image
              src="/i.u_logo-white-en.png"
              alt="Işık University Logo"
              width={200}
              height={60}
              className="h-auto w-auto mx-auto"
              priority
            />
            <p className="text-sm mt-2 text-gray-200 tracking-wide">
              Question & Answer Platform
            </p>
          </div>
        </div>

        <div className="w-[80px]">{/* boşluk için */}</div>
      </header>

      {/* Chat area */}
      <main className="flex-grow overflow-y-auto p-4 sm:p-6">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-4 sm:p-6 space-y-4 border border-gray-200">
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[75%] px-4 py-2 rounded-xl whitespace-pre-line ${
                msg.from === "user"
                  ? "bg-blue-500 text-white self-end ml-auto"
                  : "bg-gray-100 text-gray-800 self-start mr-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
      </main>

      {/* Input area */}
      <div className="bg-white border-t border-gray-300 p-4 flex gap-2">
        <input
          type="text"
          className="flex-1 border-2 border-gray-500 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
          placeholder="Type your question..."
          value={questionInput}
          onChange={(e) => setQuestionInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
