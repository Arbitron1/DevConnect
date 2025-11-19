"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => setNotifications(r.data.notifications || [])).catch(() => {});

    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button aria-label="Notifications" onClick={() => setOpen(s => !s)} className="p-2 rounded hover:bg-gray-100 focus:outline-none">
        🔔
        {notifications.length > 0 && <span className="ml-1 inline-block bg-red-500 text-white text-xs rounded-full px-2">{notifications.length}</span>}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg z-50" role="menu">
          <div className="p-3 border-b font-semibold">Notifications</div>
          <div className="max-h-64 overflow-auto">
            {notifications.length === 0 && <div className="p-3 text-gray-500">No notifications</div>}
            {notifications.map((n, i) => (
              <div key={i} className="p-3 hover:bg-gray-50 border-b">
                <div className="text-sm">{n.text}</div>
                <div className="text-xs text-gray-400">{new Date(n.createdAt).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
