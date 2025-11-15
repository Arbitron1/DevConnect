import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppSelector } from '../redux/hooks';

export default function FollowButton({ targetId }: { targetId: string }) {
  const token = useAppSelector((s:any) => s.auth?.token);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  }, [targetId]);

  const toggle = async () => {
    if (!token) return alert('Please login');
    setLoading(true);
    try {
      const url = `/api/users/${targetId}/${isFollowing ? 'unfollow' : 'follow'}`;
      const res = await axios.post(url, {}, { headers: { Authorization: `Bearer ${token}` } });
      setIsFollowing(!isFollowing);
    } catch (err:any) {
      console.error(err);
      alert(err?.response?.data?.message || 'Action failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={toggle} disabled={loading}
      className={`px-3 py-1 text-sm rounded border ${isFollowing ? 'bg-gray-100' : 'bg-blue-600 text-white'}`}>
      {isFollowing ? 'Following' : 'Follow'}
    </button>
  );
}
