/// AI Brain Metric Item
class BrainMetricItem {
  final int score;
  final String label;
  final String status;
  final String description;
  final String color;

  BrainMetricItem({
    required this.score,
    required this.label,
    required this.status,
    required this.description,
    required this.color,
  });

  factory BrainMetricItem.fromJson(Map<String, dynamic> json) {
    return BrainMetricItem(
      score: json['score'] as int? ?? 0,
      label: json['label'] as String? ?? '',
      status: json['status'] as String? ?? '',
      description: json['description'] as String? ?? '',
      color: json['color'] as String? ?? '#FF7A00',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'score': score,
      'label': label,
      'status': status,
      'description': description,
      'color': color,
    };
  }
}

/// AI Recommendation Model
class AIRecommendation {
  final String title;
  final String greeting;
  final String insight;
  final String recommendedTask;
  final String estimatedTime;
  final String difficulty;
  final String targetSubject;
  final String suggestedAction;
  final String metricImpact;

  AIRecommendation({
    required this.title,
    required this.greeting,
    required this.insight,
    required this.recommendedTask,
    required this.estimatedTime,
    required this.difficulty,
    required this.targetSubject,
    required this.suggestedAction,
    required this.metricImpact,
  });

  factory AIRecommendation.fromJson(Map<String, dynamic> json) {
    return AIRecommendation(
      title: json['title'] as String? ?? '',
      greeting: json['greeting'] as String? ?? '',
      insight: json['insight'] as String? ?? '',
      recommendedTask: json['recommendedTask'] as String? ?? '',
      estimatedTime: json['estimatedTime'] as String? ?? '10 mins',
      difficulty: json['difficulty'] as String? ?? 'Intermediate',
      targetSubject: json['targetSubject'] as String? ?? 'DSA',
      suggestedAction: json['suggestedAction'] as String? ?? 'Practice Now →',
      metricImpact: json['metricImpact'] as String? ?? '+5%',
    );
  }
}

/// AI Chat Message Model
class AIMessage {
  final int id;
  final String sender; // 'user' | 'ai'
  final String text;
  final String time;
  final List<String> suggestions;

  AIMessage({
    required this.id,
    required this.sender,
    required this.text,
    required this.time,
    this.suggestions = const [],
  });

  factory AIMessage.fromJson(Map<String, dynamic> json) {
    return AIMessage(
      id: json['id'] as int? ?? 0,
      sender: json['sender'] as String? ?? 'ai',
      text: json['text'] as String? ?? '',
      time: json['time'] as String? ?? 'Just now',
      suggestions: (json['suggestions'] as List<dynamic>?)
              ?.map((e) => e.toString())
              .toList() ??
          const [],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'sender': sender,
      'text': text,
      'time': time,
      'suggestions': suggestions,
    };
  }

  bool get isUser => sender == 'user';
  bool get isAi => sender == 'ai';
}
