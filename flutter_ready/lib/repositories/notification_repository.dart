import '../models/api_response.dart';
import '../models/notification_model.dart';
import '../services/api_client.dart';

class NotificationRepository {
  final LearnIQApiClient apiClient;

  NotificationRepository({required this.apiClient});

  /// Lists all student notifications
  Future<ApiResponse<List<AppNotification>>> getNotifications() async {
    return apiClient.get<List<AppNotification>>(
      '/notifications',
      fromJson: (json) => (json as List<dynamic>)
          .map((e) => AppNotification.fromJson(e as Map<String, dynamic>))
          .toList(),
    );
  }

  /// Marks a notification as read
  Future<ApiResponse<AppNotification>> markAsRead(String id) async {
    return apiClient.put<AppNotification>(
      '/notifications/$id/read',
      fromJson: (json) => AppNotification.fromJson(json as Map<String, dynamic>),
    );
  }

  /// Registers mobile device push notification token (FCM / APNS)
  Future<ApiResponse<Map<String, dynamic>>> registerPushToken({
    required String platform,
    required String pushToken,
  }) async {
    return apiClient.post<Map<String, dynamic>>(
      '/notifications/register-token',
      body: {
        'platform': platform,
        'pushToken': pushToken,
      },
    );
  }
}
