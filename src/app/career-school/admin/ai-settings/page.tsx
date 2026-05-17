"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Eye, EyeOff, Save } from "lucide-react";

interface AIFeatureToggle {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export default function AISettingsPage() {
  const [apiKey, setApiKey] = useState("sk-xxxx-xxxxxxxxxxxxxxxxxxxx");
  const [showKey, setShowKey] = useState(false);
  const [model, setModel] = useState("gpt-4o");
  const [rateLimit, setRateLimit] = useState("100");
  const [ratePeriod, setRatePeriod] = useState("hour");
  const [features, setFeatures] = useState<AIFeatureToggle[]>([
    { id: "chatbot", label: "AI Chatbot", description: "Enable AI-powered chatbot for student queries", enabled: true },
    { id: "career", label: "Career Recommendations", description: "AI-driven career path suggestions based on student profile", enabled: true },
    { id: "resume", label: "Resume Review", description: "Automated resume feedback and improvement suggestions", enabled: false },
    { id: "interview", label: "Mock Interview Feedback", description: "AI analysis of mock interview responses", enabled: true },
  ]);

  const toggleFeature = (id: string) => {
    setFeatures(features.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f)));
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <Bot className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">AI Settings</h1>
      </motion.div>

      {/* API Configuration */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-5"
      >
        <h3 className="font-semibold text-slate-900 dark:text-white">API Configuration</h3>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">API Key</label>
          <div className="relative">
            <input
              type={showKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 pr-10 text-sm text-slate-900 dark:text-white font-mono"
            />
            <button
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Model Selection</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
          >
            <option value="gpt-4o">GPT-4o</option>
            <option value="gpt-4o-mini">GPT-4o Mini</option>
            <option value="claude-sonnet-4-20250514">Claude Sonnet 4</option>
            <option value="claude-haiku-4-20250414">Claude Haiku 4</option>
          </select>
        </div>
      </motion.div>

      {/* Feature Toggles */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-5"
      >
        <h3 className="font-semibold text-slate-900 dark:text-white">AI Features</h3>

        <div className="space-y-4">
          {features.map((feature) => (
            <div key={feature.id} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{feature.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{feature.description}</p>
              </div>
              <button
                onClick={() => toggleFeature(feature.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${feature.enabled ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600"}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${feature.enabled ? "translate-x-6" : "translate-x-1"}`}
                />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Rate Limiting */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-5"
      >
        <h3 className="font-semibold text-slate-900 dark:text-white">Rate Limiting</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Max Requests</label>
            <input
              type="number"
              value={rateLimit}
              onChange={(e) => setRateLimit(e.target.value)}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Per</label>
            <select
              value={ratePeriod}
              onChange={(e) => setRatePeriod(e.target.value)}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
            >
              <option value="minute">Minute</option>
              <option value="hour">Hour</option>
              <option value="day">Day</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
          <Save className="h-4 w-4" /> Save Settings
        </button>
      </motion.div>
    </div>
  );
}
