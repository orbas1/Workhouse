import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import KlEditionPage from './pages/KlEditionPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import SettingsDashboardPage from './pages/SettingsDashboardPage.jsx';
import GlobalSearchPage from './pages/GlobalSearchPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import LiveFeedPage from './pages/LiveFeedPage.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Layout from './components/Layout.jsx';

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={
                <Protected>
                  <Layout>
                    <DashboardPage />
                  </Layout>
                </Protected>
              }
            />
            <Route
              path="/profile"
              element={
                <Protected>
                  <Layout>
                    <ProfilePage />
                  </Layout>
                </Protected>
              }
            />
            <Route
              path="/settings"
              element={
                <Protected>
                  <Layout>
                    <SettingsDashboardPage />
                  </Layout>
                </Protected>
              }
            />
            <Route
              path="/kl"
              element={
                <Protected>
                  <Layout>
                    <KlEditionPage />
                  </Layout>
                </Protected>
              }
            />
            <Route
              path="/search"
              element={
                <Protected>
                  <Layout>
                    <GlobalSearchPage />
                  </Layout>
                </Protected>
              }
            />
            <Route
              path="/feed"
              element={
                <Protected>
                  <Layout>
                    <LiveFeedPage />
                  </Layout>
                </Protected>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  );
}
