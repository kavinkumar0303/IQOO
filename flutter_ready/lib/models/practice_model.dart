/// Test Case Model for Coding Sandbox
class TestCase {
  final int id;
  final String input;
  final String expected;
  final String? output;
  final bool passed;
  final String runtime;

  TestCase({
    required this.id,
    required this.input,
    required this.expected,
    this.output,
    required this.passed,
    required this.runtime,
  });

  factory TestCase.fromJson(Map<String, dynamic> json) {
    return TestCase(
      id: json['id'] as int? ?? 1,
      input: json['input'] as String? ?? '',
      expected: json['expected'] as String? ?? '',
      output: json['output'] as String?,
      passed: json['passed'] as bool? ?? false,
      runtime: json['runtime'] as String? ?? '0ms',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'input': input,
      'expected': expected,
      'output': output,
      'passed': passed,
      'runtime': runtime,
    };
  }
}

/// Code Exercise Definition
class CodeExercise {
  final String id;
  final String subject;
  final String title;
  final String difficulty;
  final String faculty;
  final String description;
  final String starterCode;
  final List<TestCase> testCases;

  CodeExercise({
    required this.id,
    required this.subject,
    required this.title,
    required this.difficulty,
    required this.faculty,
    required this.description,
    required this.starterCode,
    this.testCases = const [],
  });

  factory CodeExercise.fromJson(Map<String, dynamic> json) {
    return CodeExercise(
      id: json['id'] as String? ?? '',
      subject: json['subject'] as String? ?? '',
      title: json['title'] as String? ?? '',
      difficulty: json['difficulty'] as String? ?? 'Easy',
      faculty: json['faculty'] as String? ?? '',
      description: json['description'] as String? ?? '',
      starterCode: json['starterCode'] as String? ?? '',
      testCases: (json['testCases'] as List<dynamic>?)
              ?.map((e) => TestCase.fromJson(e as Map<String, dynamic>))
              .toList() ??
          const [],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'subject': subject,
      'title': title,
      'difficulty': difficulty,
      'faculty': faculty,
      'description': description,
      'starterCode': starterCode,
      'testCases': testCases.map((e) => e.toJson()).toList(),
    };
  }
}

/// Code Run Result
class CodeRunResult {
  final String exerciseId;
  final String language;
  final String status;
  final String compilerOutput;
  final List<TestCase> testCases;
  final bool allPassed;
  final String executionTime;
  final String memoryUsage;

  CodeRunResult({
    required this.exerciseId,
    required this.language,
    required this.status,
    required this.compilerOutput,
    required this.testCases,
    required this.allPassed,
    required this.executionTime,
    required this.memoryUsage,
  });

  factory CodeRunResult.fromJson(Map<String, dynamic> json) {
    return CodeRunResult(
      exerciseId: json['exerciseId'] as String? ?? '',
      language: json['language'] as String? ?? 'cpp',
      status: json['status'] as String? ?? 'Success',
      compilerOutput: json['compilerOutput'] as String? ?? '',
      testCases: (json['testCases'] as List<dynamic>?)
              ?.map((e) => TestCase.fromJson(e as Map<String, dynamic>))
              .toList() ??
          const [],
      allPassed: json['allPassed'] as bool? ?? false,
      executionTime: json['executionTime'] as String? ?? '0ms',
      memoryUsage: json['memoryUsage'] as String? ?? '0MB',
    );
  }
}

/// Theory Option Model
class TheoryOption {
  final String id;
  final String text;
  final bool isCorrect;

  TheoryOption({
    required this.id,
    required this.text,
    required this.isCorrect,
  });

  factory TheoryOption.fromJson(Map<String, dynamic> json) {
    return TheoryOption(
      id: json['id'] as String? ?? '',
      text: json['text'] as String? ?? '',
      isCorrect: json['isCorrect'] as bool? ?? false,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'text': text,
      'isCorrect': isCorrect,
    };
  }
}

/// Theory Exercise Model
class TheoryExercise {
  final String id;
  final String subject;
  final String topic;
  final String question;
  final List<TheoryOption> options;
  final String explanation;
  final String aiTip;

  TheoryExercise({
    required this.id,
    required this.subject,
    required this.topic,
    required this.question,
    required this.options,
    required this.explanation,
    required this.aiTip,
  });

  factory TheoryExercise.fromJson(Map<String, dynamic> json) {
    return TheoryExercise(
      id: json['id'] as String? ?? '',
      subject: json['subject'] as String? ?? '',
      topic: json['topic'] as String? ?? '',
      question: json['question'] as String? ?? '',
      options: (json['options'] as List<dynamic>?)
              ?.map((e) => TheoryOption.fromJson(e as Map<String, dynamic>))
              .toList() ??
          const [],
      explanation: json['explanation'] as String? ?? '',
      aiTip: json['aiTip'] as String? ?? '',
    );
  }
}
