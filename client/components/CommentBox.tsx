import React, { useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '../redux/hooks';
import { useAppDispatch } from '../redux/hooks';
import { addCommentToPost } from '../redux/slices/postsSlice';

export default function CommentBox({ postId }: { postId: string }) {
  const [text, setText] = useState('');
  const token = useAppSelector((s:any) => s.auth?.token);
  const dispatch = useAppDispatch();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return alert('Please login');
    if (!text.trim()) return;

    try {
      const res = await axios.post(`/api/posts/${postId}/comments`, { text }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch(addCommentToPost({ postId, comment: res.data.comment, commentsCount: res.data.commentsCount }));
      setText('');
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || 'Comment failed');
    }
  };

  return (
    <form onSubmit={submit} className="mt-2 flex items-start gap-2">
      <input
        value={text}
        onChange={(e)=>setText(e.target.value)}
        placeholder="Write a comment..."
        className="flex-1 border rounded px-3 py-2"
      />
      <button className="px-3 py-2 bg-blue-600 text-white rounded">Send</button>
    </form>
  );
}
