"use client";

export default function Navbar() {
  return (
    <div className="bg-white shadow-md p-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-blue-600">DevConnect</h1>

      <button
        className="text-sm bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </div>
  );
}
