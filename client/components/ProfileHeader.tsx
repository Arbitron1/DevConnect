"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import FollowButton from "./FollowButton";

type Props = {
  user: any; 
  isMe?: boolean;
};

export default function ProfileHeader({ user, isMe }: Props) {
  const [editing, setEditing] = useState(false);

  return (
    <header className="bg-white shadow rounded-lg p-4 mb-6">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100">
          {user?.avatar ? (
            <img src={user.avatar} alt={`${user?.name || "User"} avatar`} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">U</div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">{user?.name || "Unknown"}</h1>
              <p className="text-sm text-gray-500">{user?.bio || "No bio yet."}</p>
            </div>

            <div className="flex items-center gap-2">
              {isMe ? (
                <button
                  onClick={() => setEditing((s) => !s)}
                  className="px-3 py-1 border rounded text-sm"
                  aria-label="Edit profile"
                >
                  {editing ? "Close" : "Edit"}
                </button>
              ) : (
                <FollowButton targetId={user?._id} />
              )}
            </div>
          </div>

          <div className="mt-3 text-sm text-gray-600 flex gap-4">
            <div><strong>{user?.followersCount ?? 0}</strong> followers</div>
            <div><strong>{user?.followingCount ?? 0}</strong> following</div>
          </div>
        </div>
      </div>
    </header>
  );
}
