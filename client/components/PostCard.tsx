"use client";

import React, { useState } from "react";
import Link from "next/link";
import LikeButton from "./LikeButton";
import CommentList from "./CommentList";
import CommentBox from "./CommentBox";
import axios from "axios";

export default function PostCard({ post }: { post: any }) {
  const [showComments, setShowComments] = useState(false);
  const [localPost, setLocalPost] = useState(post);

  const onDelete = async () => {
    if (!confirm("Delete this post?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLocalPost(null);
    } catch (err) {
      console.error(err);
      alert("Failed to delete post");
    }
  };

  if (!localPost) return null;

  return (
    <article className="border rounded-md p-4 bg-white shadow-sm" aria-label="post">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <Link href={`/profile/${post.author?._id || ""}`}>
            <img src={post.author?.avatar || "/default-avatar.png"} alt={post.author?.name || "User"} className="w-10 h-10 rounded-full object-cover" />
          </Link>
          <div>
            <Link href={`/profile/${post.author?._id || ""}`} className="font-semibold">
              {post.author?.name || "Unknown User"}
            </Link>
            <div className="text-xs text-gray-500">{post.author?.bio}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowComments(s => !s)}
            aria-expanded={showComments}
            className="text-sm text-gray-600"
          >
            {post.commentsCount || 0} comments
          </button>

          {localStorage.getItem("userId") === post.author?._id && (
            <button onClick={onDelete} aria-label="Delete post" className="text-red-500 hover:underline ml-2">
              Delete
            </button>
          )}
        </div>
      </div>

      <div className="mb-3 whitespace-pre-wrap">{post.content}</div>

      {post.images && post.images.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mb-3">
          {post.images.map((src: string, i: number) => (
            <img key={i} src={src} alt={post.content?.slice(0, 50) || "post image"} className="w-full h-40 object-cover rounded" />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center space-x-3">
          <LikeButton postId={post._id} initialLikes={post.likes?.length || 0} />
        </div>
        <div className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</div>
      </div>

      {showComments && (
        <div className="mt-3">
          <CommentList postId={post._id} />
          <CommentBox postId={post._id} />
        </div>
      )}
    </article>
  );
}
