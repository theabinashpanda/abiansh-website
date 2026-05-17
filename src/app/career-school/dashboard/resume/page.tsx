"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  GraduationCap,
  Briefcase,
  Code2,
  FolderOpen,
  ChevronDown,
  ChevronUp,
  Download,
  Sparkles,
  X,
  Mail,
  Phone,
  MapPin,
  Link,
} from "lucide-react";

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  summary: string;
}

interface Education {
  institution: string;
  degree: string;
  year: string;
  gpa: string;
}

interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string;
}

interface Project {
  name: string;
  tech: string;
  description: string;
}

const defaultPersonal: PersonalInfo = {
  name: "Abinash Panda",
  email: "abinash@example.com",
  phone: "+91 98765 43210",
  location: "Bangalore, India",
  linkedin: "linkedin.com/in/abinash",
  summary:
    "Final year Computer Science student passionate about full-stack development and system design. Looking for opportunities in software engineering.",
};

const defaultEducation: Education[] = [
  {
    institution: "Indian Institute of Technology, Kharagpur",
    degree: "B.Tech in Computer Science & Engineering",
    year: "2022 - 2026",
    gpa: "8.7/10",
  },
];

const defaultExperience: Experience[] = [
  {
    company: "Google",
    role: "Software Engineering Intern",
    duration: "May 2025 - Aug 2025",
    description:
      "Worked on distributed systems for Google Cloud Platform. Improved query latency by 15%.",
  },
  {
    company: "Startup XYZ",
    role: "Full Stack Developer Intern",
    duration: "Dec 2024 - Feb 2025",
    description:
      "Built React dashboards and Node.js APIs serving 10K+ daily users.",
  },
];

const defaultSkills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Docker",
  "AWS",
  "Git",
];

const defaultProjects: Project[] = [
  {
    name: "E-Commerce Platform",
    tech: "Next.js, Stripe, PostgreSQL",
    description:
      "Full-stack e-commerce app with payment integration and admin dashboard.",
  },
  {
    name: "Real-time Chat App",
    tech: "React, Socket.io, Redis",
    description:
      "Scalable chat application supporting 1000+ concurrent users with message persistence.",
  },
];

const mockAIFeedback = {
  atsScore: 78,
  suggestions: [
    "Add more quantifiable achievements to your experience section",
    "Include relevant coursework or certifications",
    "Your summary could be more specific about target roles",
    "Add action verbs at the start of bullet points",
    "Consider adding a technical blog or portfolio link",
  ],
};

type Section = "personal" | "education" | "experience" | "skills" | "projects";

