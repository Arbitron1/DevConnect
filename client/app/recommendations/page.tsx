"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function RecommendationsPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/recommendations/users`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers(res.data.users);
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Recommended Developers</h2>

      <div className="space-y-4">
        {users.map((u: any) => (
          <div key={u._id} className="p-4 bg-white rounded shadow">
            <h3 className="text-lg font-semibold">{u.name}</h3>
            <p className="text-gray-600">{u.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
