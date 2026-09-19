/**
 * FinGuard AI - Admin Security Operations Center (SOC) API Service
 * Maps to Java Spring Boot: @RestController @RequestMapping("/api/admin")
 */

import { User, AdminDashboardMetrics, AdminDashboardStats, SecurityAlert, Transaction, LoginAttempt, BehavioralMetrics } from '../types';
import { MOCK_USERS, MOCK_ADMIN_METRICS, MOCK_ALERTS, MOCK_TRANSACTIONS, MOCK_LOGIN_ATTEMPTS, MOCK_BEHAVIORAL_METRICS } from '../data/mockData';
import { API_CONFIG, apiFetch } from './apiClient';

let dynamicUsers: User[] = [...MOCK_USERS];
let dynamicAlerts: SecurityAlert[] = [
  ...MOCK_ALERTS.map((a: SecurityAlert) => ({
    ...a,
    severity: (a.riskScore >= 75 ? 'CRITICAL' : a.riskScore >= 45 ? 'HIGH' : 'MEDIUM') as 'CRITICAL' | 'HIGH' | 'MEDIUM',
    triggerReason: a.eventDescription + ' verified by continuous keystroke flight analysis.',
  })),
];
let dynamicTransactions: Transaction[] = [
  ...MOCK_TRANSACTIONS.map((t: Transaction) => ({
    ...t,
    userName: t.userId === 'USR-101' ? 'Harish Kumar' : t.userId === 'USR-102' ? 'Hema Sundar' : 'Demo User',
  })),
];

export interface AdminAnalyticsData {
  riskDistribution: { name: string; value: number; color: string }[];
  transactionTimeline: { time: string; normal: number; suspicious: number; amount: number }[];
  loginResults: { result: string; count: number; fill: string }[];
  fraudCategories: { category: string; count: number; percentage: number }[];
  behavioralFactorWeights: { factor: string; weight: number; anomalyCount: number }[];
}

