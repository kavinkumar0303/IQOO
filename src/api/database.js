/**
 * LearnIQ Normalized Relational Database Engine
 * 
 * Shared Database Schema & Store supporting both Web & Future Flutter App.
 * Provides normalized tables, primary/foreign key relationships, and query helpers.
 */

import { 
  studentProfile, 
  facultyProfile, 
  todaySchedule, 
  subjectProgressList, 
  learningHistoryList, 
  journeyStages, 
  codeExercise, 
  theoryExercise, 
  retentionExercise, 
  learningMapNodes, 
  aiBrainMetrics, 
  aiRecommendation,
  streakDays 
} from '../data/mockData';

const DB_STORAGE_KEY = 'learniq_database_v1';

// Initial Database State
const initialDatabase = {
  users: [
    {
      id: 'usr-std-01',
      username: 'kavin',
      email: 'kavin.k@learniq.edu',
      role: 'student',
      profileId: 'STD-2026-8841',
      isActive: true,
      createdAt: '2026-08-01T08:00:00Z',
      lastLogin: '2026-09-07T08:30:00Z',
    },
    {
      id: 'usr-fac-01',
      username: 'aravind',
      email: 'aravind.s@learniq.edu',
      role: 'faculty',
      profileId: 'FAC-1002',
      isActive: true,
      createdAt: '2026-07-15T08:00:00Z',
      lastLogin: '2026-09-07T09:00:00Z',
    }
  ],

  student_profiles: [
    {
      ...studentProfile,
      userId: 'usr-std-01',
      gpa: '3.88',
      creditsCompleted: 98,
      totalCredits: 128,
      enrolledSubjects: ['sub-dsa', 'sub-java', 'sub-math', 'sub-dbms', 'sub-python'],
    }
  ],

  faculty_profiles: [
    {
      ...facultyProfile,
      userId: 'usr-fac-01',
      office: 'CS Building, Room 312',
      officeHours: 'Mon-Thu 2:00 PM - 4:00 PM',
      assignedSubjects: ['sub-dsa'],
    }
  ],

  subjects: [
    {
      id: "sub-dsa",
      code: "CS301",
      name: "Data Structures & Algorithms",
      short: "DSA",
      icon: "Code2",
      semester: 6,
      department: "CSE",
      credits: 4,
      instructorId: "FAC-1002",
      instructorName: "Mr. Aravind",
      progress: 85,
      totalTopics: 24,
      completedTopics: 20,
      gradient: "from-[#FF7A00] to-[#FFD84D]",
      colorHex: "#FF7A00",
      status: "High Mastery",
      description: "Mastery of linear and non-linear data structures, algorithm analysis, and asymptotic bounds."
    },
    {
      id: "sub-java",
      code: "JAVA204",
      name: "Java Programming",
      short: "Java",
      icon: "Coffee",
      semester: 6,
      department: "CSE",
      credits: 3,
      instructorId: "FAC-1003",
      instructorName: "Dr. Rajesh",
      progress: 72,
      totalTopics: 18,
      completedTopics: 13,
      gradient: "from-[#FF1681] to-[#FF7A00]",
      colorHex: "#FF1681",
      status: "On Track",
      description: "Object-oriented software development, memory lifecycle, generics, and concurrent programming in Java."
    },
    {
      id: "sub-math",
      code: "MATH201",
      name: "Engineering Mathematics",
      short: "Math",
      icon: "Binary",
      semester: 6,
      department: "Mathematics",
      credits: 4,
      instructorId: "FAC-1004",
      instructorName: "Prof. Priya Raman",
      progress: 64,
      totalTopics: 22,
      completedTopics: 14,
      gradient: "from-[#EC087F] to-[#8E168F]",
      colorHex: "#EC087F",
      status: "Needs Focus",
      description: "Multivariable calculus, differential equations, Fourier series, and Laplace transforms."
    },
    {
      id: "sub-dbms",
      code: "CS402",
      name: "Database Management Systems",
      short: "DBMS",
      icon: "Database",
      semester: 6,
      department: "CSE",
      credits: 4,
      instructorId: "FAC-1005",
      instructorName: "Prof. Meera Sen",
      progress: 91,
      totalTopics: 16,
      completedTopics: 15,
      gradient: "from-[#20B86B] to-[#FFC928]",
      colorHex: "#20B86B",
      status: "Excellent",
      description: "Relational algebra, SQL query optimization, transaction management, ACID properties, and normalization."
    },
    {
      id: "sub-python",
      code: "AI305",
      name: "Python for AI & ML",
      short: "Python",
      icon: "Terminal",
      semester: 6,
      department: "AI & DS",
      credits: 3,
      instructorId: "FAC-1006",
      instructorName: "Dr. Sanjay Nair",
      progress: 78,
      totalTopics: 20,
      completedTopics: 16,
      gradient: "from-[#8E168F] to-[#FF1681]",
      colorHex: "#8E168F",
      status: "Steady Growth",
      description: "Python numerical programming with NumPy, Pandas, Scikit-Learn, and foundation models."
    }
  ],

  topics: [
    { id: "top-dsa-01", subjectId: "sub-dsa", name: "Arrays & Dynamic Memory", mastery: 94, status: "completed", order: 1 },
    { id: "top-dsa-02", subjectId: "sub-dsa", name: "Singly & Doubly Linked Lists", mastery: 88, status: "completed", order: 2 },
    { id: "top-dsa-03", subjectId: "sub-dsa", name: "Stack & Queue Implementations", mastery: 64, status: "in-progress", order: 3 },
    { id: "top-dsa-04", subjectId: "sub-dsa", name: "Binary Trees & BST Traversals", mastery: 48, status: "revision", order: 4 },
    { id: "top-dsa-05", subjectId: "sub-dsa", name: "Dynamic Programming Foundations", mastery: 0, status: "locked", order: 5 },
    
    { id: "top-java-01", subjectId: "sub-java", name: "OOP Principles & Encapsulation", mastery: 92, status: "completed", order: 1 },
    { id: "top-java-02", subjectId: "sub-java", name: "Inheritance & Polymorphism", mastery: 86, status: "completed", order: 2 },
    { id: "top-java-03", subjectId: "sub-java", name: "Exception Handling & Try-Catch", mastery: 70, status: "in-progress", order: 3 },
    { id: "top-java-04", subjectId: "sub-java", name: "Multithreading & Synchronization", mastery: 0, status: "locked", order: 4 },

    { id: "top-math-01", subjectId: "sub-math", name: "Limits & Continuous Functions", mastery: 85, status: "completed", order: 1 },
    { id: "top-math-02", subjectId: "sub-math", name: "Definite Integration by Parts", mastery: 52, status: "revision", order: 2 },
    { id: "top-math-03", subjectId: "sub-math", name: "Higher-Order Differential Equations", mastery: 60, status: "in-progress", order: 3 },
    { id: "top-math-04", subjectId: "sub-math", name: "Laplace & Inverse Transforms", mastery: 0, status: "locked", order: 4 },

    { id: "top-dbms-01", subjectId: "sub-dbms", name: "Relational Algebra & Schemas", mastery: 96, status: "completed", order: 1 },
    { id: "top-dbms-02", subjectId: "sub-dbms", name: "Complex SQL Joins & Subqueries", mastery: 94, status: "completed", order: 2 },
    { id: "top-dbms-03", subjectId: "sub-dbms", name: "Normalization (1NF to BCNF)", mastery: 68, status: "in-progress", order: 3 },
    { id: "top-dbms-04", subjectId: "sub-dbms", name: "ACID Transactions & Lock Protocols", mastery: 55, status: "revision", order: 4 }
  ],

  timetable: todaySchedule.map(item => ({
    ...item,
    studentId: 'STD-2026-8841',
    date: '2026-09-07'
  })),

  learning_progress: {
    studentId: 'STD-2026-8841',
    overallMastery: 78,
    streakCount: 5,
    streakDays: streakDays,
    completedTopicsTotal: 12,
    todayClassesCount: 3,
    lastCalculated: '2026-09-07T12:00:00Z'
  },

  practice_attempts: [
    {
      id: "prc-001",
      studentId: "STD-2026-8841",
      exerciseId: codeExercise.id,
      exerciseType: "code",
      subject: "DSA",
      topic: "Find Maximum Element",
      language: "cpp",
      submittedCode: codeExercise.starterCode,
      score: 100,
      passedCount: 3,
      totalTestCases: 3,
      runtimeAvg: "1.6ms",
      status: "Passed",
      submittedAt: "2026-09-06T10:15:00Z"
    }
  ],

  quiz_submissions: [
    {
      id: "qsub-001",
      studentId: "STD-2026-8841",
      quizId: theoryExercise.id,
      subject: "Engineering Mathematics",
      selectedOption: "A",
      isCorrect: true,
      score: 100,
      submittedAt: "2026-09-06T11:45:00Z"
    }
  ],

  learning_logs: learningHistoryList.map(log => ({
    ...log,
    studentId: 'STD-2026-8841',
    createdAt: '2026-09-06T10:15:00Z'
  })),

  ai_analysis: {
    studentId: 'STD-2026-8841',
    metrics: aiBrainMetrics,
    recommendation: aiRecommendation,
    cognitiveScore: 82,
    updatedAt: '2026-09-07T11:00:00Z'
  },

  learning_map_nodes: learningMapNodes,

  retention_checks: [
    {
      ...retentionExercise,
      studentId: 'STD-2026-8841',
      lastTested: '2026-09-02T10:00:00Z',
      nextScheduledRecall: '2026-09-07T10:00:00Z',
      decayScore: 65,
      postRecallScore: 89
    }
  ],

  notifications: [
    { 
      id: "notif-001", 
      userId: "usr-std-01",
      title: "Class Starting", 
      text: "DSA Live class with Mr. Aravind is starting now in Lab 3!", 
      time: "Just now", 
      type: "timetable",
      unread: true,
      createdAt: new Date().toISOString()
    },
    { 
      id: "notif-002", 
      userId: "usr-std-01",
      title: "Mastery Update", 
      text: "AI Analysis: Your array traversal mastery increased to 94%", 
      time: "15m ago", 
      type: "ai_analysis",
      unread: true,
      createdAt: new Date(Date.now() - 15 * 60000).toISOString()
    },
    { 
      id: "notif-003", 
      userId: "usr-std-01",
      title: "Retention Recall", 
      text: "Retention recall ready: Singly Linked Lists review", 
      time: "1h ago", 
      type: "retention",
      unread: false,
      createdAt: new Date(Date.now() - 60 * 60000).toISOString()
    },
  ],

  device_tokens: [
    {
      id: "dev-001",
      userId: "usr-std-01",
      platform: "flutter_android",
      pushToken: "fcm_token_sample_learniq_android_2026",
      registeredAt: "2026-09-07T08:00:00Z"
    }
  ]
};

