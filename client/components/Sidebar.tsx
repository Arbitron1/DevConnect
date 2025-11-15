"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md p-5 hidden md:block">
      <nav className="space-y-4">
        <Link
          href="/feed"
          className="block text-lg font-medium hover:text-blue-600"
        >
          Home
        </Link>

        <Link
          href="/profile"
          className="block text-lg font-medium hover:text-blue-600"
        >
          Profile
        </Link>

        <Link
          href="/explore"
          className="block text-lg font-medium hover:text-blue-600"
        >
          Explore
        </Link>
      </nav>
    </div>
  );
}
