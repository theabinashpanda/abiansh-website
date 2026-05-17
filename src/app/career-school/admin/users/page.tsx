"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  Users,
} from "lucide-react";

type Role = "Student" | "Teacher" | "Mentor" | "Counselor" | "HR Interviewer" | "Admin";

interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  status: "active" | "inactive";
  joinedDate: string;
}

const mockUsers: User[] = [
  { id: 1, name: "Arjun Sharma", email: "arjun@example.com", role: "Student", status: "active", joinedDate: "2025-09-15" },
  { id: 2, name: "Priya Mehta", email: "priya@example.com", role: "Teacher", status: "active", joinedDate: "2025-08-01" },
  { id: 3, name: "Rahul Verma", email: "rahul@example.com", role: "Mentor", status: "active", joinedDate: "2025-07-20" },
  { id: 4, name: "Sneha Gupta", email: "sneha@example.com", role: "Counselor", status: "inactive", joinedDate: "2025-06-10" },
  { id: 5, name: "Vikram Singh", email: "vikram@example.com", role: "HR Interviewer", status: "active", joinedDate: "2025-05-05" },
  { id: 6, name: "Ananya Roy", email: "ananya@example.com", role: "Admin", status: "active", joinedDate: "2025-04-01" },
  { id: 7, name: "Karthik Nair", email: "karthik@example.com", role: "Student", status: "active", joinedDate: "2025-10-01" },
  { id: 8, name: "Divya Patel", email: "divya@example.com", role: "Student", status: "inactive", joinedDate: "2025-09-20" },
  { id: 9, name: "Amit Kumar", email: "amit@example.com", role: "Teacher", status: "active", joinedDate: "2025-03-15" },
  { id: 10, name: "Neha Reddy", email: "neha@example.com", role: "Mentor", status: "active", joinedDate: "2025-11-01" },
];

const roles: Role[] = ["Student", "Teacher", "Mentor", "Counselor", "HR Interviewer", "Admin"];

const roleBadgeColors: Record<Role, string> = {
  Student: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  Teacher: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  Mentor: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  Counselor: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  "HR Interviewer": "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  Admin: "bg-slate-100 text-slate-700 dark:bg-slate-700/30 dark:text-slate-300",
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Student" as Role, password: "" });

  const perPage = 5;

  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "All" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handleAdd = () => {
    if (!newUser.name || !newUser.email) return;
    const user: User = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "active",
      joinedDate: new Date().toISOString().split("T")[0],
    };
    setUsers([user, ...users]);
    setNewUser({ name: "", email: "", role: "Student", password: "" });
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">User Management</h1>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add User
        </button>
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
                <h3 className="font-semibold text-slate-900 dark:text-white">Add New User</h3>
                <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <input
                  placeholder="Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400"
                />
                <input
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400"
                />
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value as Role })}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <input
                  type="password"
                  placeholder="Password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400"
                />
              </div>
              <button
                onClick={handleAdd}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                Create User
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              placeholder="Search users..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-10 pr-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
          >
            <option value="All">All Roles</option>
            {roles.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Name</th>
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Email</th>
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Role</th>
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Status</th>
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Joined</th>
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">{user.name}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${roleBadgeColors[user.role]}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${user.status === "active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{user.joinedDate}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(user.id)} className="p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing {(currentPage - 1) * perPage + 1} to {Math.min(currentPage * perPage, filtered.length)} of {filtered.length} users
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <ChevronLeft className="h-4 w-4 text-slate-600 dark:text-slate-300" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`h-8 w-8 rounded-lg text-sm font-medium transition-colors ${currentPage === i + 1 ? "bg-blue-600 text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <ChevronRight className="h-4 w-4 text-slate-600 dark:text-slate-300" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
