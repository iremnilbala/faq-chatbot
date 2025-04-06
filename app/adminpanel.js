"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Yönlendirme için useRouter'ı doğru kullanıyoruz

export default function AdminPanel() {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter(); // Yönlendirme için useRouter hook'u

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("http://localhost:5000/questions");
        const data = await res.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { question, answer, category };
    try {
      const res = await fetch("http://localhost:5000/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setMessage("Question added successfully!");
        setQuestion("");
        setAnswer("");
        setCategory("");
        const updatedQuestions = await res.json();
        setQuestions(updatedQuestions);
      } else {
        setMessage("Error adding question");
      }
    } catch (error) {
      setMessage("Error adding question");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/questions/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMessage("Question deleted successfully!");
        setQuestions((prev) => prev.filter((q) => q.id !== id));
      } else {
        setMessage("Error deleting question");
      }
    } catch (error) {
      setMessage("Error deleting question");
    }
  };

  const handleUpdate = async (id) => {
    const data = { question, answer, category };
    try {
      const res = await fetch(`http://localhost:5000/questions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setMessage("Question updated successfully!");
        setQuestion("");
        setAnswer("");
        setCategory("");
        const updatedQuestions = await res.json();
        setQuestions(updatedQuestions);
      } else {
        setMessage("Error updating question");
      }
    } catch (error) {
      setMessage("Error updating question");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add New Question</h2>
          <div>
            <label className="block">Question:</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block">Answer:</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block">Category:</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white p-2 rounded-md mt-4">
            Add Question
          </button>
        </div>
      </form>

      <div>
        <h2 className="text-2xl font-bold mb-4">Existing Questions</h2>
        {questions.map((q) => (
          <div key={q.id} className="p-4 border-b border-gray-300 bg-white rounded-md shadow-md mb-4">
            <p className="font-semibold">{q.question}</p>
            <p>{q.answer}</p>
            <p className="text-sm text-gray-500">{q.category}</p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleUpdate(q.id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(q.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
