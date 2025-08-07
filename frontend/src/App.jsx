import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider, Box, Flex } from '@chakra-ui/react';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import KlEditionPage from './pages/KlEditionPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import SettingsDashboardPage from './pages/SettingsDashboardPage.jsx';
import GlobalSearchPage from './pages/GlobalSearchPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import NavMenu from './components/NavMenu.jsx';

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
          <Flex>
            <NavMenu />
            <Box flex="1" p={4}>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/landing" element={<LandingPage />} />
              <Route
                path="/"
                element={
                  <Protected>
                    <DashboardPage />
                  </Protected>
                }
              />
              <Route
                path="/profile"
                element={
                  <Protected>
                    <ProfilePage />
                  </Protected>
                }
              />
              <Route
                path="/settings"
                element={
                  <Protected>
                    <SettingsDashboardPage />
                  </Protected>
                }
              />
              <Route
                path="/kl"
                element={
                  <Protected>
                    <KlEditionPage />
                  </Protected>
                }
              />
              <Route
                path="/search"
                element={
                  <Protected>
                    <GlobalSearchPage />
                  </Protected>
                }
              />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Box>
          </Flex>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  );
}
