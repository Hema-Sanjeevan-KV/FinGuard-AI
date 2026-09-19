/**
 * FinGuard AI - Authentication & Behavioral Biometric Service
 * Maps to Java Spring Boot: @RestController @RequestMapping("/api/auth")
 */

import { User, BehavioralMetrics, RiskLevel } from '../types';
import { MOCK_USERS, DEFAULT_HARISH_BEHAVIOR } from '../data/mockData';
import { API_CONFIG, apiFetch } from './apiClient';

export interface LoginCredentials {
  email: string;
  password?: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  success: boolean;
  user: User;
  token: string;
  requiresBehavioralCheck: boolean;
  message: string;
}

export interface BehavioralVerificationPayload {
  userId: string;
  typingSamples?: number[];
  dwellTimeAvg?: number;
  flightTimeVariance?: number;
  mouseEventsCount?: number;
  mouseJitterScore?: number;
  clientTimestamp?: number;
}

export interface BehavioralVerificationResponse {
  verified: boolean;
  riskScore: number;
  riskLevel: RiskLevel;
  decision: 'ALLOW' | 'STEP_UP_VERIFICATION' | 'BLOCK';
  behaviorMetrics: BehavioralMetrics;
  message: string;
}

export const authService = {
  /**
   * POST /api/auth/login
   * Java Spring Boot equivalent:
   * @PostMapping("/login")
   * public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest req)
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    if (!API_CONFIG.USE_MOCK) {
      return apiFetch<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
    }

    // Fictional academic simulation: match user by email or fallback to Harish
    await new Promise((resolve) => setTimeout(resolve, 350));

    const matchedUser =
      MOCK_USERS.find(
        (u) => u.email.toLowerCase() === credentials.email.toLowerCase()
      ) || MOCK_USERS[0]; // Default to Harish Kumar

    return {
      success: true,
      user: matchedUser,
      token: `demo-finguard-jwt-${matchedUser.id}-${Date.now()}`,
      requiresBehavioralCheck: true,
      message: 'Authentication successful. Behavioral verification required.',
    };
  },

  /**
   * POST /api/auth/behavior
   * Java Spring Boot equivalent:
   * @PostMapping("/behavior")
   * public ResponseEntity<BehavioralVerificationResponse> verifyBehavior(@RequestBody BehaviorTelemetryDto telemetry)
   */
  async verifyBehavior(
    payload: BehavioralVerificationPayload
  ): Promise<BehavioralVerificationResponse> {
    if (!API_CONFIG.USE_MOCK) {
      return apiFetch<BehavioralVerificationResponse>('/auth/behavior', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    }

    // Simulate behavioral analysis pipeline (Typing + Mouse + Device + Context)
    await new Promise((resolve) => setTimeout(resolve, 600));

    const user = MOCK_USERS.find((u) => u.id === payload.userId) || MOCK_USERS[0];

    // If it's the demo anomaly user, simulate medium/elevated risk
    if (user.id === 'USR-103') {
      const anomalyMetrics: BehavioralMetrics = {
        typingPatternScore: 18,
        loginTimeScore: 8,
        deviceScore: 12,
        mouseInteractionScore: 10,
        transactionPatternScore: 0,
        totalRiskScore: 48,
        riskLevel: 'MEDIUM',
        factors: {
          typingCadence: 'UNUSUAL',
          loginTimeWindow: 'UNUSUAL',
          devicePosture: 'SUSPICIOUS',
          mouseDynamics: 'UNUSUAL',
          transactionVelocity: 'NORMAL',
        },
      };

      return {
        verified: true,
        riskScore: 48,
        riskLevel: 'MEDIUM',
        decision: 'STEP_UP_VERIFICATION',
        behaviorMetrics: anomalyMetrics,
        message: 'Behavioral variance detected: typing dynamics deviate from baseline profile.',
      };
    }

    // Default baseline for Harish/Hema (Low risk, normal access)
    return {
      verified: true,
      riskScore: 18,
      riskLevel: 'LOW',
      decision: 'ALLOW',
      behaviorMetrics: DEFAULT_HARISH_BEHAVIOR,
      message: 'Behavioral biometric profile validated successfully.',
    };
  },

  /**
   * POST /api/auth/logout
   */
  async logout(): Promise<void> {
    if (!API_CONFIG.USE_MOCK) {
      await apiFetch<void>('/auth/logout', { method: 'POST' });
    }
    localStorage.removeItem('finguard_jwt_token');
  },
};
