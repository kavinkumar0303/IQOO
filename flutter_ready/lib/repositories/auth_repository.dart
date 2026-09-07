import '../models/api_response.dart';
import '../models/auth_model.dart';
import '../services/api_client.dart';

class AuthRepository {
  final LearnIQApiClient apiClient;

  AuthRepository({required this.apiClient});

  /// Logs in as student or faculty
  Future<ApiResponse<AuthResponseData>> login({String role = 'student', String? email}) async {
    final response = await apiClient.post<AuthResponseData>(
      '/auth/login',
      body: {'role': role, if (email != null) 'email': email},
      fromJson: (json) => AuthResponseData.fromJson(json as Map<String, dynamic>),
    );

    if (response.isSuccess && response.data != null) {
      apiClient.setAuthTokens(
        accessToken: response.data!.tokens.accessToken,
        refreshToken: response.data!.tokens.refreshToken,
      );
    }

    return response;
  }

  /// Registers a new student or faculty account
  Future<ApiResponse<AuthResponseData>> register(RegisterRequest request) async {
    final response = await apiClient.post<AuthResponseData>(
      '/auth/register',
      body: request.toJson(),
      fromJson: (json) => AuthResponseData.fromJson(json as Map<String, dynamic>),
    );

    if (response.isSuccess && response.data != null) {
      apiClient.setAuthTokens(
        accessToken: response.data!.tokens.accessToken,
        refreshToken: response.data!.tokens.refreshToken,
      );
    }

    return response;
  }

  /// Validates existing session
  Future<ApiResponse<User>> getMe() async {
    return apiClient.get<User>(
      '/auth/me',
      fromJson: (json) => User.fromJson(json as Map<String, dynamic>),
    );
  }

  /// Logs out the current session
  Future<ApiResponse<Map<String, dynamic>>> logout() async {
    final response = await apiClient.post<Map<String, dynamic>>('/auth/logout');
    apiClient.clearAuth();
    return response;
  }
}
