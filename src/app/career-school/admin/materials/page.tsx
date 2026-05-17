"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  FileText,
  Video,
  Image,
  File,
  Upload,
  X,
  BookOpen,
} from "lucide-react";

type MaterialType = "PDF" | "Video" | "Presentation" | "Document" | "Image";

interface Material {
  id: number;
  title: string;
  type: MaterialType;
  topic: string;
  faculty: string;
  date: string;
  downloads: number;
}

const mockMaterials: Material[] = [
  { id: 1, title: "Resume Writing Guide", type: "PDF", topic: "Career Skills", faculty: "Sneha Gupta", date: "2026-05-10", downloads: 234 },
  { id: 2, title: "Mock Interview Tips", type: "Video", topic: "Interview Prep", faculty: "Vikram Singh", date: "2026-05-08", downloads: 156 },
  { id: 3, title: "Data Structures Basics", type: "Presentation", topic: "Technical", faculty: "Dr. Mehra", date: "2026-05-05", downloads: 312 },
  { id: 4, title: "Communication Skills Workshop", type: "Video", topic: "Soft Skills", faculty: "Rahul Verma", date: "2026-05-03", downloads: 98 },
  { id: 5, title: "Company Research Template", type: "Document", topic: "Career Skills", faculty: "Sneha Gupta", date: "2026-04-28", downloads: 187 },
  { id: 6, title: "Aptitude Test Practice Set", type: "PDF", topic: "Aptitude", faculty: "Amit Kumar", date: "2026-04-25", downloads: 445 },
  { id: 7, title: "Group Discussion Strategies", type: "PDF", topic: "Interview Prep", faculty: "Vikram Singh", date: "2026-04-20", downloads: 201 },
  { id: 8, title: "Portfolio Design Examples", type: "Image", topic: "Career Skills", faculty: "Priya Mehta", date: "2026-04-18", downloads: 89 },
];

const typeIcons: Record<MaterialType, typeof FileText> = {
  PDF: FileText,
  Video: Video,
  Presentation: File,
  Document: FileText,
  Image: Image,
};

const typeColors: Record<MaterialType, string> = {
  PDF: "text-red-500",
  Video: "text-purple-500",
  Presentation: "text-orange-500",
  Document: "text-blue-500",
  Image: "text-green-500",
};

const topics = ["Career Skills", "Interview Prep", "Technical", "Soft Skills", "Aptitude"];

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>(mockMaterials);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [topicFilter, setTopicFilter] = useState<string>("All");
  const [showForm, setShowForm] = useState(false);
  const [newMaterial, setNewMaterial] = useState({ title: "", type: "PDF" as MaterialType, topic: "Career Skills", tags: "" });

  const filtered = materials.filter((m) => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "All" || m.type === typeFilter;
    const matchTopic = topicFilter === "All" || m.topic === topicFilter;
    return matchSearch && matchType && matchTopic;
  });

  const handleUpload = () => {
    if (!newMaterial.title) return;
    const material: Material = {
      id: Date.now(),
      title: newMaterial.title,
      type: newMaterial.type,
      topic: newMaterial.topic,
      faculty: "Current User",
      date: new Date().toISOString().split("T")[0],
      downloads: 0,
    };
    setMaterials([material, ...materials]);
    setNewMaterial({ title: "", type: "PDF", topic: "Career Skills", tags: "" });
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    setMaterials(materials.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Materials Management</h1>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          <Upload className="h-4 w-4" /> Upload Material
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
                <h3 className="font-semibold text-slate-900 dark:text-white">Upload New Material</h3>
                <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <input
                  placeholder="Title"
                  value={newMaterial.title}
                  onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400"
                />
                <select
                  value={newMaterial.type}
                  onChange={(e) => setNewMaterial({ ...newMaterial, type: e.target.value as MaterialType })}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
                >
                  <option value="PDF">PDF</option>
                  <option value="Video">Video</option>
                  <option value="Presentation">Presentation</option>
                  <option value="Document">Document</option>
                  <option value="Image">Image</option>
                </select>
                <select
                  value={newMaterial.topic}
                  onChange={(e) => setNewMaterial({ ...newMaterial, topic: e.target.value })}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
                >
                  {topics.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <input
                  placeholder="Tags (comma separated)"
                  value={newMaterial.tags}
                  onChange={(e) => setNewMaterial({ ...newMaterial, tags: e.target.value })}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer rounded-lg border border-dashed border-slate-300 dark:border-slate-600 px-4 py-2 text-sm text-slate-500 dark:text-slate-400 hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
                  <Plus className="h-4 w-4" /> Choose File
                  <input type="file" className="hidden" />
                </label>
                <button
                  onClick={handleUpload}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                >
                  Upload
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              placeholder="Search materials..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-10 pr-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
          >
            <option value="All">All Types</option>
            <option value="PDF">PDF</option>
            <option value="Video">Video</option>
            <option value="Presentation">Presentation</option>
            <option value="Document">Document</option>
            <option value="Image">Image</option>
          </select>
          <select
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
          >
            <option value="All">All Topics</option>
            {topics.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Title</th>
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Type</th>
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Topic</th>
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Faculty</th>
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Date</th>
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Downloads</th>
                <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((material) => {
                const Icon = typeIcons[material.type];
                return (
                  <motion.tr
                    key={material.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">{material.title}</td>
                    <td className="py-3 px-4">
                      <span className={`flex items-center gap-1.5 ${typeColors[material.type]}`}>
                        <Icon className="h-4 w-4" /> {material.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{material.topic}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{material.faculty}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{material.date}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{material.downloads}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(material.id)} className="p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
