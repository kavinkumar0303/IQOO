import '../models/api_response.dart';
import '../models/practice_model.dart';
import '../models/learning_log_model.dart';
import '../models/retention_model.dart';
import '../services/api_client.dart';

class PracticeRepository {
  final LearnIQApiClient apiClient;

  PracticeRepository({required this.apiClient});

  /// Executes code in sandbox
  Future<ApiResponse<CodeRunResult>> runCode({
    required String code,
    String language = 'cpp',
    String exerciseId = 'code-dsa-1',
  }) async {
    return apiClient.post<CodeRunResult>(
      '/practice/code/run',
      body: {
        'code': code,
        'language': language,
        'exerciseId': exerciseId,
      },
      fromJson: (json) => CodeRunResult.fromJson(json as Map<String, dynamic>),
    );
  }

  /// Submits completed code solution
  Future<ApiResponse<Map<String, dynamic>>> submitCode({
    required String code,
    String language = 'cpp',
    String exerciseId = 'code-dsa-1',
    String? studentId,
  }) async {
    return apiClient.post<Map<String, dynamic>>(
      '/practice/code/submit',
      body: {
        'code': code,
        'language': language,
        'exerciseId': exerciseId,
        if (studentId != null) 'studentId': studentId,
      },
    );
  }

  /// Submits conceptual MCQ answer
  Future<ApiResponse<Map<String, dynamic>>> submitQuiz({
    required String quizId,
    required String selectedOption,
    String? studentId,
  }) async {
    return apiClient.post<Map<String, dynamic>>(
      '/practice/quiz/submit',
      body: {
        'quizId': quizId,
        'selectedOption': selectedOption,
        if (studentId != null) 'studentId': studentId,
      },
    );
  }

  /// Creates a 30-second rapid learning log
  Future<ApiResponse<LearningLog>> createLearningLog({
    required String subject,
    required String topic,
    required String reflection,
  }) async {
    return apiClient.post<LearningLog>(
      '/logs',
      body: {
        'subject': subject,
        'topic': topic,
        'reflection': reflection,
      },
      fromJson: (json) => LearningLog.fromJson(json as Map<String, dynamic>),
    );
  }

  /// Fetches learning logs list
  Future<ApiResponse<List<LearningLog>>> getLearningLogs() async {
    return apiClient.get<List<LearningLog>>(
      '/logs',
      fromJson: (json) => (json as List<dynamic>)
          .map((e) => LearningLog.fromJson(e as Map<String, dynamic>))
          .toList(),
    );
  }

  /// Submits spaced repetition recall test
  Future<ApiResponse<RetentionResult>> submitRetention({
    required String checkId,
    required String selectedOption,
  }) async {
    return apiClient.post<RetentionResult>(
      '/retention/submit',
      body: {
        'checkId': checkId,
        'selectedOption': selectedOption,
      },
      fromJson: (json) => RetentionResult.fromJson(json as Map<String, dynamic>),
    );
  }
}
