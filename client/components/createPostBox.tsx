"use client";

import { useState } from "react";
import axios from "axios";

export default function CreatePostBox({ onPostCreated }: { onPostCreated: () => void }) {
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    const uploaded: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("image", files[i]);

        const token = localStorage.getItem("token");

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        uploaded.push(res.data.url);
      }

      setImages((prev) => [...prev, ...uploaded]);
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const createPost = async () => {
    if (!content.trim()) return alert("Post content is required");

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts`,
        { content, images },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      setContent("");
      setImages([]);
      onPostCreated();
    } catch (err) {
      console.error("Create post error:", err);
      alert("Failed to create post");
    }
  };

  return (
    <div className="bg-white shadow rounded-xl p-4 mb-6">
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={3}
      />

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-3">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              className="w-full h-32 object-cover rounded-lg"
            />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <label className="cursor-pointer bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">
          {uploading ? "Uploading..." : "Upload Images"}
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>

        <button
          onClick={createPost}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Post
        </button>
      </div>
    </div>
  );
}