// Database Engine Class
class LearnIQDatabase {
  constructor() {
    this.data = this.loadFromStorage();
  }

  loadFromStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem(DB_STORAGE_KEY);
        if (stored) {
          return JSON.parse(stored);
        }
      }
    } catch (e) {
      console.warn('[LearnIQ DB] LocalStorage unavailable, using in-memory database:', e);
    }
    return JSON.parse(JSON.stringify(initialDatabase));
  }

  saveToStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(this.data));
      }
    } catch (e) {
      console.warn('[LearnIQ DB] Failed to persist database state:', e);
    }
  }

  // Generic Query Helpers
  find(collection, filterFn = () => true) {
    if (!this.data[collection]) return [];
    return this.data[collection].filter(filterFn);
  }

  findOne(collection, filterFn) {
    if (!this.data[collection]) return null;
    return this.data[collection].find(filterFn) || null;
  }

  findById(collection, id) {
    return this.findOne(collection, item => item.id === id);
  }

  insert(collection, item) {
    if (!this.data[collection]) {
      this.data[collection] = [];
    }
    const record = {
      ...item,
      id: item.id || `${collection.slice(0, 3)}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: item.createdAt || new Date().toISOString()
    };
    this.data[collection].unshift(record);
    this.saveToStorage();
    return record;
  }

  update(collection, id, updates) {
    if (!this.data[collection]) return null;
    const index = this.data[collection].findIndex(item => item.id === id);
    if (index === -1) return null;
    
    this.data[collection][index] = {
      ...this.data[collection][index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.saveToStorage();
    return this.data[collection][index];
  }

  delete(collection, id) {
    if (!this.data[collection]) return false;
    const initialLen = this.data[collection].length;
    this.data[collection] = this.data[collection].filter(item => item.id !== id);
    if (this.data[collection].length !== initialLen) {
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Direct table accessors
  getCollection(name) {
    return this.data[name] || [];
  }

  setDocument(collection, data) {
    this.data[collection] = data;
    this.saveToStorage();
    return this.data[collection];
  }

  reset() {
    this.data = JSON.parse(JSON.stringify(initialDatabase));
    this.saveToStorage();
    return this.data;
  }
}

// Export singleton database instance
export const db = new LearnIQDatabase();
export default db;
