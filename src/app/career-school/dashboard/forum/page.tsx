"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  MessageSquarePlus,
  ThumbsUp,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Send,
  X,
  User,
} from "lucide-react"

type Category = "All" | "Aptitude" | "Coding" | "Interview" | "Career" | "General"

interface Answer {
  id: string
  author: string
  avatar: string
  role: string
  content: string
  timestamp: string
  upvotes: number
}

interface ForumPost {
  id: string
  title: string
  author: string
  avatar: string
  category: Category
  timestamp: string
  content: string
  answers: Answer[]
  upvotes: number
}

const categoryColors: Record<Category, string> = {
  All: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  Aptitude: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Coding: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Interview: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Career: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  General: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
}

const mockPosts: ForumPost[] = [
  {
    id: "1",
    title: "How to approach Time & Work problems in CAT?",
    author: "Rahul Sharma",
    avatar: "RS",
    category: "Aptitude",
    timestamp: "2 hours ago",
    content:
      "I'm struggling with Time & Work problems, especially when there are multiple workers joining/leaving at different intervals. Can someone explain a systematic approach?",
    upvotes: 12,
    answers: [
      {
        id: "a1",
        author: "Prof. Anita Desai",
        avatar: "AD",
        role: "Faculty",
        content:
          "Great question! The key is to use the LCM method. First, find the LCM of all the individual times. Then express each worker's capacity as units per day. This makes it much easier to handle workers joining or leaving at different points.",
        timestamp: "1 hour ago",
        upvotes: 8,
      },
      {
        id: "a2",
        author: "Vikram Patel",
        avatar: "VP",
        role: "Student",
        content:
          "I found it helpful to create a timeline and mark when each worker starts/stops. Then calculate work done in each interval separately. The LCM method Prof. Desai mentioned is really effective for this.",
        timestamp: "45 min ago",
        upvotes: 5,
      },
      {
        id: "a3",
        author: "Dr. Suresh Kumar",
        avatar: "SK",
        role: "Faculty",
        content:
          "Adding to what's been said — practice with variations. Try problems where efficiency changes, or where workers take breaks. Once you master the LCM method, these become straightforward applications.",
        timestamp: "30 min ago",
        upvotes: 3,
      },
    ],
  },
  {
    id: "2",
    title: "Best resources for Dynamic Programming?",
    author: "Priya Menon",
    avatar: "PM",
    category: "Coding",
    timestamp: "5 hours ago",
    content:
      "I want to get better at DP problems. Currently I can solve basic ones but struggle with optimization and bitmask DP. Any recommended resources or problem sets?",
    upvotes: 18,
    answers: [],
  },
  {
    id: "3",
    title: "What to wear for a consulting firm interview?",
    author: "Amit Kumar",
    avatar: "AK",
    category: "Interview",
    timestamp: "1 day ago",
    content:
      "I have an interview with McKinsey next week. What's the appropriate dress code? Should I go full formal or business casual?",
    upvotes: 7,
    answers: [],
  },
  {
    id: "4",
    title: "Should I pursue MBA or MS after B.Tech?",
    author: "Sneha Reddy",
    avatar: "SR",
    category: "Career",
    timestamp: "2 days ago",
    content:
      "I'm in my final year of B.Tech CSE. I'm confused between pursuing an MBA or MS. My interest is in product management. Which path would be better?",
    upvotes: 23,
    answers: [],
  },
  {
    id: "5",
    title: "Tips for maintaining consistency in preparation?",
    author: "Karthik Nair",
    avatar: "KN",
    category: "General",
    timestamp: "3 days ago",
    content:
      "I start strong every week but by Wednesday I lose motivation. How do you all maintain consistency in your daily study routine?",
    upvotes: 15,
    answers: [],
  },
  {
    id: "6",
    title: "How to solve probability questions faster?",
    author: "Deepa Iyer",
    avatar: "DI",
    category: "Aptitude",
    timestamp: "4 days ago",
    content:
      "Probability questions eat up most of my time in mock tests. Are there shortcuts or frameworks that help solve them quickly without making errors?",
    upvotes: 9,
    answers: [],
  },
]

const categories: Category[] = ["All", "Aptitude", "Coding", "Interview", "Career", "General"]

export default function ForumPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<Category>("All")
  const [expandedPost, setExpandedPost] = useState<string | null>("1")
  const [showAskForm, setShowAskForm] = useState(false)
  const [newQuestion, setNewQuestion] = useState({ title: "", body: "", category: "General" as Category })

  const filteredPosts = mockPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Discussion Forum</h1>
          <p className="text-slate-600 dark:text-slate-400">Ask questions, share knowledge, and learn together</p>
        </div>
        <button
          onClick={() => setShowAskForm(!showAskForm)}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
        >
          <MessageSquarePlus className="h-4 w-4" />
          Ask a Question
        </button>
      </motion.div>

      {/* Ask Question Form */}
      <AnimatePresence>
        {showAskForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Ask a New Question</h2>
                <button
                  onClick={() => setShowAskForm(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Title</label>
                  <input
                    type="text"
                    value={newQuestion.title}
                    onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                    placeholder="What's your question?"
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Details</label>
                  <textarea
                    value={newQuestion.body}
                    onChange={(e) => setNewQuestion({ ...newQuestion, body: e.target.value })}
                    placeholder="Provide more context about your question..."
                    rows={4}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
                  <select
                    value={newQuestion.category}
                    onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value as Category })}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    {categories.filter((c) => c !== "All").map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowAskForm(false)}
                    className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700">
                    <Send className="h-4 w-4" />
                    Post Question
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Bar */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search discussions..."
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500"
          />
        </div>
      </motion.div>

      {/* Category Pills */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex flex-wrap gap-2"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              selectedCategory === cat
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
          >
            {/* Post Header */}
            <button
              onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
              className="w-full p-5 text-left"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[post.category]}`}
                    >
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{post.timestamp}</span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">{post.title}</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                      {post.avatar}
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400">{post.author}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1 text-sm">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{post.upvotes}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.answers.length}</span>
                  </div>
                  {expandedPost === post.id ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
              </div>
            </button>

            {/* Expanded Content */}
            <AnimatePresence>
              {expandedPost === post.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-slate-200 px-5 pb-5 pt-4 dark:border-slate-800">
                    <p className="mb-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{post.content}</p>

                    {/* Answers */}
                    {post.answers.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                          {post.answers.length} {post.answers.length === 1 ? "Answer" : "Answers"}
                        </h4>
                        {post.answers.map((answer) => (
                          <div
                            key={answer.id}
                            className="rounded-lg border border-slate-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50"
                          >
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                                  {answer.avatar}
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                                    {answer.author}
                                  </span>
                                  {answer.role === "Faculty" && (
                                    <span className="ml-2 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                                      Faculty
                                    </span>
                                  )}
                                </div>
                              </div>
                              <span className="text-xs text-slate-500 dark:text-slate-400">{answer.timestamp}</span>
                            </div>
                            <p className="mb-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                              {answer.content}
                            </p>
                            <button className="flex items-center gap-1 text-xs text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                              <ThumbsUp className="h-3.5 w-3.5" />
                              <span>{answer.upvotes}</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {post.answers.length === 0 && (
                      <div className="flex items-center gap-2 rounded-lg border border-dashed border-slate-200 p-4 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        <User className="h-4 w-4" />
                        No answers yet. Be the first to answer!
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
