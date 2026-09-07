/// In-App & Push Notification Model
class AppNotification {
  final String id;
  final String title;
  final String text;
  final String time;
  final String type; // 'timetable' | 'ai_analysis' | 'retention' | 'general'
  final bool unread;

  AppNotification({
    required this.id,
    required this.title,
    required this.text,
    required this.time,
    this.type = 'general',
    this.unread = true,
  });

  factory AppNotification.fromJson(Map<String, dynamic> json) {
    return AppNotification(
      id: json['id'] as String? ?? '',
      title: json['title'] as String? ?? '',
      text: json['text'] as String? ?? '',
      time: json['time'] as String? ?? 'Just now',
      type: json['type'] as String? ?? 'general',
      unread: json['unread'] as bool? ?? true,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'text': text,
      'time': time,
      'type': type,
      'unread': unread,
    };
  }

  AppNotification copyWith({
    bool? unread,
  }) {
    return AppNotification(
      id: id,
      title: title,
      text: text,
      time: time,
      type: type,
      unread: unread ?? this.unread,
    );
  }
}

/// Mobile Push Token Registration Payload
class DeviceTokenRegistration {
  final String platform; // 'flutter_android' | 'flutter_ios'
  final String pushToken;

  DeviceTokenRegistration({
    required this.platform,
    required this.pushToken,
  });

  Map<String, dynamic> toJson() {
    return {
      'platform': platform,
      'pushToken': pushToken,
    };
  }
}
