"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Save,
  FileText,
  Award,
  BookOpen,
  Lock,
  Eye,
  EyeOff,
  Upload,
  Trash2,
} from "lucide-react";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  year: string;
}

const defaultProfile: ProfileData = {
  name: "Abinash Panda",
  email: "abinash@example.com",
  phone: "+91 98765 43210",
  college: "IIT Kharagpur",
  branch: "Computer Science & Engineering",
  year: "4th Year",
};

const uploadedDocuments = [
  { name: "Resume_v3.pdf", type: "Resume", size: "245 KB", date: "2026-05-10" },
  {
    name: "AWS_Certificate.pdf",
    type: "Certificate",
    size: "1.2 MB",
    date: "2026-04-20",
  },
  {
    name: "Semester_7_Marksheet.pdf",
    type: "Marksheet",
    size: "580 KB",
    date: "2026-03-15",
  },
  {
    name: "Internship_Certificate_Google.pdf",
    type: "Certificate",
    size: "320 KB",
    date: "2026-02-28",
  },
];

export default function ProfilePage() {
  const [profile, setProfile] = useState(defaultProfile);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleChange = (field: keyof ProfileData, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Profile
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Manage your personal information and documents
        </p>
      </motion.div>

      {/* Avatar Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex items-center gap-6"
      >
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
            AP
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-600 hover:bg-indigo-700 rounded-full flex items-center justify-center text-white transition-colors shadow-lg">
            <Camera size={14} />
          </button>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            {profile.name}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {profile.college} | {profile.branch}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Member since January 2026
          </p>
        </div>
      </motion.div>

      {/* Personal Info Form */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
      >
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">
              Full Name
            </label>
            <input
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={profile.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={profile.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">
              Phone
            </label>
            <input
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={profile.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">
              College
            </label>
            <input
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={profile.college}
              onChange={(e) => handleChange("college", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">
              Branch
            </label>
            <input
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={profile.branch}
              onChange={(e) => handleChange("branch", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">
              Year
            </label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={profile.year}
              onChange={(e) => handleChange("year", e.target.value)}
            >
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
            <Save size={14} /> Save Changes
          </button>
        </div>
      </motion.div>

      {/* Document Uploads */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Documents
          </h3>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm transition-colors">
            <Upload size={14} /> Upload
          </button>
        </div>

        <div className="space-y-3">
          {uploadedDocuments.map((doc, i) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  {doc.type === "Resume" ? (
                    <FileText
                      size={16}
                      className="text-indigo-600 dark:text-indigo-400"
                    />
                  ) : doc.type === "Certificate" ? (
                    <Award
                      size={16}
                      className="text-indigo-600 dark:text-indigo-400"
                    />
                  ) : (
                    <BookOpen
                      size={16}
                      className="text-indigo-600 dark:text-indigo-400"
                    />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {doc.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {doc.type} &middot; {doc.size} &middot; {doc.date}
                  </p>
                </div>
              </div>
              <button className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                <Trash2 size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Change Password */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Lock size={18} className="text-slate-600 dark:text-slate-400" />
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Change Password
          </h3>
        </div>
        <div className="space-y-3 max-w-md">
          <div>
            <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Confirm new password"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors mt-2">
            <Lock size={14} /> Update Password
          </button>
        </div>
      </motion.div>
    </div>
  );
}
