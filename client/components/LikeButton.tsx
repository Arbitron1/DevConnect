"use client";

import { useState } from "react";
import axios from "axios";

export default function LikeButton({
  postId,
  initialLikes = 0,
}: {
  postId: string;
  initialLikes: number;
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return alert("Please login");

    try {
      setLoading(true);
      const res = await axios.post(
  `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}/like`,
  {},
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);


      setLikes(res.data.likesCount);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className="text-blue-600 hover:underline"
    >
      ❤️ {likes}
    </button>
  );
}
