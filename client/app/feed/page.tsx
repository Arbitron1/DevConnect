"use client";
import { useState } from "react";

export default function Feed() {
  const [posts, setPosts] = useState<string[]>([]);
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setPosts([content, ...posts]);
    setContent("");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow mb-6"
      >
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Post
        </button>
      </form>

      {posts.map((post, index) => (
        <div
          key={index}
          className="bg-white p-4 mb-4 rounded-lg shadow hover:shadow-md transition"
        >
          <p className="text-gray-700">{post}</p>
        </div>
      ))}
    </div>
  );
}
