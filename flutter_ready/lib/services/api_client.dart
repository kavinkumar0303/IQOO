import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import '../models/api_response.dart';
import '../models/auth_model.dart';

/// LearnIQ API Client for Flutter Applications
///
/// Features:
/// - Base URL configuration (Supports Android Emulator 10.0.2.2 & iOS Simulator 127.0.0.1)
/// - Automatic Bearer Token header attachment
/// - Standardized [ApiResponse<T>] response parsing
/// - Automatic token refresh on 401 Unauthorized
/// - Network error & timeout recovery
class LearnIQApiClient {
  final String baseUrl;
  final http.Client _httpClient;

  String? _accessToken;
  String? _refreshToken;

  LearnIQApiClient({
    String? baseUrl,
    http.Client? httpClient,
  })  : baseUrl = baseUrl ?? _getDefaultBaseUrl(),
        _httpClient = httpClient ?? http.Client();

  static String _getDefaultBaseUrl() {
    if (Platform.isAndroid) {
      return 'http://10.0.2.2:5173/api';
    }
    return 'http://127.0.0.1:5173/api';
  }

  /// Sets tokens in memory (Call this after retrieving from FlutterSecureStorage)
  void setAuthTokens({required String accessToken, String? refreshToken}) {
    _accessToken = accessToken;
    _refreshToken = refreshToken;
  }

  /// Clears stored tokens upon logout
  void clearAuth() {
    _accessToken = null;
    _refreshToken = null;
  }

  bool get isAuthenticated => _accessToken != null && _accessToken!.isNotEmpty;

  Map<String, String> _buildHeaders() {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      if (_accessToken != null) 'Authorization': 'Bearer $_accessToken',
    };
  }

  /// Generic GET request
  Future<ApiResponse<T>> get<T>(
    String endpoint, {
    Map<String, dynamic>? queryParams,
    T Function(dynamic json)? fromJson,
  }) async {
    return _sendRequest<T>('GET', endpoint, queryParams: queryParams, fromJson: fromJson);
  }

  /// Generic POST request
  Future<ApiResponse<T>> post<T>(
    String endpoint, {
    dynamic body,
    T Function(dynamic json)? fromJson,
  }) async {
    return _sendRequest<T>('POST', endpoint, body: body, fromJson: fromJson);
  }

  /// Generic PUT request
  Future<ApiResponse<T>> put<T>(
    String endpoint, {
    dynamic body,
    T Function(dynamic json)? fromJson,
  }) async {
    return _sendRequest<T>('PUT', endpoint, body: body, fromJson: fromJson);
  }

  /// Generic DELETE request
  Future<ApiResponse<T>> delete<T>(
    String endpoint, {
    T Function(dynamic json)? fromJson,
  }) async {
    return _sendRequest<T>('DELETE', endpoint, fromJson: fromJson);
  }

  /// Core HTTP Request Engine
  Future<ApiResponse<T>> _sendRequest<T>(
    String method,
    String endpoint, {
    Map<String, dynamic>? queryParams,
    dynamic body,
    T Function(dynamic json)? fromJson,
    bool isRetry = false,
  }) async {
    try {
      final uri = Uri.parse('$baseUrl$endpoint').replace(
        queryParameters: queryParams?.map((key, value) => MapEntry(key, value.toString())),
      );

      final headers = _buildHeaders();
      http.Response response;

      switch (method.toUpperCase()) {
        case 'POST':
          response = await _httpClient.post(
            uri,
            headers: headers,
            body: body != null ? jsonEncode(body) : null,
          );
          break;
        case 'PUT':
          response = await _httpClient.put(
            uri,
            headers: headers,
            body: body != null ? jsonEncode(body) : null,
          );
          break;
        case 'DELETE':
          response = await _httpClient.delete(uri, headers: headers);
          break;
        case 'GET':
        default:
          response = await _httpClient.get(uri, headers: headers);
          break;
      }

      // Handle 401 Token Expiration with Auto-Refresh
      if (response.statusCode == 401 && !isRetry && _refreshToken != null) {
        final refreshSuccess = await _tryRefreshToken();
        if (refreshSuccess) {
          return _sendRequest<T>(
            method,
            endpoint,
            queryParams: queryParams,
            body: body,
            fromJson: fromJson,
            isRetry: true,
          );
        }
      }

      final Map<String, dynamic> responseJson = jsonDecode(response.body) as Map<String, dynamic>;
      return ApiResponse<T>.fromJson(responseJson, fromJson);
    } on SocketException catch (e) {
      return ApiResponse<T>(
        success: false,
        message: 'Network error: Cannot reach LearnIQ backend server. (${e.message})',
        timestamp: DateTime.now(),
        statusCode: 503,
      );
    } catch (e) {
      return ApiResponse<T>(
        success: false,
        message: 'An unexpected error occurred: $e',
        timestamp: DateTime.now(),
        statusCode: 500,
      );
    }
  }

  /// Attempts to refresh the access token using the refresh token
  Future<bool> _tryRefreshToken() async {
    if (_refreshToken == null) return false;
    try {
      final uri = Uri.parse('$baseUrl/auth/refresh');
      final response = await _httpClient.post(
        uri,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'refreshToken': _refreshToken}),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        if (data['success'] == true && data['data'] != null) {
          final newTokens = AuthTokens.fromJson(data['data']);
          setAuthTokens(accessToken: newTokens.accessToken, refreshToken: newTokens.refreshToken);
          return true;
        }
      }
    } catch (_) {}
    return false;
  }
}
