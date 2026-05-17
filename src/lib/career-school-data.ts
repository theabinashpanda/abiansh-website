export type UserRole = 'student' | 'teacher' | 'mentor' | 'counselor' | 'hr_interviewer' | 'admin' | 'super_admin'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

export interface Appointment {
  id: string
  type: 'counseling' | 'doubt_clearing' | 'mock_pi' | 'resume_review'
  status: 'pending' | 'approved' | 'completed' | 'cancelled'
  date: string
  time: string
  faculty: string
  student?: string
}

export interface Material {
  id: string
  title: string
  type: 'pdf' | 'ppt' | 'docx' | 'video' | 'link'
  topic: string
  faculty: string
  date: string
  downloads: number
}

export interface TestResult {
  id: string
  testName: string
  score: number
  total: number
  date: string
  category: string
}

export interface ScheduleItem {
  id: string
  title: string
  type: 'aptitude' | 'coding' | 'gd' | 'pi' | 'resume' | 'technical'
  date: string
  time: string
  instructor: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning'
  read: boolean
  date: string
}

export const mockUser: User = {
  id: '1',
  name: 'Rahul Sharma',
  email: 'rahul@student.com',
  role: 'student',
}

export const mockAppointments: Appointment[] = [
  { id: '1', type: 'counseling', status: 'approved', date: '2026-05-19', time: '10:00 AM', faculty: 'Dr. Priya Mehta' },
  { id: '2', type: 'mock_pi', status: 'pending', date: '2026-05-20', time: '2:00 PM', faculty: 'Mr. Anil Kumar' },
  { id: '3', type: 'resume_review', status: 'completed', date: '2026-05-15', time: '11:00 AM', faculty: 'Ms. Sneha Roy' },
  { id: '4', type: 'doubt_clearing', status: 'approved', date: '2026-05-21', time: '4:00 PM', faculty: 'Prof. Rakesh Jain' },
]

export const mockMaterials: Material[] = [
  { id: '1', title: 'Aptitude - Quantitative Analysis', type: 'pdf', topic: 'Aptitude', faculty: 'Prof. Rakesh Jain', date: '2026-05-10', downloads: 145 },
  { id: '2', title: 'Data Structures & Algorithms', type: 'video', topic: 'Coding', faculty: 'Dr. Amit Patel', date: '2026-05-08', downloads: 230 },
  { id: '3', title: 'Group Discussion Strategies', type: 'ppt', topic: 'GD', faculty: 'Ms. Sneha Roy', date: '2026-05-12', downloads: 98 },
  { id: '4', title: 'Resume Writing Best Practices', type: 'docx', topic: 'Resume', faculty: 'Mr. Anil Kumar', date: '2026-05-14', downloads: 312 },
  { id: '5', title: 'HR Interview Questions Bank', type: 'pdf', topic: 'Interview', faculty: 'Dr. Priya Mehta', date: '2026-05-06', downloads: 567 },
]

export const mockResults: TestResult[] = [
  { id: '1', testName: 'Aptitude Mock Test 3', score: 78, total: 100, date: '2026-05-12', category: 'Aptitude' },
  { id: '2', testName: 'Coding Challenge 5', score: 85, total: 100, date: '2026-05-10', category: 'Coding' },
  { id: '3', testName: 'Verbal Ability Test 2', score: 62, total: 80, date: '2026-05-08', category: 'Verbal' },
  { id: '4', testName: 'Logical Reasoning 4', score: 90, total: 100, date: '2026-05-05', category: 'Reasoning' },
]

export const mockSchedule: ScheduleItem[] = [
  { id: '1', title: 'Aptitude Practice Session', type: 'aptitude', date: '2026-05-19', time: '9:00 AM - 10:30 AM', instructor: 'Prof. Rakesh Jain' },
  { id: '2', title: 'DSA Problem Solving', type: 'coding', date: '2026-05-19', time: '11:00 AM - 12:30 PM', instructor: 'Dr. Amit Patel' },
  { id: '3', title: 'Group Discussion Round', type: 'gd', date: '2026-05-20', time: '2:00 PM - 3:30 PM', instructor: 'Ms. Sneha Roy' },
  { id: '4', title: 'Mock Personal Interview', type: 'pi', date: '2026-05-21', time: '10:00 AM - 11:00 AM', instructor: 'Mr. Anil Kumar' },
  { id: '5', title: 'Technical Interview Prep', type: 'technical', date: '2026-05-22', time: '3:00 PM - 4:30 PM', instructor: 'Dr. Priya Mehta' },
]

export const mockNotifications: Notification[] = [
  { id: '1', title: 'Appointment Approved', message: 'Your counseling session with Dr. Priya Mehta has been approved.', type: 'success', read: false, date: '2026-05-17' },
  { id: '2', title: 'New Material Available', message: 'Prof. Rakesh Jain uploaded "Advanced Probability"', type: 'info', read: false, date: '2026-05-16' },
  { id: '3', title: 'Schedule Update', message: 'GD session moved to 2:00 PM on May 20', type: 'warning', read: true, date: '2026-05-15' },
  { id: '4', title: 'Result Published', message: 'Aptitude Mock Test 3 results are now available', type: 'info', read: true, date: '2026-05-12' },
]

export const mockAnalytics = {
  totalStudents: 1248,
  totalAppointments: 356,
  materialDownloads: 4523,
  testsCompleted: 892,
  avgScore: 74.2,
  activeTeachers: 24,
}

export const mockProgressData = [
  { month: 'Jan', aptitude: 55, coding: 40, verbal: 60, reasoning: 50 },
  { month: 'Feb', aptitude: 60, coding: 52, verbal: 62, reasoning: 58 },
  { month: 'Mar', aptitude: 65, coding: 60, verbal: 68, reasoning: 65 },
  { month: 'Apr', aptitude: 72, coding: 70, verbal: 70, reasoning: 75 },
  { month: 'May', aptitude: 78, coding: 85, verbal: 72, reasoning: 90 },
]

export const features = [
  { title: 'Smart Scheduling', description: 'Book appointments with counselors, mentors, and faculty with intelligent availability matching.' },
  { title: 'Training Library', description: 'Access curated PDFs, videos, and presentations organized by topic and difficulty.' },
  { title: 'Test & Analytics', description: 'Take mock tests, view section-wise analysis, and track your progress over time.' },
  { title: 'AI Career Guide', description: 'Get personalized career recommendations and resume feedback powered by AI.' },
  { title: 'Resume Builder', description: 'Build ATS-friendly resumes with live preview and AI-powered suggestions.' },
  { title: 'Mock Interviews', description: 'Practice with HR interviewers and receive detailed feedback on your performance.' },
]
