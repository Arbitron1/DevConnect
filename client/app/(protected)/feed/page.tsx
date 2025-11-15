"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "@/components/PostCard";

export default function FeedPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/posts`)
      .then((res) => {
        const data = res.data;

        const normalizedPosts =
          Array.isArray(data)
            ? data
            : Array.isArray(data.posts)
            ? data.posts
            : Array.isArray(data.data)
            ? data.data
            : [];
        console.log("Received posts:", normalizedPosts);
        console.log("Fetched posts:", normalizedPosts);

        setPosts(normalizedPosts);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);
  

  if (loading) {
    return <p className="text-gray-500">Loading feed…</p>;
  }

  if (posts.length === 0) {
    return <p className="text-gray-500">No posts yet…</p>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post: any) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
  
}
