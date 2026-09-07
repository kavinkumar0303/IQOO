import '../models/api_response.dart';
import '../models/timetable_model.dart';
import '../services/api_client.dart';

class TimetableRepository {
  final LearnIQApiClient apiClient;

  TimetableRepository({required this.apiClient});

  /// Fetches today's timetable classes
  Future<ApiResponse<List<TimetableItem>>> getTodaySchedule() async {
    return apiClient.get<List<TimetableItem>>(
      '/timetable',
      fromJson: (json) => (json as List<dynamic>)
          .map((e) => TimetableItem.fromJson(e as Map<String, dynamic>))
          .toList(),
    );
  }
}
