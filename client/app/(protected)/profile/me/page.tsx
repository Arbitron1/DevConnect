import React from "react";
import ProfileHeader from "@/components/ProfileHeader";
import PostCard from "@/components/PostCard";
import axios from "axios";

export default async function MyProfilePage() {
  const token = typeof window === "undefined" ? undefined : localStorage.getItem("token");
  return <ClientMyProfile />;
}

function ClientMyProfile() {
  const [user, setUser] = React.useState<any>(null);
  const [posts, setPosts] = React.useState<any[]>([]);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/me`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setUser(res.data.user || res.data);
      setPosts(res.data.posts || []);
    }).catch(() => {});
  }, []);

  if (!user) return <div className="p-4">Loading profile…</div>;

  return (
    <div className="p-4">
      <ProfileHeader user={user} isMe />
      <section className="space-y-4">
        {posts.length === 0 && <div className="text-gray-500">No posts yet.</div>}
        {posts.map(p => <PostCard key={p._1d} post={p} />)}
      </section>
    </div>
  );
}
