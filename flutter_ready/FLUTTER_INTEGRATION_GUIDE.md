# 📱 LearnIQ Flutter Mobile App Integration Guide

This guide provides the complete architectural blueprint and implementation instructions for building the future **LearnIQ Mobile Application** (iOS & Android) with Flutter using the shared backend, database, and AI services.

---

## 🏗️ 1. Architecture Overview

```
                        ┌───────────────────────────────┐
                        │       LearnIQ Platform        │
                        └───────────────┬───────────────┘
                                        │
        ┌───────────────────────────────┴───────────────────────────────┐
        │                                                               │
┌───────▼───────────────────────────┐                   ┌───────────────▼───────────────────┐
│     LearnIQ Web Application       │                   │    LearnIQ Mobile Application     │
│       (React + Vite + CSS)        │                   │     (Flutter iOS & Android)       │
└───────────────┬───────────────────┘                   └───────────────┬───────────────────┘
                │                                                       │
                │        Standardized REST API (JSON)                   │
                └───────────────────────┬───────────────────────────────┘
                                        │
                        ┌───────────────▼───────────────┐
                        │      LearnIQ REST API         │
                        │         (/api/*)              │
                        ├───────────────────────────────┤
                        │ • Token-based Authentication  │
                        │ • Student & Faculty Profiles  │
                        │ • Subjects & Topics           │
                        │ • Live Timetable Schedule     │
                        │ • Code Runner Sandbox         │
                        │ • 30s Rapid Learning Logs     │
                        │ • Spaced Repetition Retention │
                        │ • AI Multidimensional Engine  │
                        │ • Push Notifications (FCM)    │
                        └───────────────┬───────────────┘
                                        │
                        ┌───────────────▼───────────────┐
                        │    Normalized Database        │
                        │ (PostgreSQL / Document Store) │
                        └───────────────────────────────┘
```

---

## 📦 2. Ready-to-Use Flutter SDK

The `flutter_ready/` directory is already organized as a standalone Dart package that you can import directly into any new Flutter project.

### File Structure:
```
flutter_ready/
├── openapi.json                 # Complete OpenAPI 3.0.3 API specification
├── pubspec.yaml                 # Flutter SDK dependencies
├── FLUTTER_INTEGRATION_GUIDE.md # This guide
└── lib/
    ├── learniq_sdk.dart         # Master export barrel
    ├── models/                  # Type-safe Dart models (fromJson / toJson)
    │   ├── api_response.dart    # Generic ApiResponse<T> wrapper
    │   ├── auth_model.dart      # User, AuthTokens, LoginRequest
    │   ├── student_model.dart   # StudentProfile, FacultyProfile
    │   ├── subject_model.dart   # Subject, Topic, Progress
    │   ├── timetable_model.dart # TimetableItem, ScheduleStatus
    │   ├── practice_model.dart  # CodeExercise, TestCase, CodeRunResult
    │   ├── learning_log_model.dart # LearningLog, AudioMetadata
    │   ├── ai_model.dart        # AIAnalysis, AIMessage, Recommendation
    │   ├── retention_model.dart # RetentionCheck, SpacedRecallResult
    │   └── notification_model.dart # AppNotification, PushTokenPayload
    ├── services/
    │   └── api_client.dart      # HTTP Client with Bearer token interceptor
    └── repositories/            # Clean architecture repository layer
        ├── auth_repository.dart
        ├── student_repository.dart
        ├── timetable_repository.dart
        ├── practice_repository.dart
        ├── ai_repository.dart
        └── notification_repository.dart
```

---

## 🚀 3. Quick Start in a New Flutter App

### Step 1: Add Package Dependency in `pubspec.yaml`
```yaml
dependencies:
  flutter:
    sdk: flutter
  learniq_sdk:
    path: ../flutter_ready  # or path to git repository
  flutter_secure_storage: ^9.0.0
  flutter_riverpod: ^2.5.1
  firebase_core: ^2.27.0
  firebase_messaging: ^14.7.10
```

### Step 2: Initialize API Client & Repositories (Riverpod Example)
```dart
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:learniq_sdk/learniq_sdk.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

// Secure Storage Provider
final secureStorageProvider = Provider((ref) => const FlutterSecureStorage());

// API Client Provider
final apiClientProvider = Provider<LearnIQApiClient>((ref) {
  // In development:
  // Android Emulator uses: http://10.0.2.2:5173/api
  // iOS Simulator uses:     http://127.0.0.1:5173/api
  return LearnIQApiClient();
});

// Repository Providers
final authRepositoryProvider = Provider((ref) => AuthRepository(
  apiClient: ref.watch(apiClientProvider),
));

final studentRepositoryProvider = Provider((ref) => StudentRepository(
  apiClient: ref.watch(apiClientProvider),
));

final timetableRepositoryProvider = Provider((ref) => TimetableRepository(
  apiClient: ref.watch(apiClientProvider),
));

final practiceRepositoryProvider = Provider((ref) => PracticeRepository(
  apiClient: ref.watch(apiClientProvider),
));

final aiRepositoryProvider = Provider((ref) => AIRepository(
  apiClient: ref.watch(apiClientProvider),
));

final notificationRepositoryProvider = Provider((ref) => NotificationRepository(
  apiClient: ref.watch(apiClientProvider),
));
```

---

## 🔐 4. Token-Based Authentication Flow

The future mobile app handles sessions with JWT Bearer tokens stored in `flutter_secure_storage`:

