import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="text-5xl font-bold text-blue-600 mb-4">Welcome to DevConnect 🚀</h1>
      <p className="text-gray-600 max-w-md mb-8">
        A platform where developers connect, share posts, and grow together.
      </p>
      <div className="space-x-4">
        <Link href="/register" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
          Get Started
        </Link>
        <Link href="/login" className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700">
          Login
        </Link>
      </div>
    </div>
  );
}
