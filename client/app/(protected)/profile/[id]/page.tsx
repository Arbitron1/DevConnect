import React from "react";
import ProfileHeader from "@/components/ProfileHeader";
import PostCard from "@/components/PostCard";
import axios from "axios";

type Props = { params: { id: string } };

export default async function ProfilePage({ params }: Props) {
  const id = params.id;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/${id}`, { cache: "no-store" });
  if (!res.ok) {
    return <div className="p-4">User not found</div>;
  }
  const data = await res.json();
  const { user, posts } = data;

  return (
    <div className="p-4">
      <ProfileHeader user={user} isMe={false} />
      <section className="space-y-4">
        {posts?.length === 0 && <div className="text-gray-500">No posts yet.</div>}
        {posts?.map((p: any) => <PostCard key={p._id} post={p} />)}
      </section>
    </div>
  );
}
