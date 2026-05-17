"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Bot, User, Sparkles, Briefcase, FileText, GraduationCap, BookOpen } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

const quickActions = [
  { label: "Career Advice", icon: Briefcase },
  { label: "Resume Tips", icon: FileText },
  { label: "Interview Prep", icon: GraduationCap },
  { label: "Study Plan", icon: BookOpen },
]

const mockResponses = [
  "That's a great question! Based on your profile and goals, I'd recommend focusing on building a strong foundation in data structures and algorithms first. This will help you in both placement tests and technical interviews. Would you like me to suggest a study plan?",
  "Here's what I'd suggest: Start by identifying your target companies and understand their hiring process. Then, tailor your preparation accordingly. For consulting firms, focus on case studies and guesstimates. For tech companies, practice coding problems daily. Shall I break this down further?",
  "Absolutely! For resume optimization, make sure you quantify your achievements wherever possible. Instead of saying 'Led a team project,' say 'Led a 5-member team to deliver a project that reduced processing time by 40%.' Would you like me to review your resume bullet points?",
  "For interview preparation, I recommend the STAR method (Situation, Task, Action, Result) for behavioral questions. Practice with mock interviews and record yourself to identify areas of improvement. Want me to give you some sample behavioral questions?",
]

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hello! I'm your AI Career Assistant. I can help you with career planning, resume building, interview preparation, and study strategies. How can I help you today?",
    timestamp: "10:00 AM",
  },
  {
    id: "2",
    role: "user",
    content: "I have a placement interview with Google next month. How should I prepare?",
    timestamp: "10:01 AM",
  },
  {
    id: "3",
    role: "assistant",
    content:
      "Great news on the Google interview! Here's a structured preparation plan:\n\n1. **Data Structures & Algorithms** - Practice 2-3 problems daily on LeetCode (focus on Medium/Hard). Key topics: Arrays, Trees, Graphs, Dynamic Programming.\n\n2. **System Design** - Study scalable system concepts. Google loves questions on distributed systems.\n\n3. **Behavioral** - Prepare stories using the STAR method about leadership, teamwork, and handling ambiguity.\n\n4. **Google-specific** - Research their products and think about how you'd improve them.\n\nWould you like me to create a detailed daily schedule for the next 30 days?",
    timestamp: "10:01 AM",
  },
  {
    id: "4",
    role: "user",
    content: "Yes, and can you also suggest which LeetCode problems to focus on?",
    timestamp: "10:02 AM",
  },
  {
    id: "5",
    role: "assistant",
    content:
      "Here are the must-do LeetCode patterns for Google interviews:\n\n**Top Priority:**\n- Sliding Window (e.g., Longest Substring Without Repeating Characters)\n- Two Pointers (e.g., Container With Most Water)\n- BFS/DFS on Graphs (e.g., Number of Islands)\n- Dynamic Programming (e.g., Longest Increasing Subsequence)\n\n**High Priority:**\n- Binary Search variations\n- Tree traversals and manipulations\n- Backtracking (e.g., N-Queens, Sudoku Solver)\n- Trie-based problems\n\nI'd suggest solving 3 problems daily: 1 Easy (warm-up), 1 Medium (core practice), and 1 Hard (stretch goal) on weekends. Want me to create a week-by-week topic schedule?",
    timestamp: "10:02 AM",
  },
]

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
  }

  const sendMessage = (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: getCurrentTime(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
        timestamp: getCurrentTime(),
      }
      setIsTyping(false)
      setMessages((prev) => [...prev, aiResponse])
    }, 1500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  const handleQuickAction = (action: string) => {
    sendMessage(action)
  }

  return (
    <div className="flex h-[calc(100vh-12rem)] flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 flex items-center gap-3"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">AI Career Assistant</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Powered by AI - Always ready to help</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          <span className="text-xs text-slate-500 dark:text-slate-400">Online</span>
        </div>
      </motion.div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/50">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index < initialMessages.length ? index * 0.05 : 0 }}
              className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
            >
              {/* Avatar */}
              <div
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                  message.role === "assistant"
                    ? "bg-gradient-to-br from-indigo-500 to-purple-600"
                    : "bg-slate-200 dark:bg-slate-700"
                }`}
              >
                {message.role === "assistant" ? (
                  <Bot className="h-4 w-4 text-white" />
                ) : (
                  <User className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-indigo-600 text-white"
                    : "border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
                }`}
              >
                <p
                  className={`whitespace-pre-wrap text-sm leading-relaxed ${
                    message.role === "user" ? "text-white" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {message.content}
                </p>
                <p
                  className={`mt-1 text-xs ${
                    message.role === "user" ? "text-indigo-200" : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {message.timestamp}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex gap-3"
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
                  <div className="flex items-center gap-1">
                    <motion.span
                      className="h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-500"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    />
                    <motion.span
                      className="h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-500"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.span
                      className="h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-500"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-3 flex flex-wrap gap-2"
      >
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={() => handleQuickAction(action.label)}
            className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-indigo-600 dark:hover:bg-indigo-900/20 dark:hover:text-indigo-400"
          >
            <action.icon className="h-3.5 w-3.5" />
            {action.label}
          </button>
        ))}
      </motion.div>

      {/* Input Area */}
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onSubmit={handleSubmit}
        className="mt-3 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isTyping}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white transition-all hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="h-4 w-4" />
        </button>
      </motion.form>
    </div>
  )
}
