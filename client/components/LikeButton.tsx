import React, { useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '../redux/hooks';

export default function LikeButton({ postId, initialLikes = 0 } : { postId: string, initialLikes?: number }) {
  const [likes, setLikes] = useState(initialLikes);
  const [loading, setLoading] = useState(false);
  const token = useAppSelector((s:any) => s.auth?.token);

  const toggle = async () => {
    if (!token) return alert('Please login');
    setLoading(true);
    try {
      const res = await axios.post(`/api/posts/${postId}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLikes(res.data.likesCount);
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || 'Like failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={toggle} disabled={loading} className="flex items-center gap-2 text-sm">
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 3.5 4 6 4c1.54 0 3.04.99 3.57 2.36h1.87C11.96 4.99 13.46 4 15 4c2.5 0 4 2 4 4.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
      <span>{likes}</span>
    </button>
  );
}
