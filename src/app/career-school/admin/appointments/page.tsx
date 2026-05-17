"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Check, X, Clock, Filter } from "lucide-react";

type Status = "Pending" | "Approved" | "Completed" | "Cancelled";
type AppointmentType = "Career Counseling" | "Mock Interview" | "Resume Review" | "Mentorship" | "Academic Guidance";

interface Appointment {
  id: number;
  studentName: string;
  type: AppointmentType;
  faculty: string;
  date: string;
  time: string;
  status: Status;
}

const mockAppointments: Appointment[] = [
  { id: 1, studentName: "Arjun Sharma", type: "Career Counseling", faculty: "Dr. Mehra", date: "2026-05-18", time: "10:00 AM", status: "Pending" },
  { id: 2, studentName: "Priya Mehta", type: "Mock Interview", faculty: "Vikram Singh", date: "2026-05-18", time: "11:30 AM", status: "Pending" },
  { id: 3, studentName: "Karthik Nair", type: "Resume Review", faculty: "Sneha Gupta", date: "2026-05-19", time: "2:00 PM", status: "Approved" },
  { id: 4, studentName: "Divya Patel", type: "Mentorship", faculty: "Rahul Verma", date: "2026-05-17", time: "3:00 PM", status: "Completed" },
  { id: 5, studentName: "Neha Reddy", type: "Academic Guidance", faculty: "Dr. Mehra", date: "2026-05-16", time: "9:00 AM", status: "Cancelled" },
  { id: 6, studentName: "Amit Kumar", type: "Career Counseling", faculty: "Sneha Gupta", date: "2026-05-20", time: "10:30 AM", status: "Pending" },
  { id: 7, studentName: "Rohit Das", type: "Mock Interview", faculty: "Vikram Singh", date: "2026-05-20", time: "1:00 PM", status: "Approved" },
  { id: 8, studentName: "Meera Joshi", type: "Resume Review", faculty: "Rahul Verma", date: "2026-05-21", time: "4:00 PM", status: "Pending" },
];

const statusColors: Record<Status, string> = {
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  Approved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  Completed: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  Cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter] = useState<string>("All");

  const filtered = appointments.filter((a) => {
    const matchStatus = statusFilter === "All" || a.status === statusFilter;
    const matchType = typeFilter === "All" || a.type === typeFilter;
    return matchStatus && matchType;
  });

  const handleApprove = (id: number) => {
    setAppointments(appointments.map((a) => (a.id === id ? { ...a, status: "Approved" as Status } : a)));
  };

  const handleReject = (id: number) => {
    setAppointments(appointments.map((a) => (a.id === id ? { ...a, status: "Cancelled" as Status } : a)));
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Appointment Management</h1>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
          >
            <option value="All">All Types</option>
            <option value="Career Counseling">Career Counseling</option>
            <option value="Mock Interview">Mock Interview</option>
            <option value="Resume Review">Resume Review</option>
            <option value="Mentorship">Mentorship</option>
            <option value="Academic Guidance">Academic Guidance</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Student</th>
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Type</th>
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Faculty</th>
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Date</th>
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Time</th>
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Status</th>
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((apt) => (
                <motion.tr
                  key={apt.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`border-b border-slate-100 dark:border-slate-800 transition-colors ${apt.status === "Pending" ? "bg-amber-50/50 dark:bg-amber-900/10" : "hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
                >
                  <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">{apt.studentName}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{apt.type}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{apt.faculty}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{apt.date}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {apt.time}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[apt.status]}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {apt.status === "Pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(apt.id)}
                          className="flex items-center gap-1 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors"
                        >
                          <Check className="h-3 w-3" /> Approve
                        </button>
                        <button
                          onClick={() => handleReject(apt.id)}
                          className="flex items-center gap-1 rounded-lg bg-red-100 dark:bg-red-900/30 px-2.5 py-1 text-xs font-medium text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                        >
                          <X className="h-3 w-3" /> Reject
                        </button>
                      </div>
                    )}
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
