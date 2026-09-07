/// Timetable Schedule Item Model
class TimetableItem {
  final String id;
  final String time;
  final String duration;
  final String subject;
  final String topic;
  final String code;
  final String room;
  final String instructor;
  final String status; // 'completed' | 'live' | 'upcoming'
  final String badge;

  TimetableItem({
    required this.id,
    required this.time,
    required this.duration,
    required this.subject,
    required this.topic,
    required this.code,
    required this.room,
    required this.instructor,
    required this.status,
    required this.badge,
  });

  factory TimetableItem.fromJson(Map<String, dynamic> json) {
    return TimetableItem(
      id: json['id'] as String? ?? '',
      time: json['time'] as String? ?? '',
      duration: json['duration'] as String? ?? '',
      subject: json['subject'] as String? ?? '',
      topic: json['topic'] as String? ?? '',
      code: json['code'] as String? ?? '',
      room: json['room'] as String? ?? '',
      instructor: json['instructor'] as String? ?? '',
      status: json['status'] as String? ?? 'upcoming',
      badge: json['badge'] as String? ?? 'Upcoming',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'time': time,
      'duration': duration,
      'subject': subject,
      'topic': topic,
      'code': code,
      'room': room,
      'instructor': instructor,
      'status': status,
      'badge': badge,
    };
  }

  bool get isLive => status.toLowerCase() == 'live';
  bool get isCompleted => status.toLowerCase() == 'completed';
  bool get isUpcoming => status.toLowerCase() == 'upcoming';
}
