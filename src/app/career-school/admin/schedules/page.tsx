"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, X, CalendarDays, List, LayoutGrid } from "lucide-react";

type ScheduleType = "Lecture" | "Workshop" | "Mock Interview" | "Counseling" | "Webinar";

interface ScheduleItem {
  id: number;
  title: string;
  type: ScheduleType;
  date: string;
  time: string;
  instructor: string;
  dayOfWeek: number;
}

const typeColors: Record<ScheduleType, string> = {
  Lecture: "bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-300",
  Workshop: "bg-green-100 border-green-300 text-green-800 dark:bg-green-900/30 dark:border-green-700 dark:text-green-300",
  "Mock Interview": "bg-purple-100 border-purple-300 text-purple-800 dark:bg-purple-900/30 dark:border-purple-700 dark:text-purple-300",
  Counseling: "bg-amber-100 border-amber-300 text-amber-800 dark:bg-amber-900/30 dark:border-amber-700 dark:text-amber-300",
  Webinar: "bg-rose-100 border-rose-300 text-rose-800 dark:bg-rose-900/30 dark:border-rose-700 dark:text-rose-300",
};

const mockSchedules: ScheduleItem[] = [
  { id: 1, title: "DSA Fundamentals", type: "Lecture", date: "2026-05-18", time: "10:00 AM", instructor: "Dr. Mehra", dayOfWeek: 1 },
  { id: 2, title: "Resume Building Workshop", type: "Workshop", date: "2026-05-18", time: "2:00 PM", instructor: "Sneha Gupta", dayOfWeek: 1 },
  { id: 3, title: "HR Interview Practice", type: "Mock Interview", date: "2026-05-19", time: "11:00 AM", instructor: "Vikram Singh", dayOfWeek: 2 },
  { id: 4, title: "Career Guidance Session", type: "Counseling", date: "2026-05-19", time: "3:00 PM", instructor: "Rahul Verma", dayOfWeek: 2 },
  { id: 5, title: "Industry Trends Talk", type: "Webinar", date: "2026-05-20", time: "10:00 AM", instructor: "External Speaker", dayOfWeek: 3 },
  { id: 6, title: "System Design Basics", type: "Lecture", date: "2026-05-20", time: "2:00 PM", instructor: "Dr. Mehra", dayOfWeek: 3 },
  { id: 7, title: "GD Practice", type: "Workshop", date: "2026-05-21", time: "11:00 AM", instructor: "Priya Mehta", dayOfWeek: 4 },
  { id: 8, title: "Technical Interview Prep", type: "Mock Interview", date: "2026-05-22", time: "10:00 AM", instructor: "Amit Kumar", dayOfWeek: 5 },
];

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function SchedulesPage() {
  const [schedules, setSchedules] = useState<ScheduleItem[]>(mockSchedules);
  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const [newSchedule, setNewSchedule] = useState({ title: "", type: "Lecture" as ScheduleType, date: "", time: "", instructor: "" });

  const handleCreate = () => {
    if (!newSchedule.title || !newSchedule.date) return;
    const dateObj = new Date(newSchedule.date);
    const day = dateObj.getDay();
    const schedule: ScheduleItem = {
      id: Date.now(),
      ...newSchedule,
      dayOfWeek: day === 0 ? 7 : day,
    };
    setSchedules([...schedules, schedule]);
    setNewSchedule({ title: "", type: "Lecture", date: "", time: "", instructor: "" });
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    setSchedules(schedules.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CalendarDays className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Schedule Management</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            <button
              onClick={() => setView("calendar")}
              className={`p-2 ${view === "calendar" ? "bg-blue-600 text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"} transition-colors`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 ${view === "list" ? "bg-blue-600 text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"} transition-colors`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" /> Create Schedule
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 dark:text-white">Create New Schedule</h3>
                <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <input
                  placeholder="Title"
                  value={newSchedule.title}
                  onChange={(e) => setNewSchedule({ ...newSchedule, title: e.target.value })}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400"
                />
                <select
                  value={newSchedule.type}
                  onChange={(e) => setNewSchedule({ ...newSchedule, type: e.target.value as ScheduleType })}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
                >
                  <option value="Lecture">Lecture</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Mock Interview">Mock Interview</option>
                  <option value="Counseling">Counseling</option>
                  <option value="Webinar">Webinar</option>
                </select>
                <input
                  type="date"
                  value={newSchedule.date}
                  onChange={(e) => setNewSchedule({ ...newSchedule, date: e.target.value })}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
                />
                <input
                  placeholder="Time (e.g. 10:00 AM)"
                  value={newSchedule.time}
                  onChange={(e) => setNewSchedule({ ...newSchedule, time: e.target.value })}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400"
                />
                <input
                  placeholder="Instructor"
                  value={newSchedule.instructor}
                  onChange={(e) => setNewSchedule({ ...newSchedule, instructor: e.target.value })}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400"
                />
              </div>
              <button
                onClick={handleCreate}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                Create
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {view === "calendar" ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <div className="grid grid-cols-5 gap-4">
            {daysOfWeek.map((day, idx) => (
              <div key={day}>
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3 text-center">{day}</h3>
                <div className="space-y-2 min-h-[200px]">
                  {schedules
                    .filter((s) => s.dayOfWeek === idx + 1)
                    .map((s) => (
                      <motion.div
                        key={s.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`rounded-lg border p-3 text-xs ${typeColors[s.type]}`}
                      >
                        <p className="font-medium truncate">{s.title}</p>
                        <p className="mt-1 opacity-75">{s.time}</p>
                        <p className="opacity-75">{s.instructor}</p>
                      </motion.div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Title</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Time</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Instructor</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((s) => (
                  <tr key={s.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">{s.title}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${typeColors[s.type]}`}>
                        {s.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{s.date}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{s.time}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{s.instructor}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(s.id)} className="p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}
