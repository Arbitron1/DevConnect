"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <Link href="/" className="text-2xl font-bold text-blue-400">
        DevConnect 🚀
      </Link>
      <div className="space-x-4">
        <Link href="/feed" className="hover:text-blue-300 transition">
          Feed
        </Link>
        <Link href="/login" className="hover:text-green-300 transition">
          Login
        </Link>
        <Link href="/register" className="hover:text-purple-300 transition">
          Register
        </Link>
      </div>
    </nav>
  );
}
