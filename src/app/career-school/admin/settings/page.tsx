"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Upload, Save, AlertTriangle } from "lucide-react";

export default function SystemSettingsPage() {
  const [orgName, setOrgName] = useState("Career School");
  const [primaryColor, setPrimaryColor] = useState("#3b82f6");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState({
    newUser: true,
    appointment: true,
    results: true,
    system: false,
  });

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <Settings className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">System Settings</h1>
      </motion.div>

      {/* Organization */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-5"
      >
        <h3 className="font-semibold text-slate-900 dark:text-white">Organization</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Organization Name</label>
            <input
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Logo</label>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <span className="text-lg font-bold text-slate-400">CS</span>
              </div>
              <label className="flex items-center gap-2 cursor-pointer rounded-lg border border-dashed border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-500 dark:text-slate-400 hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
                <Upload className="h-4 w-4" /> Upload Logo
                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Theme */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-5"
      >
        <h3 className="font-semibold text-slate-900 dark:text-white">Theme Settings</h3>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Primary Color</label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="h-10 w-10 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
            />
            <input
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white font-mono w-28"
            />
            <div className="flex gap-2">
              {["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"].map((color) => (
                <button
                  key={color}
                  onClick={() => setPrimaryColor(color)}
                  className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${primaryColor === color ? "border-slate-900 dark:border-white scale-110" : "border-transparent"}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Email Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-5"
      >
        <h3 className="font-semibold text-slate-900 dark:text-white">Email Notifications</h3>
        <div className="space-y-4">
          {[
            { key: "newUser" as const, label: "New User Registration", description: "Send email when a new user signs up" },
            { key: "appointment" as const, label: "Appointment Updates", description: "Notify about appointment status changes" },
            { key: "results" as const, label: "Results Published", description: "Send email when test results are published" },
            { key: "system" as const, label: "System Alerts", description: "Critical system notifications and warnings" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{item.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.description}</p>
              </div>
              <button
                onClick={() => setEmailNotifications({ ...emailNotifications, [item.key]: !emailNotifications[item.key] })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${emailNotifications[item.key] ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600"}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${emailNotifications[item.key] ? "translate-x-6" : "translate-x-1"}`}
                />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Maintenance Mode */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-5"
      >
        <h3 className="font-semibold text-slate-900 dark:text-white">Maintenance Mode</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className={`h-5 w-5 ${maintenanceMode ? "text-amber-500" : "text-slate-400"}`} />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">Enable Maintenance Mode</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                When enabled, only admins can access the platform
              </p>
            </div>
          </div>
          <button
            onClick={() => setMaintenanceMode(!maintenanceMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${maintenanceMode ? "bg-amber-500" : "bg-slate-300 dark:bg-slate-600"}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${maintenanceMode ? "translate-x-6" : "translate-x-1"}`}
            />
          </button>
        </div>
        {maintenanceMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3"
          >
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Maintenance mode is active. Non-admin users will see a maintenance page.
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Save Button */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
          <Save className="h-4 w-4" /> Save Settings
        </button>
      </motion.div>
    </div>
  );
}