```dart
class AuthNotifier extends StateNotifier<AsyncValue<User?>> {
  final AuthRepository _authRepo;
  final FlutterSecureStorage _storage;
  final LearnIQApiClient _apiClient;

  AuthNotifier(this._authRepo, this._storage, this._apiClient)
      : super(const AsyncValue.loading()) {
    _checkExistingSession();
  }

  Future<void> _checkExistingSession() async {
    final token = await _storage.read(key: 'access_token');
    final refreshToken = await _storage.read(key: 'refresh_token');

    if (token != null) {
      _apiClient.setAuthTokens(accessToken: token, refreshToken: refreshToken);
      final meResponse = await _authRepo.getMe();
      if (meResponse.isSuccess && meResponse.data != null) {
        state = AsyncValue.data(meResponse.data);
        return;
      }
    }
    state = const AsyncValue.data(null);
  }

  Future<bool> login(String role, {String? email}) async {
    state = const AsyncValue.loading();
    final response = await _authRepo.login(role: role, email: email);

    if (response.isSuccess && response.data != null) {
      final data = response.data!;
      await _storage.write(key: 'access_token', value: data.tokens.accessToken);
      await _storage.write(key: 'refresh_token', value: data.tokens.refreshToken);
      state = AsyncValue.data(data.user);
      return true;
    } else {
      state = AsyncValue.error(response.message, StackTrace.current);
      return false;
    }
  }

  Future<void> logout() async {
    await _authRepo.logout();
    await _storage.deleteAll();
    state = const AsyncValue.data(null);
  }
}
```

---

## 🔔 5. Mobile Push Notifications (FCM Setup)

To receive real-time notifications for live classes, retention recalls, and AI insights:

```dart
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:learniq_sdk/learniq_sdk.dart';
import 'dart:io';

Future<void> initializePushNotifications(NotificationRepository notifRepo) async {
  final messaging = FirebaseMessaging.instance;
  
  // Request notification permissions (iOS & Android 13+)
  await messaging.requestPermission(
    alert: true,
    badge: true,
    sound: true,
  );

  // Get FCM token
  final token = await messaging.getToken();
  if (token != null) {
    final platform = Platform.isAndroid ? 'flutter_android' : 'flutter_ios';
    await notifRepo.registerPushToken(platform: platform, pushToken: token);
  }

  // Handle foreground messages
  FirebaseMessaging.onMessage.listen((RemoteMessage message) {
    // Show local notification banner or in-app toast
  });
}
```

---

## 🌐 6. Complete REST API Reference

All responses return the standard envelope:
```json
{
  "success": true,
  "data": {},
  "message": "Success",
  "timestamp": "2026-09-07T14:30:00Z"
}
```

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Authenticate and obtain JWT Bearer tokens |
| `POST` | `/api/auth/register` | Register new student or faculty profile |
| `GET` | `/api/auth/me` | Validate current session and retrieve user claims |
| `POST` | `/api/auth/refresh` | Obtain new access token using refresh token |
| `POST` | `/api/auth/logout` | Revoke session tokens |
| `GET` | `/api/student/profile` | Retrieve student profile (streak, mastery, semester) |
| `PUT` | `/api/student/profile` | Update profile information |
| `GET` | `/api/subjects` | List enrolled subjects with progress metrics |
| `GET` | `/api/topics` | Get topic syllabus and mastery levels |
| `GET` | `/api/timetable` | Get today's schedule with LIVE NOW status |
| `GET` | `/api/progress` | Get 78% progress ring & weekly streak data |
| `POST` | `/api/practice/code/run` | Execute code against automated test cases |
| `POST` | `/api/practice/code/submit`| Submit verified algorithm solution |
| `POST` | `/api/practice/quiz/submit`| Submit MCQ answer and get AI reasoning |
| `GET` | `/api/logs` | Fetch 30-second rapid learning logs |
| `POST` | `/api/logs` | Record rapid reflection voice/text log |
| `GET` | `/api/history` | Filterable timeline records (search, subject, status) |
| `GET` | `/api/learning-map` | Visual knowledge skill graph |
| `GET` | `/api/retention/question` | Fetch spaced repetition recall challenge |
| `POST` | `/api/retention/submit` | Submit recall answer & recalculate forgetting curve |
| `GET` | `/api/ai/analysis` | Retrieve multidimensional cognitive evaluation |
| `POST` | `/api/ai/chat` | Chat with LearnIQ AI Mentor |
| `GET` | `/api/notifications` | List user in-app notifications |
| `POST` | `/api/notifications/register-token` | Register mobile FCM/APNS push token |

---

## 🎨 7. Mobile UI Color Palette (Matches Web Identity)

Use these exact tokens in Flutter `ThemeData` to keep 100% visual consistency with the web:

```dart
class LearnIQColors {
  static const Color primaryPink = Color(0xFFFF1681);
  static const Color primaryOrange = Color(0xFFFF7A00);
  static const Color primaryYellow = Color(0xFFFFD84D);
  static const Color successGreen = Color(0xFF20B86B);
  static const Color darkText = Color(0xFF24152F);
  static const Color subtitleText = Color(0xFF6B6170);
  static const Color backgroundLight = Color(0xFFFFF7F2);
  static const Color cardBorder = Color(0x33FF7A00);
  
  static const LinearGradient brandGradient = LinearGradient(
    colors: [primaryPink, primaryOrange],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
}
```

---

## 💾 8. Offline Learning Cache Strategy

For mobile apps with intermittent connectivity:
1. **SharedPreferences / Hive**: Cache the latest timetable, subject syllabus, and offline learning map.
2. **SQLite / Drift**: Queue local practice submissions and 30s audio reflections when offline, then synchronize via `/api/logs` upon network reconnect.

With this architecture, future Flutter mobile app development is **completely plug-and-play** with zero changes required to the backend!