export const adminService = {
  /**
   * GET /api/admin/dashboard
   */
  async getDashboardMetrics(): Promise<AdminDashboardMetrics> {
    if (!API_CONFIG.USE_MOCK) {
      return apiFetch<AdminDashboardMetrics>('/admin/dashboard');
    }

    await new Promise((resolve) => setTimeout(resolve, 200));
    return { ...MOCK_ADMIN_METRICS };
  },

  async getDashboardStats(): Promise<AdminDashboardStats> {
    return {
      totalUsers: dynamicUsers.length,
      monitoredSessions: 3,
      highRiskUsers: dynamicUsers.filter((u) => u.riskLevel === 'HIGH').length,
      activeAlerts: dynamicAlerts.filter((a) => a.status !== 'RESOLVED').length,
    };
  },

  /**
   * GET /api/admin/users
   */
  async getAllUsers(): Promise<User[]> {
    if (!API_CONFIG.USE_MOCK) {
      return apiFetch<User[]>('/admin/users');
    }

    await new Promise((resolve) => setTimeout(resolve, 220));
    return [...dynamicUsers];
  },

  /**
   * POST /api/admin/users/:id/toggle-status
   */
  async updateUserStatus(userId: string, status: 'ACTIVE' | 'FLAGGED' | 'LOCKED'): Promise<User> {
    if (!API_CONFIG.USE_MOCK) {
      return apiFetch<User>(`/admin/users/${userId}/status`, {
        method: 'POST',
        body: JSON.stringify({ status }),
      });
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
    const user = dynamicUsers.find((u) => u.id === userId);
    if (user) {
      user.accountStatus = status;
      if (status === 'LOCKED') {
        user.riskLevel = 'HIGH';
        user.riskScore = Math.max(user.riskScore, 85);
      } else if (status === 'ACTIVE') {
        user.riskLevel = 'LOW';
        user.riskScore = Math.min(user.riskScore, 20);
      }
      return { ...user };
    }
    throw new Error('User not found');
  },

  async resetBiometricBaseline(userId: string): Promise<User> {
    const user = dynamicUsers.find((u) => u.id === userId);
    if (user) {
      user.baselineCalibrated = false;
      user.baselineSamples = 0;
      user.riskScore = 15;
      user.riskLevel = 'LOW';
      return { ...user };
    }
    throw new Error('User not found');
  },

  async getFraudAlerts(): Promise<SecurityAlert[]> {
    return [...dynamicAlerts];
  },

  async resolveAlert(alertId: string, status: 'OPEN' | 'INVESTIGATING' | 'RESOLVED'): Promise<SecurityAlert> {
    const alert = dynamicAlerts.find((a) => a.id === alertId);
    if (alert) {
      alert.status = status;
      return { ...alert };
    }
    throw new Error('Alert not found');
  },

  async getAllTransactions(): Promise<Transaction[]> {
    return [...dynamicTransactions];
  },

  async getAllLoginAttempts(): Promise<LoginAttempt[]> {
    return [...MOCK_LOGIN_ATTEMPTS];
  },

  async getAllBehavioralMetrics(): Promise<BehavioralMetrics[]> {
    return [
      {
        ...MOCK_BEHAVIORAL_METRICS,
        userId: 'USR-101',
        userName: 'Harish Kumar',
        avgDwellTimeMs: 94,
        dwellTimeVarianceMs: 4,
        avgFlightTimeMs: 142,
        flightTimeVarianceMs: 8,
        mouseSpeedPps: 420,
        mouseCurvatureRatio: 1.34,
        deviceAnomalyScore: 0,
        keystrokeScore: 5,
        mouseScore: 3,
      },
      {
        ...MOCK_BEHAVIORAL_METRICS,
        userId: 'USR-102',
        userName: 'Hema Sundar',
        avgDwellTimeMs: 88,
        dwellTimeVarianceMs: 6,
        avgFlightTimeMs: 135,
        flightTimeVarianceMs: 12,
        mouseSpeedPps: 390,
        mouseCurvatureRatio: 1.28,
        deviceAnomalyScore: 0,
        keystrokeScore: 7,
        mouseScore: 4,
      },
      {
        ...MOCK_BEHAVIORAL_METRICS,
        userId: 'USR-103',
        userName: 'Anomaly User',
        avgDwellTimeMs: 236,
        dwellTimeVarianceMs: 68,
        avgFlightTimeMs: 310,
        flightTimeVarianceMs: 84,
        mouseSpeedPps: 1150,
        mouseCurvatureRatio: 1.02,
        deviceAnomalyScore: 18,
        keystrokeScore: 24,
        mouseScore: 14,
      },
    ];
  },

  /**
   * GET /api/admin/analytics
   */
  async getAnalytics(): Promise<AdminAnalyticsData> {

    if (!API_CONFIG.USE_MOCK) {
      return apiFetch<AdminAnalyticsData>('/admin/analytics');
    }

    await new Promise((resolve) => setTimeout(resolve, 250));

    return {
      riskDistribution: [
        { name: 'Low Risk (0-29)', value: 84, color: '#10b981' },
        { name: 'Medium Risk (30-59)', value: 12, color: '#f59e0b' },
        { name: 'High Risk (60-100)', value: 4, color: '#ef4444' },
      ],
      transactionTimeline: [
        { time: '00:00', normal: 12, suspicious: 1, amount: 24000 },
        { time: '04:00', normal: 4, suspicious: 2, amount: 85000 },
        { time: '08:00', normal: 38, suspicious: 0, amount: 142000 },
        { time: '12:00', normal: 64, suspicious: 1, amount: 298000 },
        { time: '16:00', normal: 52, suspicious: 0, amount: 195000 },
        { time: '20:00', normal: 31, suspicious: 1, amount: 110000 },
        { time: '23:00', normal: 18, suspicious: 0, amount: 48000 },
      ],
      loginResults: [
        { result: 'Normal Allow', count: 412, fill: '#10b981' },
        { result: 'Step-up Verified', count: 38, fill: '#f59e0b' },
        { result: 'Suspicious Blocked', count: 9, fill: '#ef4444' },
      ],
      fraudCategories: [
        { category: 'Tor/Proxy Device', count: 14, percentage: 38 },
        { category: 'Keystroke Anomaly', count: 11, percentage: 30 },
        { category: 'Unusual Outflow Spike', count: 7, percentage: 19 },
        { category: 'Off-Hours Velocity', count: 5, percentage: 13 },
      ],
      behavioralFactorWeights: [
        { factor: 'Typing Pattern (Dwell/Flight)', weight: 25, anomalyCount: 14 },
        { factor: 'Login Temporal Window', weight: 20, anomalyCount: 8 },
        { factor: 'Device & Hardware Posture', weight: 20, anomalyCount: 19 },
        { factor: 'Mouse & Pointer Dynamics', weight: 15, anomalyCount: 12 },
        { factor: 'Transaction Profile Model', weight: 20, anomalyCount: 7 },
      ],
    };
  },
};
