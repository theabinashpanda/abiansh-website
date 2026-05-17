"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Plus,
  User,
} from "lucide-react"
import { mockAppointments } from "@/lib/career-school-data"

const statusColors = {
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  approved: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  completed: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
}

const statusIcons = {
  pending: Clock,
  approved: CheckCircle2,
  completed: CheckCircle2,
  cancelled: XCircle,
}

const typeLabels = {
  counseling: "Counseling",
  doubt_clearing: "Doubt Clearing",
  mock_pi: "Mock PI",
  resume_review: "Resume Review",
}

const tabs = ["All", "Counseling", "Doubt Clearing", "Mock PI", "Resume Review"] as const

const facultyList = [
  { id: "1", name: "Dr. Priya Mehta", specialization: "Career Counseling" },
  { id: "2", name: "Mr. Anil Kumar", specialization: "Mock Interviews" },
  { id: "3", name: "Ms. Sneha Roy", specialization: "Communication & GD" },
  { id: "4", name: "Prof. Rakesh Jain", specialization: "Aptitude & Reasoning" },
]

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
]

const availableSlots: Record<string, string[]> = {
  "1": ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"],
  "2": ["9:30 AM", "10:30 AM", "2:30 PM", "3:30 PM", "4:00 PM"],
  "3": ["10:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"],
  "4": ["9:00 AM", "9:30 AM", "11:00 AM", "3:00 PM", "4:00 PM"],
}

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState<string>("All")
  const [showBooking, setShowBooking] = useState(false)
  const [selectedType, setSelectedType] = useState("")
  const [selectedFaculty, setSelectedFaculty] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")

  const filteredAppointments = mockAppointments.filter((apt) => {
    if (activeTab === "All") return true
    const typeMap: Record<string, string> = {
      "Counseling": "counseling",
      "Doubt Clearing": "doubt_clearing",
      "Mock PI": "mock_pi",
      "Resume Review": "resume_review",
    }
    return apt.type === typeMap[activeTab]
  })

  const handleSubmit = () => {
    setShowBooking(false)
    setSelectedType("")
    setSelectedFaculty("")
    setSelectedDate("")
    setSelectedTime("")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Appointments</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Book and manage your sessions with faculty
          </p>
        </div>
        <button
          onClick={() => setShowBooking(!showBooking)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Book New Appointment
        </button>
      </div>

      {/* Booking Form */}
      <AnimatePresence>
        {showBooking && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="font-semibold mb-4">Book New Appointment</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Type */}
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">
                    Appointment Type
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">Select type</option>
                    <option value="counseling">Counseling</option>
                    <option value="doubt_clearing">Doubt Clearing</option>
                    <option value="mock_pi">Mock PI</option>
                    <option value="resume_review">Resume Review</option>
                  </select>
                </div>

                {/* Faculty */}
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">
                    Select Faculty
                  </label>
                  <select
                    value={selectedFaculty}
                    onChange={(e) => {
                      setSelectedFaculty(e.target.value)
                      setSelectedTime("")
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">Select faculty</option>
                    {facultyList.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name} - {f.specialization}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min="2026-05-18"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Time Slots */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">
                    Available Time Slots
                    {selectedFaculty && (
                      <span className="text-slate-400 font-normal ml-1">
                        (for {facultyList.find((f) => f.id === selectedFaculty)?.name})
                      </span>
                    )}
                  </label>
                  {selectedFaculty ? (
                    <div className="flex flex-wrap gap-2">
                      {timeSlots.map((slot) => {
                        const isAvailable = availableSlots[selectedFaculty]?.includes(slot)
                        return (
                          <button
                            key={slot}
                            disabled={!isAvailable}
                            onClick={() => setSelectedTime(slot)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                              selectedTime === slot
                                ? "bg-blue-600 text-white"
                                : isAvailable
                                ? "bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300"
                                : "bg-slate-50 dark:bg-slate-800/50 text-slate-300 dark:text-slate-600 cursor-not-allowed"
                            }`}
                          >
                            {slot}
                          </button>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-400">Select a faculty to see available slots</p>
                  )}
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-3 mt-5">
                <button
                  onClick={handleSubmit}
                  disabled={!selectedType || !selectedFaculty || !selectedDate || !selectedTime}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 text-white text-sm font-medium transition-colors disabled:cursor-not-allowed"
                >
                  Confirm Booking
                </button>
                <button
                  onClick={() => setShowBooking(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tab Filters */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Appointments List */}
      <div className="space-y-3">
        {filteredAppointments.map((apt, i) => {
          const StatusIcon = statusIcons[apt.status]
          return (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{typeLabels[apt.type]}</div>
                <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  <User className="w-3 h-3" />
                  {apt.faculty}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs font-medium">{apt.date}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{apt.time}</div>
              </div>
              <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg ${statusColors[apt.status]}`}>
                <StatusIcon className="w-3 h-3" />
                {apt.status}
              </span>
            </motion.div>
          )
        })}
        {filteredAppointments.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <AlertCircle className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm">No appointments found</p>
          </div>
        )}
      </div>
    </div>
  )
}
