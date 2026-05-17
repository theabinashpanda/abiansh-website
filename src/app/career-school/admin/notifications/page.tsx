"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Send, Clock } from "lucide-react";

interface Notification {
  id: number;
  title: string;
  message: string;
  recipientType: string;
  sentAt: string;
  status: "sent" | "failed";
}

const mockNotifications: Notification[] = [
  { id: 1, title: "Placement Drive Announcement", message: "TCS is conducting campus placement on May 25th. Register by May 20th.", recipientType: "All Students", sentAt: "2026-05-15 10:00 AM", status: "sent" },
  { id: 2, title: "Schedule Change", message: "DSA lecture rescheduled to 3 PM on Thursday.", recipientType: "Student", sentAt: "2026-05-14 2:30 PM", status: "sent" },
  { id: 3, title: "New Material Available", message: "Resume writing guide has been uploaded. Check materials section.", recipientType: "All Students", sentAt: "2026-05-12 9:00 AM", status: "sent" },
  { id: 4, title: "Mock Interview Reminder", message: "Your mock interview is scheduled for tomorrow at 11 AM.", recipientType: "Specific User", sentAt: "2026-05-11 4:00 PM", status: "sent" },
  { id: 5, title: "Results Published", message: "Aptitude test results are now available.", recipientType: "All Students", sentAt: "2026-05-10 11:00 AM", status: "sent" },
  { id: 6, title: "System Maintenance", message: "Platform will be under maintenance on Sunday 2-4 AM.", recipientType: "All Students", sentAt: "2026-05-08 6:00 PM", status: "failed" },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [form, setForm] = useState({ title: "", message: "", recipientType: "All Students" });

  const handleSend = () => {
    if (!form.title || !form.message) return;
    const notification: Notification = {
      id: Date.now(),
      title: form.title,
      message: form.message,
      recipientType: form.recipientType,
      sentAt: new Date().toLocaleString(),
      status: "sent",
    };
    setNotifications([notification, ...notifications]);
    setForm({ title: "", message: "", recipientType: "All Students" });
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <Bell className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Send Notifications</h1>
      </motion.div>

      {/* Send Form */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4"
      >
        <h3 className="font-semibold text-slate-900 dark:text-white">Compose Notification</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Notification Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400"
          />
          <select
            value={form.recipientType}
            onChange={(e) => setForm({ ...form, recipientType: e.target.value })}
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
          >
            <option value="All Students">All Students</option>
            <option value="Student">Students Only</option>
            <option value="Teacher">Teachers Only</option>
            <option value="Mentor">Mentors Only</option>
            <option value="Counselor">Counselors Only</option>
            <option value="Specific User">Specific User</option>
          </select>
        </div>
        <textarea
          placeholder="Notification message..."
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 resize-none"
        />
        <button
          onClick={handleSend}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          <Send className="h-4 w-4" /> Send Notification
        </button>
      </motion.div>

      {/* History */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
      >
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Notification History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Title</th>
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Message</th>
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Recipients</th>
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Sent At</th>
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notif) => (
                <motion.tr
                  key={notif.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">{notif.title}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300 max-w-[200px] truncate">{notif.message}</td>
                  <td className="py-3 px-4">
                    <span className="inline-block rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:text-slate-300">
                      {notif.recipientType}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {notif.sentAt}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${notif.status === "sent" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"}`}>
                      {notif.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
