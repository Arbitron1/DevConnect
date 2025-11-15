import React, { useState } from 'react';
import { Post } from '../types';
import LikeButton from './LikeButton';
import CommentBox from './CommentBox';
import CommentList from './CommentList';
import FollowButton from './FollowButton';
import { Link } from 'react-router-dom';

type Props = { post: Post };

export default function PostCard({ post }: Props) {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="border rounded-md p-4 bg-white shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <Link to={`/profile/${post.author._id}`}>
            <img src={post.author.avatar || '/default-avatar.png'} alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover" />
          </Link>
          <div>
            <Link to={`/profile/${post.author._id}`} className="font-semibold">
              {post.author.name}
            </Link>
            <div className="text-xs text-gray-500">{post.author.bio}</div>
          </div>
        </div>
        <div>
          <FollowButton targetId={post.author._id} />
        </div>
      </div>

      <div className="mb-3 whitespace-pre-wrap">{post.content}</div>

      {post.images && post.images.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mb-3">
          {post.images.map((src: string, i: number) => (
            <img key={i} src={src} alt={`img-${i}`} className="w-full h-40 object-cover rounded" />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center space-x-3">
          <LikeButton postId={post._id} initialLikes={post.likes?.length || 0} />
          <button onClick={() => setShowComments((s) => !s)} className="text-sm text-gray-600">
            {post.commentsCount || 0} comments
          </button>
        </div>
        <div className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</div>
      </div>

      {showComments && (
        <div className="mt-3">
          <CommentList postId={post._id} />
          <CommentBox postId={post._id} />
        </div>
      )}
    </div>
  );
}
