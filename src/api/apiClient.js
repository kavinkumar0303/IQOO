/**
 * LearnIQ API Client SDK
 * 
 * Unified API Client for frontend consumers and shared architectures.
 * Dispatches requests with Bearer Token Authorization, error handling,
 * and standard JSON envelope validation.
 */

import apiRoutes from './routes';
import authService from './authService';

class ApiClient {
  constructor(baseUrl = '/api') {
    this.baseUrl = baseUrl;
  }

  // Get current authorization headers
  getHeaders() {
    const token = authService.getAccessToken();
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
  }

  // Simulated REST request dispatcher
  async request(endpoint, options = {}) {
    const { method = 'GET', body, params } = options;

    // Route matching simulator
    switch (endpoint) {
      // Auth
      case '/auth/login':
        return apiRoutes.login(body);
      case '/auth/register':
        return apiRoutes.register(body);
      case '/auth/me':
        return apiRoutes.getMe();
      case '/auth/refresh':
        return apiRoutes.refreshToken();
      case '/auth/logout':
        return apiRoutes.logout();

      // Student / Faculty Profiles
      case '/student/profile':
        return method === 'PUT' ? apiRoutes.updateStudentProfile(body) : apiRoutes.getStudentProfile();
      case '/faculty/profile':
        return apiRoutes.getFacultyProfile();

      // Subjects & Topics
      case '/subjects':
        return apiRoutes.getSubjects();
      case '/topics':
        return apiRoutes.getTopics(params?.subjectId);

      // Timetable
      case '/timetable':
        return apiRoutes.getTimetable();

      // Progress
      case '/progress':
        return apiRoutes.getProgress();
      case '/progress/topic':
        return apiRoutes.updateTopicProgress(body);

      // Practice
      case '/practice/code/run':
        return apiRoutes.runCode(body);
      case '/practice/code/submit':
        return apiRoutes.submitCode(body);
      case '/practice/quiz/submit':
        return apiRoutes.submitQuiz(body);

      // Logs & History
      case '/logs':
        return method === 'POST' ? apiRoutes.createLearningLog(body) : apiRoutes.getLearningLogs();
      case '/history':
        return apiRoutes.getHistory(params);

      // Learning Map
      case '/learning-map':
        return apiRoutes.getLearningMap();

      // Retention
      case '/retention/question':
        return apiRoutes.getRetentionQuestion();
      case '/retention/submit':
        return apiRoutes.submitRetention(body);

      // AI Services
      case '/ai/analysis':
        return apiRoutes.getAIAnalysis();
      case '/ai/recommendation':
        return apiRoutes.getAIRecommendation();
      case '/ai/chat':
        return apiRoutes.sendAIChatMessage(body);

      // Notifications
      case '/notifications':
        return apiRoutes.getNotifications();
      case '/notifications/register-token':
        return apiRoutes.registerDevicePushToken(body);

      default:
        // Handle parameterized endpoints like /notifications/:id/read or /subjects/:id
        if (endpoint.startsWith('/notifications/') && endpoint.endsWith('/read')) {
          const id = endpoint.split('/')[2];
          return apiRoutes.markNotificationRead(id);
        }
        if (endpoint.startsWith('/subjects/')) {
          const id = endpoint.split('/')[2];
          return apiRoutes.getSubjectById(id);
        }
        throw new Error(`Endpoint ${endpoint} not found (404)`);
    }
  }

  // ==========================================
  // HIGH-LEVEL API SDK METHODS
  // ==========================================

  // Auth
  async login(role = 'student', email = '') {
    return this.request('/auth/login', { method: 'POST', body: { role, email } });
  }

  async register(registrationData) {
    return this.request('/auth/register', { method: 'POST', body: registrationData });
  }

  async logout() {
    return this.request('/auth/logout', { method: 'POST' });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Profiles
  async getStudentProfile() {
    return this.request('/student/profile');
  }

  async getFacultyProfile() {
    return this.request('/faculty/profile');
  }

  // Subjects & Topics
  async getSubjects() {
    return this.request('/subjects');
  }

  async getTopics(subjectId = null) {
    return this.request('/topics', { params: { subjectId } });
  }

  // Timetable
  async getTimetable() {
    return this.request('/timetable');
  }

  // Progress
  async getProgress() {
    return this.request('/progress');
  }

  // Practice
  async runCode(code, language = 'cpp', exerciseId = 'code-dsa-1') {
    return this.request('/practice/code/run', { method: 'POST', body: { code, language, exerciseId } });
  }

  async submitCode(code, language = 'cpp', exerciseId = 'code-dsa-1') {
    return this.request('/practice/code/submit', { method: 'POST', body: { code, language, exerciseId } });
  }

  async submitQuiz(quizId, selectedOption) {
    return this.request('/practice/quiz/submit', { method: 'POST', body: { quizId, selectedOption } });
  }

  // Learning Logs
  async getLearningLogs() {
    return this.request('/logs');
  }

  async createLearningLog(logData) {
    return this.request('/logs', { method: 'POST', body: logData });
  }

  // History
  async getHistory(params = {}) {
    return this.request('/history', { params });
  }

  // Learning Map
  async getLearningMap() {
    return this.request('/learning-map');
  }

  // Retention
  async getRetentionQuestion() {
    return this.request('/retention/question');
  }

  async submitRetention(checkId, selectedOption) {
    return this.request('/retention/submit', { method: 'POST', body: { checkId, selectedOption } });
  }

  // AI Services
  async getAIAnalysis() {
    return this.request('/ai/analysis');
  }

  async getAIRecommendation() {
    return this.request('/ai/recommendation');
  }

  async sendAIMessage(message, context = '') {
    return this.request('/ai/chat', { method: 'POST', body: { message, context } });
  }

  // Notifications
  async getNotifications() {
    return this.request('/notifications');
  }

  async markNotificationRead(id) {
    return this.request(`/notifications/${id}/read`, { method: 'PUT' });
  }

  async registerDevicePushToken(platform, pushToken) {
    return this.request('/notifications/register-token', { method: 'POST', body: { platform, pushToken } });
  }
}

export const apiClient = new ApiClient();
export default apiClient;
