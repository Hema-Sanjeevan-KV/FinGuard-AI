/**
 * FinGuard AI - Banking & Transaction API Service
 * Maps to Java Spring Boot: @RestController @RequestMapping("/api")
 */

import { Account, Transaction, TransactionSecurityCheck } from '../types';
import { MOCK_ACCOUNTS, INITIAL_TRANSACTIONS } from '../data/mockData';
import { API_CONFIG, apiFetch } from './apiClient';

// In-memory runtime cache for the interactive demo session
let dynamicTransactions: Transaction[] = [...INITIAL_TRANSACTIONS];
const dynamicAccounts: Record<string, Account> = JSON.parse(JSON.stringify(MOCK_ACCOUNTS));

export interface TransferRequest {
  userId: string;
  recipient: string;
  amount: number;
  description: string;
  targetAccount?: string;
}

export const bankingService = {
  /**
   * GET /api/accounts
   * Java Spring Boot equivalent:
   * @GetMapping("/accounts/{userId}")
   * public ResponseEntity<Account> getAccount(@PathVariable String userId)
   */
  async getAccount(userId: string): Promise<Account> {
    if (!API_CONFIG.USE_MOCK) {
      return apiFetch<Account>(`/accounts/${userId}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 200));
    const account = dynamicAccounts[userId] || dynamicAccounts['USR-101'];
    return { ...account };
  },

  /**
   * GET /api/transactions
   * Java Spring Boot equivalent:
   * @GetMapping("/transactions")
   * public ResponseEntity<List<Transaction>> getTransactions(@RequestParam(required = false) String userId)
   */
  async getTransactions(userId?: string): Promise<Transaction[]> {
    if (!API_CONFIG.USE_MOCK) {
      const query = userId ? `?userId=${userId}` : '';
      return apiFetch<Transaction[]>(`/transactions${query}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
    if (userId) {
      return dynamicTransactions.filter((t) => t.userId === userId);
    }
    return [...dynamicTransactions];
  },

  /**
   * POST /api/transactions/security-check
   * Java Spring Boot equivalent:
   * @PostMapping("/transactions/security-check")
   * public ResponseEntity<TransactionSecurityCheck> evaluateTransactionSecurity(@RequestBody TransactionDto dto)
   * 
   * Decision Model:
   * 0–29: LOW RISK -> Allow normal access
   * 30–59: MEDIUM RISK -> Request additional verification
   * 60–100: HIGH RISK -> Block/suspend the suspicious operation
   */
  async evaluateTransactionSecurity(
    req: TransferRequest
  ): Promise<TransactionSecurityCheck> {
    if (!API_CONFIG.USE_MOCK) {
      return apiFetch<TransactionSecurityCheck>('/transactions/security-check', {
        method: 'POST',
        body: JSON.stringify(req),
      });
    }

    await new Promise((resolve) => setTimeout(resolve, 400));

    // Dynamic Academic Heuristics for the prototype demonstration:
    // Base behavioral risk
    let behaviorRisk = 10;
    let deviceRisk = 0;
    let transactionRisk = 15;
    const anomalies: string[] = [];

    // Suspicious factor 1: High amount threshold demonstration
    if (req.amount > 60000) {
      transactionRisk = 45;
      behaviorRisk = 22;
      deviceRisk = 15;
      anomalies.push('Transaction amount exceeds 120% of median monthly outflow');
    } else if (req.amount > 25000) {
      transactionRisk = 25;
      behaviorRisk = 12;
      anomalies.push('Above-average transfer value requires second-factor heuristic check');
    }

    // Suspicious factor 2: Suspicious keywords in description
    const descLower = (req.description || '').toLowerCase();
    if (
      descLower.includes('crypto') ||
      descLower.includes('tor') ||
      descLower.includes('urgent') ||
      descLower.includes('lottery')
    ) {
      transactionRisk += 30;
      deviceRisk += 10;
      anomalies.push('High-risk transaction annotation detected by NLP classifier');
    }

    // Suspicious factor 3: Flagged user demo
    if (req.userId === 'USR-103') {
      deviceRisk += 25;
      behaviorRisk += 20;
      anomalies.push('Uncalibrated biometric profile from untrusted network IP');
    }

    const overallRisk = Math.min(100, behaviorRisk + deviceRisk + transactionRisk);

    let decision: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
    let canProceed = true;
    let message = 'Transaction verified by Behavioral & Fraud Engine.';
    let recommendation = 'Low risk profile. Cleared for immediate processing.';

    if (overallRisk >= 60) {
      decision = 'HIGH';
      canProceed = false;
      message = 'Operation Blocked: Suspicious behavioral biometric and transaction risk score.';
      recommendation = 'Transfer withheld pending SOC Fraud Analyst security clearance.';
    } else if (overallRisk >= 30) {
      decision = 'MEDIUM';
      canProceed = true;
      message = 'Elevated Risk: Additional step-up biometric/behavioral verification recommended.';
      recommendation = 'Allowed with continuous behavioral monitoring and audit flag.';
    }

    return {
      behavioralRisk: behaviorRisk,
      deviceRisk: deviceRisk,
      transactionRisk: transactionRisk,
      overallRiskScore: overallRisk,
      decision,
      canProceed,
      message,
      recommendation,
      anomalyDetected: anomalies.length > 0,
      anomalies,
    };
  },

  /**
   * POST /api/transactions
   * Java Spring Boot equivalent:
   * @PostMapping("/transactions")
   * public ResponseEntity<Transaction> executeTransfer(@RequestBody TransferRequest req)
   */
  async executeTransfer(req: TransferRequest): Promise<{
    transaction: Transaction;
    updatedAccount: Account;
  }> {
    if (!API_CONFIG.USE_MOCK) {
      return apiFetch<{ transaction: Transaction; updatedAccount: Account }>(
        '/transactions',
        {
          method: 'POST',
          body: JSON.stringify(req),
        }
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 450));

    // Security evaluation
    const check = await this.evaluateTransactionSecurity(req);
    if (!check.canProceed && check.decision === 'HIGH') {
      throw new Error(`Transaction Blocked by FinGuard AI Security Rule: Risk score ${check.overallRiskScore}/100 exceeds safe threshold.`);
    }

    // Deduct amount from simulated account
    const userAcc = dynamicAccounts[req.userId] || dynamicAccounts['USR-101'];
    if (userAcc.availableBalance < req.amount) {
      throw new Error(`Insufficient funds: Available balance is ${userAcc.currency}${userAcc.availableBalance.toLocaleString()}`);
    }

    userAcc.balance -= req.amount;
    userAcc.availableBalance -= req.amount;

    const newTxn: Transaction = {
      id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      userId: req.userId,
      date: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      timestamp: Date.now(),
      type: 'TRANSFER',
      description: req.description || `Simulated Transfer to ${req.recipient}`,
      recipient: req.recipient,
      amount: req.amount,
      currency: userAcc.currency,
      status: 'COMPLETED',
      riskLevel: check.decision,
      riskScore: check.overallRiskScore,
      securityFactors: {
        behavioralRisk: check.behavioralRisk,
        deviceRisk: check.deviceRisk,
        transactionRisk: check.transactionRisk,
      },
    };

    // Prepend to transaction list
    dynamicTransactions = [newTxn, ...dynamicTransactions];

    return {
      transaction: newTxn,
      updatedAccount: { ...userAcc },
    };
  },

  /**
   * Helper to reset demo transactions if user wants fresh state
   */
  resetDemoData() {
    dynamicTransactions = [...INITIAL_TRANSACTIONS];
    Object.assign(dynamicAccounts, JSON.parse(JSON.stringify(MOCK_ACCOUNTS)));
  },
};
