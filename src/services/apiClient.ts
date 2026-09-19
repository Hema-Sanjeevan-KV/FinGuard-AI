/**
 * FinGuard AI - API Client Architecture
 * 
 * Spring Boot Integration Notes:
 * When the Java Spring Boot backend is deployed, set `USE_MOCK = false` or configure
 * `VITE_SPRING_BOOT_API_URL` (default: http://localhost:8080).
 * 
 * Corresponding Spring Boot Controllers:
 * - AuthController: /api/auth/**
 * - AccountController: /api/accounts/**
 * - TransactionController: /api/transactions/**
 * - SecurityRiskController: /api/security/**
 * - AdminMonitoringController: /api/admin/**
 */

export const API_CONFIG = {
  USE_MOCK: true, // Set to false when connecting to live Java Spring Boot backend
  BASE_URL: (import.meta.env && import.meta.env.VITE_SPRING_BOOT_API_URL) || 'http://localhost:8080/api',
  SIMULATED_NETWORK_DELAY_MS: 300,
};

/**
 * Generic HTTP Request abstraction prepared for Spring Boot RESTful integration
 */
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  if (API_CONFIG.USE_MOCK) {
    // Simulated network latency for realistic fintech UX
    await new Promise((resolve) => setTimeout(resolve, API_CONFIG.SIMULATED_NETWORK_DELAY_MS));
    throw new Error(`Endpoint ${endpoint} called in mock mode without handler.`);
  }

  const token = localStorage.getItem('finguard_jwt_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...((options.headers as Record<string, string>) || {}),
  };

  const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Spring Boot API error (${response.status}): ${errorBody || response.statusText}`);
  }

  return response.json() as Promise<T>;
}
