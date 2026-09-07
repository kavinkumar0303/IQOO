/// Authentication Tokens model
class AuthTokens {
  final String accessToken;
  final String refreshToken;
  final String tokenType;
  final int expiresIn;

  AuthTokens({
    required this.accessToken,
    required this.refreshToken,
    this.tokenType = 'Bearer',
    this.expiresIn = 86400,
  });

  factory AuthTokens.fromJson(Map<String, dynamic> json) {
    return AuthTokens(
      accessToken: json['accessToken'] as String? ?? '',
      refreshToken: json['refreshToken'] as String? ?? '',
      tokenType: json['tokenType'] as String? ?? 'Bearer',
      expiresIn: json['expiresIn'] as int? ?? 86400,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'accessToken': accessToken,
      'refreshToken': refreshToken,
      'tokenType': tokenType,
      'expiresIn': expiresIn,
    };
  }
}

/// User Identity model
class User {
  final String id;
  final String username;
  final String email;
  final String role; // 'student' | 'faculty'
  final String profileId;
  final bool isActive;

  User({
    required this.id,
    required this.username,
    required this.email,
    required this.role,
    required this.profileId,
    this.isActive = true,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] as String? ?? '',
      username: json['username'] as String? ?? '',
      email: json['email'] as String? ?? '',
      role: json['role'] as String? ?? 'student',
      profileId: json['profileId'] as String? ?? '',
      isActive: json['isActive'] as bool? ?? true,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'username': username,
      'email': email,
      'role': role,
      'profileId': profileId,
      'isActive': isActive,
    };
  }
}

/// Login Request payload
class LoginRequest {
  final String role;
  final String? email;
  final String? password;

  LoginRequest({
    this.role = 'student',
    this.email,
    this.password,
  });

  Map<String, dynamic> toJson() {
    return {
      'role': role,
      if (email != null) 'email': email,
      if (password != null) 'password': password,
    };
  }
}

/// Registration Request payload
class RegisterRequest {
  final String email;
  final String fullName;
  final String role;
  final String? college;
  final String? department;

  RegisterRequest({
    required this.email,
    required this.fullName,
    this.role = 'student',
    this.college,
    this.department,
  });

  Map<String, dynamic> toJson() {
    return {
      'email': email,
      'fullName': fullName,
      'role': role,
      if (college != null) 'college': college,
      if (department != null) 'department': department,
    };
  }
}

/// Login / Auth Response bundle
class AuthResponseData {
  final User user;
  final dynamic profile;
  final AuthTokens tokens;

  AuthResponseData({
    required this.user,
    this.profile,
    required this.tokens,
  });

  factory AuthResponseData.fromJson(Map<String, dynamic> json) {
    return AuthResponseData(
      user: User.fromJson(json['user'] as Map<String, dynamic>? ?? {}),
      profile: json['profile'],
      tokens: AuthTokens.fromJson(json['tokens'] as Map<String, dynamic>? ?? {}),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'user': user.toJson(),
      'profile': profile,
      'tokens': tokens.toJson(),
    };
  }
}
