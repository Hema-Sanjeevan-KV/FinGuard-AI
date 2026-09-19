/**
 * FinGuard AI - Domain Types & API Contracts
 * Designed to mirror Java Spring Boot Entity Models and DTOs
 */

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export type SecurityDecision = 'ALLOW' | 'STEP_UP_VERIFICATION' | 'BLOCK';

export type AppRoute =
  // Public
  | 'landing'
  | 'about'
  | 'security-features'
  | 'login'
  // User Area
  | 'behavioral-verification'
  | 'behavioral-verify'
  | 'user-dashboard'
  | 'account-details'
  | 'transaction-history'
  | 'transfer-money'
  | 'security-center'
  | 'user-profile'
  // Admin Area
  | 'admin-login'
  | 'admin-dashboard'
  | 'admin-users'
  | 'admin-transactions'
  | 'admin-alerts'
  | 'admin-logins'
  | 'admin-login-monitor'
  | 'admin-behavior'
  | 'admin-behavioral'
  | 'admin-analytics';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  accountStatus: 'ACTIVE' | 'FLAGGED' | 'LOCKED';
  riskLevel: RiskLevel;
  riskScore: number; // 0 - 100
  lastLogin: string;
  currentDevice: string;
  deviceStatus: 'TRUSTED' | 'UNRECOGNIZED' | 'FLAGGED';
  avatarInitials: string;
  phone?: string;
  baselineCalibrated: boolean;
  baselineSamples: number;
}

export interface Account {
  id: string;
  userId: string;
  accountNumber: string;
  accountType: 'SAVINGS' | 'CHECKING' | 'INVESTMENT';
  balance: number;
  availableBalance: number;
  currency: string;
  ifscCode: string;
  branch: string;
  status: 'ACTIVE' | 'FROZEN' | 'RESTRICTED';
  securityTier: 'TIER-1 (STANDARD)' | 'TIER-2 (BEHAVIORAL_PROTECTED)' | 'TIER-3 (MAX_SECURITY)';
  dailyLimit: number;
  remainingDailyLimit: number;
}

export interface Transaction {
  id: string;
  userId: string;
  userName?: string;
  date: string;
  timestamp: number;
  type: 'DEPOSIT' | 'TRANSFER' | 'WITHDRAWAL' | 'PAYMENT';
  description: string;
  recipient?: string;
  amount: number;
  currency: string;
  status: 'COMPLETED' | 'PENDING' | 'FLAGGED' | 'BLOCKED';
  riskLevel: RiskLevel;
  riskScore: number; // 0 - 100
  securityFactors?: {
    behavioralRisk: number;
    deviceRisk: number;
    transactionRisk: number;
    networkRisk?: number;
  };
}

export interface TransactionSecurityCheck {
  behavioralRisk: number;
  deviceRisk: number;
  transactionRisk: number;
  overallRiskScore: number;
  decision: RiskLevel;
  canProceed: boolean;
  message: string;
  recommendation: string;
  anomalyDetected: boolean;
  anomalies?: string[];
}

export interface BehavioralMetrics {
  userId?: string;
  userName?: string;
  typingPatternScore: number; // 0 - 25
  loginTimeScore: number;     // 0 - 20
  deviceScore: number;        // 0 - 20
  mouseInteractionScore: number; // 0 - 15
  transactionPatternScore: number; // 0 - 20
  totalRiskScore: number;     // 0 - 100
  riskLevel: RiskLevel;
  avgDwellTimeMs?: number;
  dwellTimeVarianceMs?: number;
  avgFlightTimeMs?: number;
  flightTimeVarianceMs?: number;
  mouseSpeedPps?: number;
  mouseCurvatureRatio?: number;
  deviceAnomalyScore?: number;
  keystrokeScore?: number;
  mouseScore?: number;
  factors: {
    typingCadence: 'NORMAL' | 'UNUSUAL' | 'SUSPICIOUS';
    loginTimeWindow: 'NORMAL' | 'UNUSUAL' | 'SUSPICIOUS';
    devicePosture: 'NORMAL' | 'UNUSUAL' | 'SUSPICIOUS';
    mouseDynamics: 'NORMAL' | 'UNUSUAL' | 'SUSPICIOUS';
    transactionVelocity: 'NORMAL' | 'UNUSUAL' | 'SUSPICIOUS';
  };
  metricsDetail?: {
    keystrokeDwellTimeMs: number;
    flightTimeVarianceMs: number;
    mouseJitterRate: number;
    deviceFingerprintHash: string;
    sessionAgeMinutes: number;
  };
}

export interface SecurityAlert {
  id: string;
  userId: string;
  userName: string;
  timestamp: string;
  event: 'UNKNOWN_DEVICE' | 'UNUSUAL_LOGIN_TIME' | 'BEHAVIORAL_MISMATCH' | 'UNUSUAL_TRANSACTION' | 'RAPID_FIRE_ATTEMPT';
  eventDescription: string;
  triggerReason?: string;
  riskScore: number;
  riskLevel: RiskLevel;
  severity?: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  status: 'OPEN' | 'INVESTIGATING' | 'RESOLVED';
  ipAddress: string;
  location: string;
  device: string;
}

export interface LoginAttempt {
  id: string;
  userId: string;
  userName: string;
  timestamp: string;
  device: string;
  location: string;
  ipAddress: string;
  behaviorScore: number;
  loginResult: 'SUCCESS' | 'STEP_UP_VERIFIED' | 'FAILED' | 'BLOCKED';
  riskLevel: RiskLevel;
  factorTrigger?: string;
}

export interface RecognizedDevice {
  id: string;
  deviceName: string;
  browser: string;
  os: string;
  ipAddress: string;
  firstSeen: string;
  lastActive: string;
  status: 'TRUSTED' | 'SUSPICIOUS' | 'REVOKED';
  isCurrent: boolean;
}

export interface AdminDashboardMetrics {
  totalUsers: number;
  activeSessions: number;
  transactionsToday: number;
  suspiciousTransactions: number;
  highRiskUsers: number;
  fraudAlerts: number;
  systemHealthScore: number;
  averageRiskScore: number;
}

export interface AdminDashboardStats {
  totalUsers: number;
  monitoredSessions: number;
  highRiskUsers: number;
  activeAlerts: number;
}

