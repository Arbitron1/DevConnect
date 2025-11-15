"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "@/components/PostCard";
import CreatePostBox from "@/components/createPostBox";

export default function FeedPage() {
  const [posts, setPosts] = useState<any[]>([]);

  const fetchPosts = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/posts`)
      .then((res) => {
        const data = res.data;
        const normalized = Array.isArray(data.posts) ? data.posts : [];
        setPosts(normalized);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <CreatePostBox onPostCreated={fetchPosts} />

      <div className="space-y-4">
        {posts.map((post: any) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
