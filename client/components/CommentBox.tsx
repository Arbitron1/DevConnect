"use client";

import React, { useState } from "react";
import axios from "axios";

export default function CommentBox({ postId }: { postId: string }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return alert("Please login to comment");
    if (!text.trim()) return;

    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}/comments`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setText("");

      window.dispatchEvent(new CustomEvent("comment:added", { detail: { postId, comment: res.data.comment } }));
    } catch (err) {
      console.error("Add comment error", err);
      alert("Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="mt-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        rows={2}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Write a comment"
      />
      <div className="flex justify-end mt-2">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
          aria-disabled={loading}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </form>
  );
}
