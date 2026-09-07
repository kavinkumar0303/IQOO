/// Retention Question Option
class RetentionOption {
  final String id;
  final String text;
  final bool isCorrect;

  RetentionOption({
    required this.id,
    required this.text,
    required this.isCorrect,
  });

  factory RetentionOption.fromJson(Map<String, dynamic> json) {
    return RetentionOption(
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

/// Spaced Repetition Retention Challenge
class RetentionCheck {
  final String id;
  final String subject;
  final String topic;
  final int daysAgo;
  final String prompt;
  final String question;
  final List<RetentionOption> options;
  final String explanation;
  final int retentionBefore;
  final int retentionAfter;

  RetentionCheck({
    required this.id,
    required this.subject,
    required this.topic,
    required this.daysAgo,
    required this.prompt,
    required this.question,
    required this.options,
    required this.explanation,
    required this.retentionBefore,
    required this.retentionAfter,
  });

  factory RetentionCheck.fromJson(Map<String, dynamic> json) {
    return RetentionCheck(
      id: json['id'] as String? ?? '',
      subject: json['subject'] as String? ?? '',
      topic: json['topic'] as String? ?? '',
      daysAgo: json['daysAgo'] as int? ?? 1,
      prompt: json['prompt'] as String? ?? '',
      question: json['question'] as String? ?? '',
      options: (json['options'] as List<dynamic>?)
              ?.map((e) => RetentionOption.fromJson(e as Map<String, dynamic>))
              .toList() ??
          const [],
      explanation: json['explanation'] as String? ?? '',
      retentionBefore: json['retentionBefore'] as int? ?? 65,
      retentionAfter: json['retentionAfter'] as int? ?? 89,
    );
  }
}

/// Retention Submission Result
class RetentionResult {
  final String checkId;
  final String selectedOption;
  final bool isCorrect;
  final int retentionScoreBefore;
  final int retentionScoreAfter;
  final String memoryBoostPercent;
  final String explanation;

  RetentionResult({
    required this.checkId,
    required this.selectedOption,
    required this.isCorrect,
    required this.retentionScoreBefore,
    required this.retentionScoreAfter,
    required this.memoryBoostPercent,
    required this.explanation,
  });

  factory RetentionResult.fromJson(Map<String, dynamic> json) {
    return RetentionResult(
      checkId: json['checkId'] as String? ?? '',
      selectedOption: json['selectedOption'] as String? ?? '',
      isCorrect: json['isCorrect'] as bool? ?? false,
      retentionScoreBefore: json['retentionScoreBefore'] as int? ?? 65,
      retentionScoreAfter: json['retentionScoreAfter'] as int? ?? 89,
      memoryBoostPercent: json['memoryBoostPercent'] as String? ?? '+24%',
      explanation: json['explanation'] as String? ?? '',
    );
  }
}
