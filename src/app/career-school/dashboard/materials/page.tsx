"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Search,
  FileText,
  Video,
  Presentation,
  Download,
  ExternalLink,
  Link2,
} from "lucide-react"
import { mockMaterials } from "@/lib/career-school-data"

const typeFilters = ["All", "PDF", "Video", "PPT", "DOCX", "Links"] as const

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  pdf: FileText,
  video: Video,
  ppt: Presentation,
  docx: FileText,
  link: Link2,
}

const typeColors: Record<string, string> = {
  pdf: "bg-red-50 dark:bg-red-900/30 text-red-600",
  video: "bg-purple-50 dark:bg-purple-900/30 text-purple-600",
  ppt: "bg-orange-50 dark:bg-orange-900/30 text-orange-600",
  docx: "bg-blue-50 dark:bg-blue-900/30 text-blue-600",
  link: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600",
}

const extendedMaterials = [
  ...mockMaterials,
  { id: "6", title: "Advanced Verbal Reasoning", type: "pdf" as const, topic: "Verbal", faculty: "Prof. Rakesh Jain", date: "2026-05-15", downloads: 89 },
  { id: "7", title: "System Design Basics", type: "video" as const, topic: "Technical", faculty: "Dr. Amit Patel", date: "2026-05-13", downloads: 178 },
  { id: "8", title: "Company Research Links", type: "link" as const, topic: "Placement", faculty: "Ms. Sneha Roy", date: "2026-05-11", downloads: 56 },
]

export default function MaterialsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<string>("All")

  const filteredMaterials = extendedMaterials.filter((mat) => {
    const matchesSearch =
      mat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mat.faculty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mat.topic.toLowerCase().includes(searchQuery.toLowerCase())

    const filterMap: Record<string, string> = {
      "PDF": "pdf",
      "Video": "video",
      "PPT": "ppt",
      "DOCX": "docx",
      "Links": "link",
    }

    const matchesFilter = activeFilter === "All" || mat.type === filterMap[activeFilter]
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Training Materials</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Access study materials, videos, and resources
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search materials by title, faculty, or topic..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {typeFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === filter
                ? "bg-blue-600 text-white"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Materials Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMaterials.map((mat, i) => {
          const Icon = typeIcons[mat.type] || FileText
          const colorClass = typeColors[mat.type] || typeColors.pdf
          return (
            <motion.div
              key={mat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex flex-col"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${colorClass}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-medium leading-tight line-clamp-2">{mat.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{mat.faculty}</p>
                </div>
              </div>
              <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>{mat.date}</span>
                  <span className="flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    {mat.downloads}
                  </span>
                </div>
                <button className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                  {mat.type === "link" ? (
                    <>
                      <ExternalLink className="w-3 h-3" />
                      Open
                    </>
                  ) : (
                    <>
                      <Download className="w-3 h-3" />
                      Download
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <FileText className="w-8 h-8 mx-auto mb-2" />
          <p className="text-sm">No materials found</p>
        </div>
      )}
    </div>
  )
}
