import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  type DocumentData,
  type QueryConstraint,
} from "firebase/firestore"
import { db } from "@/lib/firebase"

function getDb() {
  if (!db) throw new Error("Firebase is not configured. Set NEXT_PUBLIC_FIREBASE_* env vars.")
  return db
}

// ─── Generic helpers ────────────────────────────────────────────

async function getAll<T>(col: string, ...constraints: QueryConstraint[]): Promise<T[]> {
  const q = query(collection(getDb(), col), ...constraints)
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as T)
}

async function getById<T>(col: string, id: string): Promise<T | null> {
  const snap = await getDoc(doc(getDb(), col, id))
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as T) : null
}

async function create(col: string, data: DocumentData): Promise<string> {
  const ref = await addDoc(collection(getDb(), col), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return ref.id
}

async function update(col: string, id: string, data: DocumentData): Promise<void> {
  await updateDoc(doc(getDb(), col, id), { ...data, updatedAt: serverTimestamp() })
}

async function remove(col: string, id: string): Promise<void> {
  await deleteDoc(doc(getDb(), col, id))
}

// ─── Users ──────────────────────────────────────────────────────

export const usersService = {
  getAll: (role?: string) =>
    role ? getAll("users", where("role", "==", role)) : getAll("users"),
  getById: (id: string) => getById("users", id),
  create: (data: DocumentData) => create("users", data),
  update: (id: string, data: DocumentData) => update("users", id, data),
  delete: (id: string) => remove("users", id),
}

// ─── Appointments ───────────────────────────────────────────────

export const appointmentsService = {
  getAll: (status?: string) =>
    status
      ? getAll("appointments", where("status", "==", status), orderBy("date", "desc"))
      : getAll("appointments", orderBy("date", "desc")),
  getByStudent: (studentId: string) =>
    getAll("appointments", where("studentId", "==", studentId), orderBy("date", "desc")),
  getByFaculty: (facultyId: string) =>
    getAll("appointments", where("facultyId", "==", facultyId), orderBy("date", "desc")),
  create: (data: DocumentData) => create("appointments", data),
  update: (id: string, data: DocumentData) => update("appointments", id, data),
  approve: (id: string) => update("appointments", id, { status: "approved" }),
  cancel: (id: string) => update("appointments", id, { status: "cancelled" }),
  complete: (id: string) => update("appointments", id, { status: "completed" }),
}

// ─── Faculty Availability ───────────────────────────────────────

export const availabilityService = {
  getByFaculty: (facultyId: string) =>
    getAll("faculty_availability", where("facultyId", "==", facultyId)),
  set: (data: DocumentData) => create("faculty_availability", data),
  update: (id: string, data: DocumentData) => update("faculty_availability", id, data),
  delete: (id: string) => remove("faculty_availability", id),
}

// ─── Materials ──────────────────────────────────────────────────

export const materialsService = {
  getAll: (topic?: string) =>
    topic
      ? getAll("materials", where("topic", "==", topic), orderBy("createdAt", "desc"))
      : getAll("materials", orderBy("createdAt", "desc")),
  getById: (id: string) => getById("materials", id),
  create: (data: DocumentData) => create("materials", data),
  update: (id: string, data: DocumentData) => update("materials", id, data),
  delete: (id: string) => remove("materials", id),
}

// ─── Schedules ──────────────────────────────────────────────────

export const schedulesService = {
  getAll: () => getAll("schedules", orderBy("date", "asc")),
  getByType: (type: string) =>
    getAll("schedules", where("type", "==", type), orderBy("date", "asc")),
  create: (data: DocumentData) => create("schedules", data),
  update: (id: string, data: DocumentData) => update("schedules", id, data),
  delete: (id: string) => remove("schedules", id),
}

// ─── Tests ──────────────────────────────────────────────────────

export const testsService = {
  getAll: () => getAll("tests", orderBy("createdAt", "desc")),
  getById: (id: string) => getById("tests", id),
  create: (data: DocumentData) => create("tests", data),
  update: (id: string, data: DocumentData) => update("tests", id, data),
  delete: (id: string) => remove("tests", id),
}

export const submissionsService = {
  getByTest: (testId: string) =>
    getAll("submissions", where("testId", "==", testId)),
  getByStudent: (studentId: string) =>
    getAll("submissions", where("studentId", "==", studentId), orderBy("submittedAt", "desc")),
  create: (data: DocumentData) => create("submissions", data),
}

export const resultsService = {
  getByStudent: (studentId: string) =>
    getAll("results", where("studentId", "==", studentId), orderBy("date", "desc")),
  getAll: () => getAll("results", orderBy("date", "desc")),
  create: (data: DocumentData) => create("results", data),
  publish: (id: string) => update("results", id, { published: true }),
}

// ─── Feedback ───────────────────────────────────────────────────

export const feedbackService = {
  getAll: () => getAll("feedback", orderBy("createdAt", "desc")),
  getByStudent: (studentId: string) =>
    getAll("feedback", where("studentId", "==", studentId)),
  create: (data: DocumentData) => create("feedback", data),
}

// ─── Notifications ──────────────────────────────────────────────

export const notificationsService = {
  getByUser: (userId: string) =>
    getAll("notifications", where("userId", "==", userId), orderBy("createdAt", "desc"), limit(50)),
  create: (data: DocumentData) => create("notifications", data),
  markRead: (id: string) => update("notifications", id, { read: true }),
  markAllRead: async (userId: string) => {
    const unread = await getAll<{ id: string }>(
      "notifications",
      where("userId", "==", userId),
      where("read", "==", false)
    )
    await Promise.all(unread.map((n) => update("notifications", n.id, { read: true })))
  },
}

// ─── Forum ──────────────────────────────────────────────────────

export const forumService = {
  getPosts: (category?: string) =>
    category
      ? getAll("forum_posts", where("category", "==", category), orderBy("createdAt", "desc"))
      : getAll("forum_posts", orderBy("createdAt", "desc")),
  getPost: (id: string) => getById("forum_posts", id),
  createPost: (data: DocumentData) => create("forum_posts", data),
  getComments: (postId: string) =>
    getAll("forum_comments", where("postId", "==", postId), orderBy("createdAt", "asc")),
  addComment: (data: DocumentData) => create("forum_comments", data),
  upvotePost: async (id: string, currentVotes: number) =>
    update("forum_posts", id, { upvotes: currentVotes + 1 }),
}

// ─── Resumes ────────────────────────────────────────────────────

export const resumesService = {
  getByUser: (userId: string) =>
    getAll("resumes", where("userId", "==", userId)),
  create: (data: DocumentData) => create("resumes", data),
  update: (id: string, data: DocumentData) => update("resumes", id, data),
}

// ─── Documents ──────────────────────────────────────────────────

export const documentsService = {
  getByUser: (userId: string) =>
    getAll("documents", where("userId", "==", userId)),
  create: (data: DocumentData) => create("documents", data),
  delete: (id: string) => remove("documents", id),
}

// ─── Counseling Notes ───────────────────────────────────────────

export const counselingNotesService = {
  getByStudent: (studentId: string) =>
    getAll("counseling_notes", where("studentId", "==", studentId), orderBy("createdAt", "desc")),
  create: (data: DocumentData) => create("counseling_notes", data),
}

// ─── Interview Feedback ─────────────────────────────────────────

export const interviewFeedbackService = {
  getByStudent: (studentId: string) =>
    getAll("interview_feedback", where("studentId", "==", studentId)),
  create: (data: DocumentData) => create("interview_feedback", data),
}