export default function ResumePage() {
  const [expandedSection, setExpandedSection] = useState<Section | null>(
    "personal"
  );
  const [showAIReview, setShowAIReview] = useState(false);
  const [personal] = useState(defaultPersonal);
  const [education] = useState(defaultEducation);
  const [experience] = useState(defaultExperience);
  const [skills] = useState(defaultSkills);
  const [projects] = useState(defaultProjects);

  const sections: { key: Section; label: string; icon: React.ReactNode }[] = [
    { key: "personal", label: "Personal Info", icon: <User size={18} /> },
    {
      key: "education",
      label: "Education",
      icon: <GraduationCap size={18} />,
    },
    { key: "experience", label: "Experience", icon: <Briefcase size={18} /> },
    { key: "skills", label: "Skills", icon: <Code2 size={18} /> },
    { key: "projects", label: "Projects", icon: <FolderOpen size={18} /> },
  ];

  const toggleSection = (section: Section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Resume Builder
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Build and preview your professional resume
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAIReview(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Sparkles size={14} /> AI Review
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
            <Download size={14} /> Export to PDF
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-3"
        >
          {sections.map((section) => (
            <div
              key={section.key}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.key)}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-indigo-600 dark:text-indigo-400">
                    {section.icon}
                  </span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {section.label}
                  </span>
                </div>
                {expandedSection === section.key ? (
                  <ChevronUp size={18} className="text-slate-400" />
                ) : (
                  <ChevronDown size={18} className="text-slate-400" />
                )}
              </button>

              <AnimatePresence>
                {expandedSection === section.key && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-slate-200 dark:border-slate-800"
                  >
                    <div className="p-4 space-y-3">
                      {section.key === "personal" && (
                        <>
                          <input
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white"
                            defaultValue={personal.name}
                            placeholder="Full Name"
                          />
                          <input
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white"
                            defaultValue={personal.email}
                            placeholder="Email"
                          />
                          <input
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white"
                            defaultValue={personal.phone}
                            placeholder="Phone"
                          />
                          <input
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white"
                            defaultValue={personal.location}
                            placeholder="Location"
                          />
                          <textarea
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white resize-none"
                            rows={3}
                            defaultValue={personal.summary}
                            placeholder="Professional Summary"
                          />
                        </>
                      )}
                      {section.key === "education" &&
                        education.map((edu, i) => (
                          <div key={i} className="space-y-2">
                            <input
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white"
                              defaultValue={edu.institution}
                              placeholder="Institution"
                            />
                            <input
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white"
                              defaultValue={edu.degree}
                              placeholder="Degree"
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white"
                                defaultValue={edu.year}
                                placeholder="Year"
                              />
                              <input
                                className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white"
                                defaultValue={edu.gpa}
                                placeholder="GPA"
                              />
                            </div>
                          </div>
                        ))}
                      {section.key === "experience" &&
                        experience.map((exp, i) => (
                          <div
                            key={i}
                            className="space-y-2 pb-3 border-b border-slate-100 dark:border-slate-800 last:border-0"
                          >
                            <input
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white"
                              defaultValue={exp.company}
                              placeholder="Company"
                            />
                            <input
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white"
                              defaultValue={exp.role}
                              placeholder="Role"
                            />
                            <input
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white"
                              defaultValue={exp.duration}
                              placeholder="Duration"
                            />
                            <textarea
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white resize-none"
                              rows={2}
                              defaultValue={exp.description}
                              placeholder="Description"
                            />
                          </div>
                        ))}
                      {section.key === "skills" && (
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                          <button className="px-3 py-1 border border-dashed border-slate-300 dark:border-slate-600 text-slate-500 rounded-full text-xs">
                            + Add Skill
                          </button>
                        </div>
                      )}
                      {section.key === "projects" &&
                        projects.map((proj, i) => (
                          <div
                            key={i}
                            className="space-y-2 pb-3 border-b border-slate-100 dark:border-slate-800 last:border-0"
                          >
                            <input
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white"
                              defaultValue={proj.name}
                              placeholder="Project Name"
                            />
                            <input
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white"
                              defaultValue={proj.tech}
                              placeholder="Technologies"
                            />
                            <textarea
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white resize-none"
                              rows={2}
                              defaultValue={proj.description}
                              placeholder="Description"
                            />
                          </div>
                        ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

        {/* Right Panel - Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 h-fit sticky top-6"
        >
          <div className="border-b border-slate-200 dark:border-slate-700 pb-4 mb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {personal.name}
            </h2>
            <div className="flex flex-wrap gap-3 mt-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Mail size={12} /> {personal.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone size={12} /> {personal.phone}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={12} /> {personal.location}
              </span>
              <span className="flex items-center gap-1">
                <Link size={12} /> {personal.linkedin}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              {personal.summary}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300 mb-2">
                Education
              </h3>
              {education.map((edu, i) => (
                <div key={i} className="text-xs">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {edu.institution}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    {edu.degree} | {edu.year} | GPA: {edu.gpa}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300 mb-2">
                Experience
              </h3>
              {experience.map((exp, i) => (
                <div key={i} className="text-xs mb-2">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {exp.role} - {exp.company}
                  </p>
                  <p className="text-slate-500 dark:text-slate-500 italic">
                    {exp.duration}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300 mb-2">
                Skills
              </h3>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-[10px]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300 mb-2">
                Projects
              </h3>
              {projects.map((proj, i) => (
                <div key={i} className="text-xs mb-2">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {proj.name}{" "}
                    <span className="font-normal text-slate-500">
                      ({proj.tech})
                    </span>
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* AI Review Modal */}
      <AnimatePresence>
        {showAIReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles
                    size={20}
                    className="text-purple-600 dark:text-purple-400"
                  />
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    AI Resume Review
                  </h3>
                </div>
                <button
                  onClick={() => setShowAIReview(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  ATS Compatibility Score
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${mockAIFeedback.atsScore}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-purple-600 rounded-full"
                    />
                  </div>
                  <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    {mockAIFeedback.atsScore}%
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Suggestions
                </p>
                <ul className="space-y-2">
                  {mockAIFeedback.suggestions.map((suggestion, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                      {suggestion}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
