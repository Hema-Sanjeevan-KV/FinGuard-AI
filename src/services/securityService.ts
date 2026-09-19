/**
 * FinGuard AI - Security Risk & Biometrics Service
 * Maps to Java Spring Boot: @RestController @RequestMapping("/api/security")
 */

import {
  BehavioralMetrics,
  SecurityAlert,
  LoginAttempt,
  RecognizedDevice,
  RiskLevel
} from '../types';
import {
  DEFAULT_HARISH_BEHAVIOR,
  MOCK_SECURITY_ALERTS,
  MOCK_LOGIN_ATTEMPTS,
  MOCK_RECOGNIZED_DEVICES
} from '../data/mockData';
import { API_CONFIG, apiFetch } from './apiClient';

let dynamicAlerts: SecurityAlert[] = [...MOCK_SECURITY_ALERTS];
let dynamicDevices: RecognizedDevice[] = [...MOCK_RECOGNIZED_DEVICES];
let dynamicLogins: LoginAttempt[] = [...MOCK_LOGIN_ATTEMPTS];

export const securityService = {
  /**
   * GET /api/security/risk
   * Returns current behavioral score breakdown
   */
  async getBehavioralMetrics(userId: string): Promise<BehavioralMetrics> {
    if (!API_CONFIG.USE_MOCK) {
      return apiFetch<BehavioralMetrics>(`/security/risk?userId=${userId}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 200));

    if (userId === 'USR-103') {
      return {
        typingPatternScore: 18,
        loginTimeScore: 8,
        deviceScore: 12,
        mouseInteractionScore: 10,
        transactionPatternScore: 0,
        totalRiskScore: 48,
        riskLevel: 'MEDIUM' as RiskLevel,
        factors: {
          typingCadence: 'UNUSUAL',
          loginTimeWindow: 'UNUSUAL',
          devicePosture: 'SUSPICIOUS',
          mouseDynamics: 'UNUSUAL',
          transactionVelocity: 'NORMAL',
        },
        metricsDetail: {
          keystrokeDwellTimeMs: 145,
          flightTimeVarianceMs: 98,
          mouseJitterRate: 0.35,
          deviceFingerprintHash: 'sha256:d82e88a101b0f922718ecaa4491028',
          sessionAgeMinutes: 4,
        },
      };
    }

    return { ...DEFAULT_HARISH_BEHAVIOR };
  },

  /**
   * GET /api/security/alerts
   */
  async getAlerts(userId?: string): Promise<SecurityAlert[]> {
    if (!API_CONFIG.USE_MOCK) {
      const q = userId ? `?userId=${userId}` : '';
      return apiFetch<SecurityAlert[]>(`/security/alerts${q}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 220));
    if (userId) {
      return dynamicAlerts.filter((a) => a.userId === userId);
    }
    return [...dynamicAlerts];
  },

  /**
   * POST /api/security/alerts/:id/resolve
   */
  async resolveAlert(alertId: string, resolution: 'RESOLVED' | 'INVESTIGATING'): Promise<SecurityAlert> {
    if (!API_CONFIG.USE_MOCK) {
      return apiFetch<SecurityAlert>(`/security/alerts/${alertId}/resolve`, {
        method: 'POST',
        body: JSON.stringify({ status: resolution }),
      });
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
    const alert = dynamicAlerts.find((a) => a.id === alertId);
    if (alert) {
      alert.status = resolution;
      return { ...alert };
    }
    throw new Error('Alert not found');
  },

  /**
   * GET /api/security/logins
   */
  async getLoginAttempts(userId?: string): Promise<LoginAttempt[]> {
    if (!API_CONFIG.USE_MOCK) {
      const q = userId ? `?userId=${userId}` : '';
      return apiFetch<LoginAttempt[]>(`/security/logins${q}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 220));
    if (userId) {
      return dynamicLogins.filter((l) => l.userId === userId);
    }
    return [...dynamicLogins];
  },

  /**
   * GET /api/security/devices
   */
  async getRecognizedDevices(userId?: string): Promise<RecognizedDevice[]> {
    if (!API_CONFIG.USE_MOCK) {
      return apiFetch<RecognizedDevice[]>(`/security/devices`);
    }

    await new Promise((resolve) => setTimeout(resolve, 180));
    return [...dynamicDevices];
  },

  /**
   * POST /api/security/devices/:id/revoke
   */
  async revokeDevice(deviceId: string): Promise<RecognizedDevice> {
    if (!API_CONFIG.USE_MOCK) {
      return apiFetch<RecognizedDevice>(`/security/devices/${deviceId}/revoke`, {
        method: 'POST',
      });
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
    const dev = dynamicDevices.find((d) => d.id === deviceId);
    if (dev) {
      dev.status = 'REVOKED';
      return { ...dev };
    }
    throw new Error('Device not found');
  },
};
