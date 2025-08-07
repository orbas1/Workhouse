import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import argonTheme from '../argonTheme.js';

import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import KlEditionPage from './pages/KlEditionPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import SettingsDashboardPage from './pages/SettingsDashboardPage.jsx';
import GlobalSearchPage from './pages/GlobalSearchPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import LiveFeedPage from './pages/LiveFeedPage.jsx';
import AdminSystemSettingsPage from './pages/AdminSystemSettingsPage.jsx';
import InstallationWizardPage from './pages/InstallationWizardPage.jsx';

import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { InstallProvider, useInstall } from './context/InstallContext.jsx';
import Layout from './components/Layout.jsx';

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" replace />;
}

function RequireInstall({ children }) {
  const { installed, loading } = useInstall();
  if (loading) return null;
  return installed ? children : <Navigate to="/install" replace />;
}

export default function App() {
  return (
    <ChakraProvider theme={argonTheme}>
      <InstallProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/install" element={<InstallationWizardPage />} />
              <Route
                path="/login"
                element={
                  <RequireInstall>
                    <LoginPage />
                  </RequireInstall>
                }
              />
              <Route
                path="/signup"
                element={
                  <RequireInstall>
                    <SignupPage />
                  </RequireInstall>
                }
              />
              <Route
                path="/landing"
                element={
                  <RequireInstall>
                    <LandingPage />
                  </RequireInstall>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <RequireInstall>
                    <Protected>
                      <Layout>
                        <DashboardPage />
                      </Layout>
                    </Protected>
                  </RequireInstall>
                }
              />
              <Route
                path="/profile"
                element={
                  <RequireInstall>
                    <Protected>
                      <Layout>
                        <ProfilePage />
                      </Layout>
                    </Protected>
                  </RequireInstall>
                }
              />
              <Route
                path="/settings"
                element={
                  <RequireInstall>
                    <Protected>
                      <Layout>
                        <SettingsDashboardPage />
                      </Layout>
                    </Protected>
                  </RequireInstall>
                }
              />
              <Route
                path="/kl"
                element={
                  <RequireInstall>
                    <Protected>
                      <Layout>
                        <KlEditionPage />
                      </Layout>
                    </Protected>
                  </RequireInstall>
                }
              />
              <Route
                path="/search"
                element={
                  <RequireInstall>
                    <Protected>
                      <Layout>
                        <GlobalSearchPage />
                      </Layout>
                    </Protected>
                  </RequireInstall>
                }
              />
              <Route
                path="/feed"
                element={
                  <RequireInstall>
                    <Protected>
                      <Layout>
                        <LiveFeedPage />
                      </Layout>
                    </Protected>
                  </RequireInstall>
                }
              />
              <Route
                path="/admin/system-settings"
                element={
                  <RequireInstall>
                    <Protected>
                      <Layout>
                        <AdminSystemSettingsPage />
                      </Layout>
                    </Protected>
                  </RequireInstall>
                }
              />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </InstallProvider>
    </ChakraProvider>
  );
}
