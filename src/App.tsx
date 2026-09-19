/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppRoute } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AcademicBanner } from './components/AcademicBanner';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { AboutPage } from './pages/public/AboutPage';
import { SecurityFeaturesPage } from './pages/public/SecurityFeaturesPage';
import { LoginPage } from './pages/public/LoginPage';

// User Pages
import { BehavioralVerificationPage } from './pages/user/BehavioralVerificationPage';
import { UserDashboardPage } from './pages/user/UserDashboardPage';
import { AccountDetailsPage } from './pages/user/AccountDetailsPage';
import { TransactionHistoryPage } from './pages/user/TransactionHistoryPage';
import { TransferMoneyPage } from './pages/user/TransferMoneyPage';
import { SecurityCenterPage } from './pages/user/SecurityCenterPage';
import { UserProfilePage } from './pages/user/UserProfilePage';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { UserManagementPage } from './pages/admin/UserManagementPage';
import { TransactionMonitoringPage } from './pages/admin/TransactionMonitoringPage';
import { FraudAlertsPage } from './pages/admin/FraudAlertsPage';
import { LoginAttemptMonitoringPage } from './pages/admin/LoginAttemptMonitoringPage';
import { BehavioralRiskMonitoringPage } from './pages/admin/BehavioralRiskMonitoringPage';
import { SecurityAnalyticsPage } from './pages/admin/SecurityAnalyticsPage';

const MainRouter: React.FC = () => {
  const { currentRoute, setCurrentRoute } = useAuth();

  // Sync hash with currentRoute for smooth browser navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as AppRoute;
      if (hash && hash !== currentRoute) {
        setCurrentRoute(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentRoute, setCurrentRoute]);

  // Update hash when route changes
  useEffect(() => {
    if (window.location.hash !== `#${currentRoute}`) {
      window.location.hash = currentRoute;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute]);

  const renderActivePage = () => {
    switch (currentRoute) {
      // Public Area
      case 'landing':
        return <LandingPage />;
      case 'about':
        return <AboutPage />;
      case 'security-features':
        return <SecurityFeaturesPage />;
      case 'login':
        return <LoginPage />;

      // User Banking Area
      case 'behavioral-verification':
        return <BehavioralVerificationPage />;
      case 'user-dashboard':
        return <UserDashboardPage />;
      case 'account-details':
        return <AccountDetailsPage />;
      case 'transaction-history':
        return <TransactionHistoryPage />;
      case 'transfer-money':
        return <TransferMoneyPage />;
      case 'security-center':
        return <SecurityCenterPage />;
      case 'user-profile':
        return <UserProfilePage />;

      // Admin Security SOC Area
      case 'admin-dashboard':
        return <AdminDashboardPage />;
      case 'admin-users':
        return <UserManagementPage />;
      case 'admin-transactions':
        return <TransactionMonitoringPage />;
      case 'admin-alerts':
        return <FraudAlertsPage />;
      case 'admin-logins':
        return <LoginAttemptMonitoringPage />;
      case 'admin-behavior':
        return <BehavioralRiskMonitoringPage />;
      case 'admin-analytics':
        return <SecurityAnalyticsPage />;

      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <AcademicBanner />
      <Navbar />
      <main className="flex-1">
        {renderActivePage()}
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainRouter />
    </AuthProvider>
  );
}

