/**
 * Seed script for Career School Portal
 *
 * Usage:
 *   1. Set up Firebase Admin SDK credentials
 *   2. Run: npx tsx scripts/seed.ts
 *
 * This creates sample data for all collections including the default admin account.
 */

import { initializeApp, cert } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { getFirestore, FieldValue } from "firebase-admin/firestore"

const app = initializeApp({
  credential: cert(process.env.GOOGLE_APPLICATION_CREDENTIALS!),
})

const authAdmin = getAuth(app)
const db = getFirestore(app)

async function createUser(email: string, password: string, name: string, role: string) {
  try {
    const user = await authAdmin.createUser({ email, password, displayName: name })
    await db.collection("users").doc(user.uid).set({
      email,
      name,
      role,
      createdAt: FieldValue.serverTimestamp(),
    })
    console.log(`Created ${role}: ${email} (${user.uid})`)
    return user.uid
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    console.log(`Skipping ${email}: ${msg}`)
    return null
  }
}

async function seed() {
  console.log("--- Seeding Career School Portal ---\n")

  // 1. Users
  console.log("Creating users...")
  const adminId = await createUser("admin@careerschool.com", "Admin@12345", "Admin User", "admin")
  const teacher1Id = await createUser("rakesh@kiit.ac.in", "Teacher@123", "Prof. Rakesh Jain", "teacher")
  const teacher2Id = await createUser("amit@kiit.ac.in", "Teacher@123", "Dr. Amit Patel", "teacher")
  const mentorId = await createUser("sneha@kiit.ac.in", "Mentor@123", "Ms. Sneha Roy", "mentor")
  const counselorId = await createUser("priya@kiit.ac.in", "Counselor@123", "Dr. Priya Mehta", "counselor")
  const hrId = await createUser("anil@kiit.ac.in", "HR@12345", "Mr. Anil Kumar", "hr_interviewer")
  const student1Id = await createUser("rahul@kiit.ac.in", "Student@123", "Rahul Sharma", "student")
  const student2Id = await createUser("ananya@kiit.ac.in", "Student@123", "Ananya Gupta", "student")
  const student3Id = await createUser("vikram@kiit.ac.in", "Student@123", "Vikram Singh", "student")

  // 2. Materials
  console.log("\nCreating materials...")
  const materials = [
    { title: "Aptitude - Quantitative Analysis", type: "pdf", topic: "Aptitude", faculty: "Prof. Rakesh Jain", facultyId: teacher1Id, downloads: 145 },
    { title: "Data Structures & Algorithms", type: "video", topic: "Coding", faculty: "Dr. Amit Patel", facultyId: teacher2Id, downloads: 230 },
    { title: "Group Discussion Strategies", type: "ppt", topic: "GD", faculty: "Ms. Sneha Roy", facultyId: mentorId, downloads: 98 },
    { title: "Resume Writing Best Practices", type: "docx", topic: "Resume", faculty: "Mr. Anil Kumar", facultyId: hrId, downloads: 312 },
    { title: "HR Interview Questions Bank", type: "pdf", topic: "Interview", faculty: "Dr. Priya Mehta", facultyId: counselorId, downloads: 567 },
    { title: "Advanced Probability", type: "pdf", topic: "Aptitude", faculty: "Prof. Rakesh Jain", facultyId: teacher1Id, downloads: 89 },
    { title: "System Design Fundamentals", type: "video", topic: "Technical", faculty: "Dr. Amit Patel", facultyId: teacher2Id, downloads: 176 },
  ]
  for (const m of materials) {
    await db.collection("materials").add({ ...m, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() })
  }
  console.log(`Created ${materials.length} materials`)

  // 3. Schedules
  console.log("\nCreating schedules...")
  const schedules = [
    { title: "Aptitude Practice Session", type: "aptitude", date: "2026-05-19", time: "9:00 AM - 10:30 AM", instructor: "Prof. Rakesh Jain", instructorId: teacher1Id },
    { title: "DSA Problem Solving", type: "coding", date: "2026-05-19", time: "11:00 AM - 12:30 PM", instructor: "Dr. Amit Patel", instructorId: teacher2Id },
    { title: "Group Discussion Round", type: "gd", date: "2026-05-20", time: "2:00 PM - 3:30 PM", instructor: "Ms. Sneha Roy", instructorId: mentorId },
    { title: "Mock Personal Interview", type: "pi", date: "2026-05-21", time: "10:00 AM - 11:00 AM", instructor: "Mr. Anil Kumar", instructorId: hrId },
    { title: "Technical Interview Prep", type: "technical", date: "2026-05-22", time: "3:00 PM - 4:30 PM", instructor: "Dr. Priya Mehta", instructorId: counselorId },
    { title: "Resume Review Workshop", type: "resume", date: "2026-05-23", time: "10:00 AM - 11:30 AM", instructor: "Ms. Sneha Roy", instructorId: mentorId },
  ]
  for (const s of schedules) {
    await db.collection("schedules").add({ ...s, createdAt: FieldValue.serverTimestamp() })
  }
  console.log(`Created ${schedules.length} schedules`)

  // 4. Tests
  console.log("\nCreating tests...")
  const tests = [
    { title: "Aptitude Mock Test 4", category: "Aptitude", duration: 60, questionCount: 30, status: "active" },
    { title: "Coding Challenge 6", category: "Coding", duration: 90, questionCount: 5, status: "active" },
    { title: "Verbal Ability Test 3", category: "Verbal", duration: 45, questionCount: 25, status: "active" },
    { title: "Logical Reasoning 5", category: "Reasoning", duration: 50, questionCount: 20, status: "upcoming" },
  ]
  for (const t of tests) {
    await db.collection("tests").add({ ...t, createdAt: FieldValue.serverTimestamp() })
  }
  console.log(`Created ${tests.length} tests`)

  // 5. Appointments
  console.log("\nCreating appointments...")
  const appointments = [
    { type: "counseling", status: "approved", date: "2026-05-19", time: "10:00 AM", faculty: "Dr. Priya Mehta", facultyId: counselorId, studentId: student1Id, student: "Rahul Sharma" },
    { type: "mock_pi", status: "pending", date: "2026-05-20", time: "2:00 PM", faculty: "Mr. Anil Kumar", facultyId: hrId, studentId: student1Id, student: "Rahul Sharma" },
    { type: "resume_review", status: "completed", date: "2026-05-15", time: "11:00 AM", faculty: "Ms. Sneha Roy", facultyId: mentorId, studentId: student2Id, student: "Ananya Gupta" },
    { type: "doubt_clearing", status: "approved", date: "2026-05-21", time: "4:00 PM", faculty: "Prof. Rakesh Jain", facultyId: teacher1Id, studentId: student3Id, student: "Vikram Singh" },
  ]
  for (const a of appointments) {
    await db.collection("appointments").add({ ...a, createdAt: FieldValue.serverTimestamp() })
  }
  console.log(`Created ${appointments.length} appointments`)

  // 6. Notifications
  console.log("\nCreating notifications...")
  if (student1Id) {
    const notifications = [
      { title: "Appointment Approved", message: "Your counseling session with Dr. Priya Mehta has been approved.", type: "success", read: false, userId: student1Id },
      { title: "New Material Available", message: 'Prof. Rakesh Jain uploaded "Advanced Probability"', type: "info", read: false, userId: student1Id },
      { title: "Schedule Update", message: "GD session moved to 2:00 PM on May 20", type: "warning", read: true, userId: student1Id },
      { title: "Result Published", message: "Aptitude Mock Test 3 results are now available", type: "info", read: true, userId: student1Id },
    ]
    for (const n of notifications) {
      await db.collection("notifications").add({ ...n, createdAt: FieldValue.serverTimestamp() })
    }
    console.log(`Created ${notifications.length} notifications`)
  }

  // 7. Forum Posts
  console.log("\nCreating forum posts...")
  const postRef = await db.collection("forum_posts").add({
    title: "How to prepare for product-based company interviews?",
    body: "I am targeting Google and Microsoft. What should be my preparation strategy for the next 3 months?",
    category: "Interview",
    authorId: student1Id,
    authorName: "Rahul Sharma",
    upvotes: 12,
    answerCount: 2,
    createdAt: FieldValue.serverTimestamp(),
  })
  await db.collection("forum_comments").add({
    postId: postRef.id,
    body: "Focus on DSA first — solve at least 200 problems on LeetCode. Then move to system design. I recommend the Grokking System Design course.",
    authorId: teacher2Id,
    authorName: "Dr. Amit Patel",
    authorRole: "teacher",
    upvotes: 8,
    createdAt: FieldValue.serverTimestamp(),
  })
  await db.collection("forum_comments").add({
    postId: postRef.id,
    body: "Don't forget behavioral questions! Practice the STAR method and prepare 5-6 strong stories from your experience.",
    authorId: hrId,
    authorName: "Mr. Anil Kumar",
    authorRole: "hr_interviewer",
    upvotes: 5,
    createdAt: FieldValue.serverTimestamp(),
  })
  console.log("Created forum posts and comments")

  // 8. Results
  console.log("\nCreating results...")
  if (student1Id) {
    const results = [
      { testName: "Aptitude Mock Test 3", score: 78, total: 100, category: "Aptitude", studentId: student1Id, date: "2026-05-12", published: true },
      { testName: "Coding Challenge 5", score: 85, total: 100, category: "Coding", studentId: student1Id, date: "2026-05-10", published: true },
      { testName: "Verbal Ability Test 2", score: 62, total: 80, category: "Verbal", studentId: student1Id, date: "2026-05-08", published: true },
      { testName: "Logical Reasoning 4", score: 90, total: 100, category: "Reasoning", studentId: student1Id, date: "2026-05-05", published: true },
    ]
    for (const r of results) {
      await db.collection("results").add({ ...r, createdAt: FieldValue.serverTimestamp() })
    }
    console.log(`Created ${results.length} results`)
  }

  console.log("\n--- Seeding complete! ---")
  process.exit(0)
}

seed().catch(console.error)
