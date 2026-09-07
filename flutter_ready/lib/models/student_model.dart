/// Student Profile Model
class StudentProfile {
  final String id;
  final String name;
  final String fullName;
  final String email;
  final String role;
  final String avatar;
  final String college;
  final String department;
  final String semester;
  final int streak;
  final int overallProgress;
  final int aiScore;
  final int completedTopics;
  final int todayClassesCount;
  final List<String> enrolledSubjects;

  StudentProfile({
    required this.id,
    required this.name,
    required this.fullName,
    required this.email,
    this.role = 'student',
    this.avatar = '',
    this.college = 'LearnIQ Institute of AI & Technology',
    this.department = 'Computer Science & Engineering',
    this.semester = '6th Semester',
    this.streak = 5,
    this.overallProgress = 78,
    this.aiScore = 82,
    this.completedTopics = 12,
    this.todayClassesCount = 3,
    this.enrolledSubjects = const [],
  });

  factory StudentProfile.fromJson(Map<String, dynamic> json) {
    return StudentProfile(
      id: json['id'] as String? ?? '',
      name: json['name'] as String? ?? '',
      fullName: json['fullName'] as String? ?? '',
      email: json['email'] as String? ?? '',
      role: json['role'] as String? ?? 'student',
      avatar: json['avatar'] as String? ?? '',
      college: json['college'] as String? ?? 'LearnIQ Institute of AI & Technology',
      department: json['department'] as String? ?? 'Computer Science & Engineering',
      semester: json['semester'] as String? ?? '6th Semester',
      streak: json['streak'] as int? ?? 0,
      overallProgress: json['overallProgress'] as int? ?? 0,
      aiScore: json['aiScore'] as int? ?? 0,
      completedTopics: json['completedTopics'] as int? ?? 0,
      todayClassesCount: json['todayClassesCount'] as int? ?? 0,
      enrolledSubjects: (json['enrolledSubjects'] as List<dynamic>?)
              ?.map((e) => e.toString())
              .toList() ??
          const [],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'fullName': fullName,
      'email': email,
      'role': role,
      'avatar': avatar,
      'college': college,
      'department': department,
      'semester': semester,
      'streak': streak,
      'overallProgress': overallProgress,
      'aiScore': aiScore,
      'completedTopics': completedTopics,
      'todayClassesCount': todayClassesCount,
      'enrolledSubjects': enrolledSubjects,
    };
  }

  StudentProfile copyWith({
    String? name,
    String? fullName,
    String? avatar,
    int? streak,
    int? overallProgress,
    int? aiScore,
    int? completedTopics,
  }) {
    return StudentProfile(
      id: id,
      name: name ?? this.name,
      fullName: fullName ?? this.fullName,
      email: email,
      role: role,
      avatar: avatar ?? this.avatar,
      college: college,
      department: department,
      semester: semester,
      streak: streak ?? this.streak,
      overallProgress: overallProgress ?? this.overallProgress,
      aiScore: aiScore ?? this.aiScore,
      completedTopics: completedTopics ?? this.completedTopics,
      todayClassesCount: todayClassesCount,
      enrolledSubjects: enrolledSubjects,
    );
  }
}

/// Faculty Profile Model
class FacultyProfile {
  final String id;
  final String name;
  final String fullName;
  final String email;
  final String role;
  final String department;
  final String designation;
  final String assignedSubject;
  final String todaysTopic;

  FacultyProfile({
    required this.id,
    required this.name,
    required this.fullName,
    required this.email,
    this.role = 'faculty',
    required this.department,
    required this.designation,
    required this.assignedSubject,
    required this.todaysTopic,
  });

  factory FacultyProfile.fromJson(Map<String, dynamic> json) {
    return FacultyProfile(
      id: json['id'] as String? ?? '',
      name: json['name'] as String? ?? '',
      fullName: json['fullName'] as String? ?? '',
      email: json['email'] as String? ?? '',
      role: json['role'] as String? ?? 'faculty',
      department: json['department'] as String? ?? '',
      designation: json['designation'] as String? ?? '',
      assignedSubject: json['assignedSubject'] as String? ?? '',
      todaysTopic: json['todaysTopic'] as String? ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'fullName': fullName,
      'email': email,
      'role': role,
      'department': department,
      'designation': designation,
      'assignedSubject': assignedSubject,
      'todaysTopic': todaysTopic,
    };
  }
}
