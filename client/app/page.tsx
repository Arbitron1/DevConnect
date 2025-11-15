"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col items-center justify-center text-center px-4">

      <h1 className="text-6xl font-extrabold text-blue-800 drop-shadow-lg">
        DevConnect
      </h1>

      <p className="text-lg text-gray-700 mt-5 max-w-xl">
        <b>A modern platform for developers to connect, share knowledge, collaborate,
        and grow together.</b>
      </p>

     
      <div className="mt-8 flex gap-4">
        <Link
          href="/login"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition shadow-lg"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="bg-white text-blue-600 px-6 py-3 rounded-xl hover:bg-gray-200 transition shadow-lg border"
        >
          Register
        </Link>
      </div>

      <p className="text-gray-600 mt-9 text-md">
        Empowering developers — one connection at a time.
      </p>
    </div>
  );
}
