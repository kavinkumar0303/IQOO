/// Generic Standard API Response Envelope for LearnIQ REST API
class ApiResponse<T> {
  final bool success;
  final T? data;
  final String message;
  final DateTime timestamp;
  final int? statusCode;

  ApiResponse({
    required this.success,
    this.data,
    required this.message,
    required this.timestamp,
    this.statusCode,
  });

  factory ApiResponse.fromJson(
    Map<String, dynamic> json,
    T Function(dynamic json)? fromJsonT,
  ) {
    return ApiResponse<T>(
      success: json['success'] as bool? ?? false,
      data: json['data'] != null && fromJsonT != null ? fromJsonT(json['data']) : json['data'] as T?,
      message: json['message'] as String? ?? '',
      timestamp: json['timestamp'] != null
          ? DateTime.tryParse(json['timestamp'] as String) ?? DateTime.now()
          : DateTime.now(),
      statusCode: json['statusCode'] as int? ?? (json['success'] == true ? 200 : 400),
    );
  }

  Map<String, dynamic> toJson(Map<String, dynamic> Function(T value)? toJsonT) {
    return {
      'success': success,
      'data': data != null && toJsonT != null ? toJsonT(data as T) : data,
      'message': message,
      'timestamp': timestamp.toIso8601String(),
      'statusCode': statusCode,
    };
  }

  bool get isSuccess => success && (statusCode == null || (statusCode! >= 200 && statusCode! < 300));
}
