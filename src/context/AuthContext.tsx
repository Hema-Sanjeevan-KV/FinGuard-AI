import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Account, RiskLevel, AppRoute } from '../types';
import { MOCK_USERS } from '../data/mockData';
import { bankingService } from '../services/bankingService';
import { authService } from '../services/authService';

export type { AppRoute };

interface AuthContextType {
  currentUser: User | null;
  currentAccount: Account | null;
  isAuthenticated: boolean;
  isBehavioralVerified: boolean;
  currentRoute: AppRoute;
  setCurrentRoute: (route: AppRoute) => void;
  loginAsUser: (userId?: string) => Promise<void>;
  loginAsAdmin: () => Promise<void>;
  completeBehavioralVerification: (score?: number, level?: RiskLevel) => void;
  updateBehavioralRisk: (score: number, level: RiskLevel) => void;
  logout: () => void;
  refreshUserData: () => Promise<void>;
  switchUser: (userId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(MOCK_USERS[0]); // Defaults to Harish Kumar for immediate ease of inspection
  const [currentAccount, setCurrentAccount] = useState<Account | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [isBehavioralVerified, setIsBehavioralVerified] = useState<boolean>(true);
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('landing');

  // Load account whenever currentUser changes
  const loadAccount = async (userId: string) => {
    try {
      const acc = await bankingService.getAccount(userId);
      setCurrentAccount(acc);
    } catch (err) {
      console.error('Failed to load account:', err);
    }
  };

  useEffect(() => {
    if (currentUser && currentUser.role === 'USER') {
      loadAccount(currentUser.id);
    }
  }, [currentUser]);

  const loginAsUser = async (userId: string = 'USR-101') => {
    const user = MOCK_USERS.find((u) => u.id === userId) || MOCK_USERS[0];
    setCurrentUser(user);
    setIsAuthenticated(true);
    setIsBehavioralVerified(false);
    setCurrentRoute('behavioral-verify');
    await loadAccount(user.id);
  };

  const loginAsAdmin = async () => {
    const admin = MOCK_USERS.find((u) => u.role === 'ADMIN') || MOCK_USERS[3];
    setCurrentUser(admin);
    setIsAuthenticated(true);
    setIsBehavioralVerified(true);
    setCurrentRoute('admin-dashboard');
  };

  const completeBehavioralVerification = (score: number = 18, level: RiskLevel = 'LOW') => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        riskScore: score,
        riskLevel: level,
      });
    }
    setIsBehavioralVerified(true);
    setCurrentRoute('user-dashboard');
  };

  const updateBehavioralRisk = (score: number, level: RiskLevel) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        riskScore: score,
        riskLevel: level,
      });
    }
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
    setCurrentAccount(null);
    setIsAuthenticated(false);
    setIsBehavioralVerified(false);
    setCurrentRoute('landing');
  };

  const refreshUserData = async () => {
    if (currentUser) {
      await loadAccount(currentUser.id);
    }
  };

  const switchUser = async (userId: string) => {
    const user = MOCK_USERS.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      if (user.role === 'ADMIN') {
        setIsBehavioralVerified(true);
        setCurrentRoute('admin-dashboard');
      } else {
        await loadAccount(user.id);
        setIsBehavioralVerified(true);
        // keep current route if in user area, otherwise go to user-dashboard
        if (!currentRoute.startsWith('user-') && !currentRoute.startsWith('account-') && !currentRoute.startsWith('transaction-') && !currentRoute.startsWith('transfer-') && !currentRoute.startsWith('security-')) {
          setCurrentRoute('user-dashboard');
        }
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentAccount,
        isAuthenticated,
        isBehavioralVerified,
        currentRoute,
        setCurrentRoute,
        loginAsUser,
        loginAsAdmin,
        completeBehavioralVerification,
        updateBehavioralRisk,
        logout,
        refreshUserData,
        switchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
