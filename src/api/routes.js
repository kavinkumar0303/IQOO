/**
 * LearnIQ REST API Route Handlers
 * 
 * Standardized REST API endpoints serving Web and Future Flutter (Android/iOS) Apps.
 * All endpoints return the standard response format:
 * {
 *   "success": boolean,
 *   "data": any,
 *   "message": string,
 *   "timestamp": string (ISO 8601)
 * }
 */

import db from './database';
import authService from './authService';

// Standard response wrapper helper
export const formatResponse = (data = {}, message = 'Success', success = true, status = 200) => ({
  success,
  data,
  message,
  timestamp: new Date().toISOString(),
  statusCode: status
});

export const formatError = (message = 'An error occurred', status = 400, data = null) => ({
  success: false,
  data,
  message,
  timestamp: new Date().toISOString(),
  statusCode: status
});

/**
 * REST API Route Dispatcher / Handlers
 */
export const apiRoutes = {
  // ==========================================
  // AUTHENTICATION ENDPOINTS
  // ==========================================
  
  /**
   * POST /api/auth/login
   * Body: { role: 'student' | 'faculty', email?: string }
   */
  async login(body = {}) {
    try {
      const { role = 'student', email = '' } = body;
      const result = await authService.login(role, email);
      return formatResponse(result, 'Authentication successful', true, 200);
    } catch (e) {
      return formatError(e.message || 'Login failed', 401);
    }
  },

  /**
   * POST /api/auth/register
   * Body: { email, role, fullName, college, department }
   */
  async register(body = {}) {
    try {
      if (!body.email || !body.fullName) {
        return formatError('Email and full name are required', 400);
      }
      const result = await authService.register(body);
      return formatResponse(result, 'User registered successfully', true, 201);
    } catch (e) {
      return formatError(e.message || 'Registration failed', 400);
    }
  },

  /**
   * GET /api/auth/me
   * Headers: Authorization: Bearer <token>
   */
  async getMe() {
    const user = authService.getCurrentUser();
    if (!user) {
      return formatError('Unauthorized: Please login', 401);
    }
    return formatResponse(user, 'User profile retrieved', true, 200);
  },

  /**
   * POST /api/auth/refresh
   * Headers: Authorization: Bearer <token>
   */
  async refreshToken() {
    try {
      const tokens = await authService.refreshToken();
      return formatResponse(tokens, 'Token refreshed successfully', true, 200);
    } catch (e) {
      return formatError(e.message || 'Token refresh failed', 401);
    }
  },

  /**
   * POST /api/auth/logout
   */
  async logout() {
    await authService.logout();
    return formatResponse({ loggedOut: true }, 'Successfully logged out', true, 200);
  },

  // ==========================================
  // STUDENT & FACULTY PROFILES
  // ==========================================

  /**
   * GET /api/student/profile
   */
  async getStudentProfile() {
    const student = db.findOne('student_profiles', () => true);
    if (!student) {
      return formatError('Student profile not found', 404);
    }
    return formatResponse(student, 'Student profile loaded');
  },

  /**
   * PUT /api/student/profile
   */
  async updateStudentProfile(body = {}) {
    const student = db.findOne('student_profiles', () => true);
    if (!student) return formatError('Student profile not found', 404);
    
    const updated = db.update('student_profiles', student.id, body);
    return formatResponse(updated, 'Student profile updated');
  },

  /**
   * GET /api/faculty/profile
   */
  async getFacultyProfile() {
    const faculty = db.findOne('faculty_profiles', () => true);
    if (!faculty) {
      return formatError('Faculty profile not found', 404);
    }
    return formatResponse(faculty, 'Faculty profile loaded');
  },

  // ==========================================
  // CURRICULUM: SUBJECTS & TOPICS
  // ==========================================

  /**
   * GET /api/subjects
   */
  async getSubjects() {
    const subjects = db.getCollection('subjects');
    return formatResponse(subjects, 'Subjects retrieved');
  },

  /**
   * GET /api/subjects/:id
   */
  async getSubjectById(id) {
    const subject = db.findById('subjects', id);
    if (!subject) return formatError('Subject not found', 404);
    
    const topics = db.find('topics', t => t.subjectId === id);
    return formatResponse({ ...subject, topics }, 'Subject details retrieved');
  },

  /**
   * GET /api/topics?subjectId=sub-dsa
   */
  async getTopics(subjectId = null) {
    const filter = subjectId ? (t => t.subjectId === subjectId) : () => true;
    const topics = db.find('topics', filter);
    return formatResponse(topics, 'Topics retrieved');
  },

  // ==========================================
  // TIMETABLE & SCHEDULE
  // ==========================================

  /**
   * GET /api/timetable
   */
  async getTimetable() {
    const timetable = db.getCollection('timetable');
    return formatResponse(timetable, "Today's timetable schedule retrieved");
  },

  // ==========================================
  // LEARNING PROGRESS & STREAKS
  // ==========================================

  /**
   * GET /api/progress
   */
  async getProgress() {
    const progress = db.data.learning_progress || {};
    return formatResponse(progress, 'Learning progress data retrieved');
  },

  /**
   * PUT /api/progress/topic
   * Body: { topicId, mastery, status }
   */
  async updateTopicProgress(body = {}) {
    const { topicId, mastery, status } = body;
    if (!topicId) return formatError('topicId is required', 400);

    const topic = db.findById('topics', topicId);
    if (!topic) return formatError('Topic not found', 404);

    const updatedTopic = db.update('topics', topicId, {
      mastery: mastery !== undefined ? mastery : topic.mastery,
      status: status || topic.status
    });

    return formatResponse(updatedTopic, 'Topic progress updated');
  },

  // ==========================================
  // PRACTICE & CODE RUNNER
  // ==========================================

  /**
   * POST /api/practice/code/run
   * Body: { code, language, exerciseId }
   */
  async runCode(body = {}) {
    const { code = '', language = 'cpp', exerciseId = 'code-dsa-1' } = body;
    
    // Simulate server-side sandboxed compiler execution
    const testResults = [
      { id: 1, input: "arr = [1, 8, 7, 56, 90], n = 5", expected: "90", output: "90", passed: true, runtime: "2ms" },
      { id: 2, input: "arr = [5, 5, 5, 5], n = 4", expected: "5", output: "5", passed: true, runtime: "1ms" },
      { id: 3, input: "arr = [-10, -3, -50, -1], n = 4", expected: "-1", output: "-1", passed: true, runtime: "2ms" }
    ];

    const result = {
      exerciseId,
      language,
      status: "Success",
      compilerOutput: "Compilation successful (0 warnings, 0 errors).",
      testCases: testResults,
      allPassed: true,
      executionTime: "5ms",
      memoryUsage: "14.2MB"
    };

    return formatResponse(result, 'Code executed successfully');
  },

  /**
   * POST /api/practice/code/submit
   * Body: { code, language, exerciseId, studentId }
   */
  async submitCode(body = {}) {
    const { code = '', language = 'cpp', exerciseId = 'code-dsa-1', studentId = 'STD-2026-8841' } = body;
    
    const attempt = db.insert('practice_attempts', {
      studentId,
      exerciseId,
      exerciseType: 'code',
      subject: 'DSA',
      topic: 'Find Maximum Element',
      language,
      submittedCode: code,
      score: 100,
      passedCount: 3,
      totalTestCases: 3,
      runtimeAvg: "1.6ms",
      status: "Passed",
    });

    return formatResponse(attempt, 'Code submission accepted', true, 201);
  },

  /**
   * POST /api/practice/quiz/submit
   * Body: { quizId, selectedOption, studentId }
   */
  async submitQuiz(body = {}) {
    const { quizId = 'theory-math-1', selectedOption, studentId = 'STD-2026-8841' } = body;
    const isCorrect = selectedOption === 'A';

    const submission = db.insert('quiz_submissions', {
      studentId,
      quizId,
      subject: 'Engineering Mathematics',
      selectedOption,
      isCorrect,
      score: isCorrect ? 100 : 0
    });

    return formatResponse({
      ...submission,
      explanation: "By the Fundamental Power Rule of Calculus: ∫ xⁿ dx = (xⁿ⁺¹)/(n + 1) + C, for n ≠ -1. Substituting n = 2 gives ∫ x² dx = x³/3 + C.",
      aiTip: "Integration scales powers up by one and divides by the new exponent."
    }, isCorrect ? 'Correct answer!' : 'Incorrect answer, review feedback.');
  },

  // ==========================================
  // LEARNING LOGS (30-SECOND RAPID REFLECTIONS)
  // ==========================================

  /**
   * GET /api/logs
   */
  async getLearningLogs() {
    const logs = db.getCollection('learning_logs');
    return formatResponse(logs, 'Learning logs retrieved');
  },

  /**
   * POST /api/logs
   * Body: { subject, topic, reflection, studentId }
   */
  async createLearningLog(body = {}) {
    const { subject = 'DSA', topic = '30-Second Reflection', reflection = '', studentId = 'STD-2026-8841' } = body;

    const newLog = db.insert('learning_logs', {
      studentId,
      date: 'Today, Just now',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      subject,
      topic,
      category: 'Learning Log',
      score: '88%',
      status: 'Good',
      badgeColor: 'bg-[#20B86B]/15 text-[#20B86B] border-[#20B86B]/30',
      aiFeedback: reflection || 'Great reflection captured! Key concepts properly categorized into persistent memory.'
    });

    return formatResponse(newLog, 'Learning log created and indexed into vector memory', true, 201);
  },

  // ==========================================
  // LEARNING HISTORY (SEARCHABLE & FILTERABLE)
  // ==========================================

  /**
   * GET /api/history?search=DSA&status=Good
   */
  async getHistory(params = {}) {
    const { search = '', status = '', subject = '' } = params;
    let items = db.getCollection('learning_logs');

    if (search) {
      const q = search.toLowerCase();
      items = items.filter(i => 
        i.topic.toLowerCase().includes(q) || 
        i.subject.toLowerCase().includes(q) ||
        (i.aiFeedback && i.aiFeedback.toLowerCase().includes(q))
      );
    }
    if (status) {
      items = items.filter(i => i.status.toLowerCase() === status.toLowerCase());
    }
    if (subject) {
      items = items.filter(i => i.subject.toLowerCase() === subject.toLowerCase());
    }

    return formatResponse(items, `Retrieved ${items.length} history records`);
  },

  // ==========================================
  // LEARNING MAP (SKILL GRAPH)
  // ==========================================

  /**
   * GET /api/learning-map
   */
  async getLearningMap() {
    const nodes = db.data.learning_map_nodes || [];
    return formatResponse(nodes, 'Learning map nodes retrieved');
  },

  // ==========================================
  // RETENTION CHECKS (SPACED REPETITION)
  // ==========================================

  /**
   * GET /api/retention/question
   */
  async getRetentionQuestion() {
    const checks = db.getCollection('retention_checks');
    const question = checks.length > 0 ? checks[0] : null;
    return formatResponse(question, 'Active retention check retrieved');
  },

  /**
   * POST /api/retention/submit
   * Body: { checkId, selectedOption }
   */
  async submitRetention(body = {}) {
    const { checkId = 'ret-dsa-1', selectedOption } = body;
    const isCorrect = selectedOption === 'A';

    return formatResponse({
      checkId,
      selectedOption,
      isCorrect,
      retentionScoreBefore: 65,
      retentionScoreAfter: 89,
      memoryBoostPercent: '+24%',
      nextScheduledRecallDate: '2026-09-14T10:00:00Z',
      explanation: "Deleting the head node only requires updating the head pointer: head = head->next, which takes O(1) constant time with zero traversals."
    }, 'Retention recall submitted');
  },

  // ==========================================
  // AI SERVICES & COGNITIVE ANALYSIS
  // ==========================================

  /**
   * GET /api/ai/analysis
   */
  async getAIAnalysis() {
    const analysis = db.data.ai_analysis || {};
    return formatResponse(analysis, 'AI multidimensional analysis retrieved');
  },

  /**
   * GET /api/ai/recommendation
   */
  async getAIRecommendation() {
    const analysis = db.data.ai_analysis || {};
    return formatResponse(analysis.recommendation || {}, 'AI recommendation retrieved');
  },

  /**
   * POST /api/ai/chat
   * Body: { message, context?: string }
   */
  async sendAIChatMessage(body = {}) {
    const { message = '', context = '' } = body;
    if (!message.trim()) {
      return formatError('Message text is required', 400);
    }

    let replyText = "I analyzed your question regarding this concept. In your curriculum, this links directly to your DSA module. Keep focusing on edge cases!";
    const textLower = message.toLowerCase();

    if (textLower.includes('array') || textLower.includes('insertion')) {
      replyText = "Array insertion at index `i` requires shifting elements rightward, yielding O(n) worst-case time complexity. For O(1) amortized insertions, dynamic arrays double their capacity when full.";
    } else if (textLower.includes('math') || textLower.includes('integral')) {
      replyText = "For integration, recall the fundamental rule: ∫ xⁿ dx = (xⁿ⁺¹)/(n+1) + C. For trigonometric forms like ∫ sin(x) dx = -cos(x) + C.";
    } else if (textLower.includes('class') || textLower.includes('next') || textLower.includes('timetable')) {
      replyText = "Your next class is Data Structures (DSA301) with Mr. Aravind in AI Lab 3 (LIVE NOW)!";
    } else if (textLower.includes('streak') || textLower.includes('progress')) {
      replyText = "You are currently on a 5-day streak with 78% overall syllabus mastery. Keep going to unlock Tree Traversals!";
    }

    const aiMessage = {
      id: Date.now(),
      sender: 'ai',
      text: replyText,
      timestamp: new Date().toISOString(),
      suggestions: [
        "Give me a practice question",
        "Show my weak areas",
        "Explain with a code example"
      ]
    };

    return formatResponse(aiMessage, 'AI response generated');
  },

  // ==========================================
  // NOTIFICATIONS (IN-APP & PUSH TOKENS)
  // ==========================================

  /**
   * GET /api/notifications
   */
  async getNotifications() {
    const notifs = db.getCollection('notifications');
    return formatResponse(notifs, 'Notifications retrieved');
  },

  /**
   * PUT /api/notifications/:id/read
   */
  async markNotificationRead(id) {
    const updated = db.update('notifications', id, { unread: false });
    return formatResponse(updated, 'Notification marked as read');
  },

  /**
   * POST /api/notifications/register-token
   * Body: { platform: 'flutter_android' | 'flutter_ios', pushToken: string }
   */
  async registerDevicePushToken(body = {}) {
    const { platform = 'flutter_android', pushToken = '' } = body;
    if (!pushToken) {
      return formatError('pushToken is required', 400);
    }

    const user = authService.getCurrentUser() || { id: 'usr-std-01' };
    const registered = db.insert('device_tokens', {
      userId: user.id,
      platform,
      pushToken
    });

    return formatResponse(registered, 'Mobile push token registered successfully', true, 201);
  }
};

export default apiRoutes;
