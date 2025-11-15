import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CommentList({ postId }: { postId: string }) {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/posts/${postId}`);
        if (!mounted) return;
        setComments(res.data.comments || []);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [postId]);

  if (loading) return <div>Loading comments…</div>;
  if (comments.length === 0) return <div className="text-sm text-gray-500">No comments yet.</div>;

  return (
    <div className="space-y-2">
      {comments.map(c => (
        <div key={c._id} className="flex items-start gap-3">
          <img src={c.author?.avatar || '/default-avatar.png'} className="w-8 h-8 rounded-full" />
          <div>
            <div className="text-sm font-semibold">{c.author?.name}</div>
            <div className="text-sm text-gray-700">{c.text}</div>
            <div className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleString()}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
