"use client"

import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { auth, db, isFirebaseConfigured } from "@/lib/firebase"
import type { UserRole } from "@/lib/career-school-data"

export interface AppUser {
  uid: string
  email: string
  name: string
  role: UserRole
  avatar?: string
}

interface AuthContextType {
  user: AppUser | null
  loading: boolean
  demoMode: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string, role?: UserRole) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  setDemoUser: (role: UserRole) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}

const demoUsers: Record<string, AppUser> = {
  student: { uid: "demo-student", email: "rahul@student.com", name: "Rahul Sharma", role: "student" },
  admin: { uid: "demo-admin", email: "admin@careerschool.com", name: "Admin User", role: "admin" },
  teacher: { uid: "demo-teacher", email: "rakesh@faculty.com", name: "Prof. Rakesh Jain", role: "teacher" },
  mentor: { uid: "demo-mentor", email: "sneha@faculty.com", name: "Ms. Sneha Roy", role: "mentor" },
  counselor: { uid: "demo-counselor", email: "priya@faculty.com", name: "Dr. Priya Mehta", role: "counselor" },
  hr_interviewer: { uid: "demo-hr", email: "anil@faculty.com", name: "Mr. Anil Kumar", role: "hr_interviewer" },
  super_admin: { uid: "demo-super", email: "super@careerschool.com", name: "Super Admin", role: "super_admin" },
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)
  const demoMode = !isFirebaseConfigured

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false)
      return
    }

    let cancelled = false
    import("firebase/auth").then(({ onAuthStateChanged }) => {
      const unsub = onAuthStateChanged(auth!, async (fbUser) => {
        if (cancelled) return
        if (fbUser) {
          let profile: AppUser | null = null
          if (db) {
            try {
              const { doc, getDoc } = await import("firebase/firestore")
              const snap = await getDoc(doc(db!, "users", fbUser.uid))
              if (snap.exists()) profile = { uid: fbUser.uid, ...snap.data() } as AppUser
            } catch { /* ignore */ }
          }
          setUser(profile ?? {
            uid: fbUser.uid,
            email: fbUser.email ?? "",
            name: fbUser.displayName ?? "User",
            role: "student",
          })
        } else {
          setUser(null)
        }
        setLoading(false)
      })
      return unsub
    })

    return () => { cancelled = true }
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    if (!isFirebaseConfigured || !auth) {
      const role = email.includes("admin") ? "admin" : "student"
      setUser(demoUsers[role])
      return
    }
    const { signInWithEmailAndPassword } = await import("firebase/auth")
    await signInWithEmailAndPassword(auth!, email, password)
  }, [])

  const signUp = useCallback(async (email: string, password: string, name: string, role: UserRole = "student") => {
    if (!isFirebaseConfigured || !auth) {
      setUser({ uid: "demo-new", email, name, role })
      return
    }
    const { createUserWithEmailAndPassword } = await import("firebase/auth")
    const { doc, setDoc, serverTimestamp } = await import("firebase/firestore")
    const cred = await createUserWithEmailAndPassword(auth!, email, password)
    if (db) {
      await setDoc(doc(db!, "users", cred.user.uid), { email, name, role, createdAt: serverTimestamp() })
    }
  }, [])

  const signInWithGoogle = useCallback(async () => {
    if (!isFirebaseConfigured || !auth) {
      setUser(demoUsers.student)
      return
    }
    const { GoogleAuthProvider, signInWithPopup } = await import("firebase/auth")
    const provider = new GoogleAuthProvider()
    const cred = await signInWithPopup(auth!, provider)
    if (db) {
      const { doc, getDoc, setDoc, serverTimestamp } = await import("firebase/firestore")
      const snap = await getDoc(doc(db!, "users", cred.user.uid))
      if (!snap.exists()) {
        await setDoc(doc(db!, "users", cred.user.uid), {
          email: cred.user.email,
          name: cred.user.displayName ?? "User",
          role: "student",
          avatar: cred.user.photoURL,
          createdAt: serverTimestamp(),
        })
      }
    }
  }, [])

  const signOut = useCallback(async () => {
    if (isFirebaseConfigured && auth) {
      const { signOut: fbSignOut } = await import("firebase/auth")
      await fbSignOut(auth!)
    }
    setUser(null)
  }, [])

  const resetPassword = useCallback(async (email: string) => {
    if (!isFirebaseConfigured || !auth) return
    const { sendPasswordResetEmail } = await import("firebase/auth")
    await sendPasswordResetEmail(auth!, email)
  }, [])

  const setDemoUser = useCallback((role: UserRole) => {
    setUser(demoUsers[role] ?? demoUsers.student)
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, loading, demoMode, signIn, signUp, signInWithGoogle, signOut, resetPassword, setDemoUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
