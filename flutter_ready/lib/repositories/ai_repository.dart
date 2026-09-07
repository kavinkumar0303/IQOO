import '../models/api_response.dart';
import '../models/ai_model.dart';
import '../services/api_client.dart';

class AIRepository {
  final LearnIQApiClient apiClient;

  AIRepository({required this.apiClient});

  /// Fetches AI Mentor recommendations
  Future<ApiResponse<AIRecommendation>> getRecommendation() async {
    return apiClient.get<AIRecommendation>(
      '/ai/recommendation',
      fromJson: (json) => AIRecommendation.fromJson(json as Map<String, dynamic>),
    );
  }

  /// Sends message to AI Mentor
  Future<ApiResponse<AIMessage>> sendChatMessage({
    required String message,
    String? context,
  }) async {
    return apiClient.post<AIMessage>(
      '/ai/chat',
      body: {
        'message': message,
        if (context != null) 'context': context,
      },
      fromJson: (json) => AIMessage.fromJson(json as Map<String, dynamic>),
    );
  }
}
