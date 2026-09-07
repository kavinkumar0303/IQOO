import '../models/api_response.dart';
import '../models/student_model.dart';
import '../models/subject_model.dart';
import '../services/api_client.dart';

class StudentRepository {
  final LearnIQApiClient apiClient;

  StudentRepository({required this.apiClient});

  /// Retrieves student profile
  Future<ApiResponse<StudentProfile>> getStudentProfile() async {
    return apiClient.get<StudentProfile>(
      '/student/profile',
      fromJson: (json) => StudentProfile.fromJson(json as Map<String, dynamic>),
    );
  }

  /// Updates student profile details
  Future<ApiResponse<StudentProfile>> updateStudentProfile(Map<String, dynamic> updates) async {
    return apiClient.put<StudentProfile>(
      '/student/profile',
      body: updates,
      fromJson: (json) => StudentProfile.fromJson(json as Map<String, dynamic>),
    );
  }

  /// Lists all enrolled subjects
  Future<ApiResponse<List<Subject>>> getSubjects() async {
    return apiClient.get<List<Subject>>(
      '/subjects',
      fromJson: (json) => (json as List<dynamic>)
          .map((e) => Subject.fromJson(e as Map<String, dynamic>))
          .toList(),
    );
  }

  /// Gets topics for a given subject
  Future<ApiResponse<List<Topic>>> getTopics({String? subjectId}) async {
    return apiClient.get<List<Topic>>(
      '/topics',
      queryParams: subjectId != null ? {'subjectId': subjectId} : null,
      fromJson: (json) => (json as List<dynamic>)
          .map((e) => Topic.fromJson(e as Map<String, dynamic>))
          .toList(),
    );
  }
}
