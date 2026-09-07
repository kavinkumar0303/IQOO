/// Subject Model
class Subject {
  final String id;
  final String code;
  final String name;
  final String short;
  final String icon;
  final int semester;
  final String department;
  final int credits;
  final String instructorName;
  final int progress;
  final int totalTopics;
  final int completedTopics;
  final String colorHex;
  final String status;
  final String description;

  Subject({
    required this.id,
    required this.code,
    required this.name,
    required this.short,
    required this.icon,
    this.semester = 6,
    this.department = 'CSE',
    this.credits = 4,
    required this.instructorName,
    required this.progress,
    required this.totalTopics,
    required this.completedTopics,
    required this.colorHex,
    required this.status,
    this.description = '',
  });

  factory Subject.fromJson(Map<String, dynamic> json) {
    return Subject(
      id: json['id'] as String? ?? '',
      code: json['code'] as String? ?? '',
      name: json['name'] as String? ?? '',
      short: json['short'] as String? ?? '',
      icon: json['icon'] as String? ?? 'BookOpen',
      semester: json['semester'] as int? ?? 6,
      department: json['department'] as String? ?? 'CSE',
      credits: json['credits'] as int? ?? 3,
      instructorName: json['instructorName'] as String? ?? '',
      progress: json['progress'] as int? ?? 0,
      totalTopics: json['totalTopics'] as int? ?? 0,
      completedTopics: json['completedTopics'] as int? ?? 0,
      colorHex: json['colorHex'] as String? ?? '#FF7A00',
      status: json['status'] as String? ?? 'On Track',
      description: json['description'] as String? ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'code': code,
      'name': name,
      'short': short,
      'icon': icon,
      'semester': semester,
      'department': department,
      'credits': credits,
      'instructorName': instructorName,
      'progress': progress,
      'totalTopics': totalTopics,
      'completedTopics': completedTopics,
      'colorHex': colorHex,
      'status': status,
      'description': description,
    };
  }
}

/// Topic Model
class Topic {
  final String id;
  final String subjectId;
  final String name;
  final int mastery;
  final String status; // 'completed' | 'in-progress' | 'revision' | 'locked'
  final int order;

  Topic({
    required this.id,
    required this.subjectId,
    required this.name,
    required this.mastery,
    required this.status,
    required this.order,
  });

  factory Topic.fromJson(Map<String, dynamic> json) {
    return Topic(
      id: json['id'] as String? ?? '',
      subjectId: json['subjectId'] as String? ?? '',
      name: json['name'] as String? ?? '',
      mastery: json['mastery'] as int? ?? 0,
      status: json['status'] as String? ?? 'locked',
      order: json['order'] as int? ?? 1,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'subjectId': subjectId,
      'name': name,
      'mastery': mastery,
      'status': status,
      'order': order,
    };
  }
}
