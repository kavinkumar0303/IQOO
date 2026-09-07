/// 30-Second Learning Log & History Model
class LearningLog {
  final String id;
  final String date;
  final String time;
  final String subject;
  final String topic;
  final String category;
  final String score;
  final String status; // 'Good' | 'Partial' | 'Needs Revision'
  final String? badgeColor;
  final String aiFeedback;

  LearningLog({
    required this.id,
    required this.date,
    required this.time,
    required this.subject,
    required this.topic,
    this.category = 'Learning Log',
    this.score = '88%',
    this.status = 'Good',
    this.badgeColor,
    required this.aiFeedback,
  });

  factory LearningLog.fromJson(Map<String, dynamic> json) {
    return LearningLog(
      id: json['id'] as String? ?? '',
      date: json['date'] as String? ?? 'Today',
      time: json['time'] as String? ?? '',
      subject: json['subject'] as String? ?? 'DSA',
      topic: json['topic'] as String? ?? '',
      category: json['category'] as String? ?? 'Learning Log',
      score: json['score'] as String? ?? '85%',
      status: json['status'] as String? ?? 'Good',
      badgeColor: json['badgeColor'] as String?,
      aiFeedback: json['aiFeedback'] as String? ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'date': date,
      'time': time,
      'subject': subject,
      'topic': topic,
      'category': category,
      'score': score,
      'status': status,
      'badgeColor': badgeColor,
      'aiFeedback': aiFeedback,
    };
  }
}
