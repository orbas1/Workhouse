import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import NavBar from './components/NavBar.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ProfileCustomizationPage from './pages/ProfileCustomizationPage.jsx';
import AdsDashboardPage from './pages/AdsDashboardPage.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';

function Protected({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <BrowserRouter>
          <NavBar />
          <Box p={4}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/profile"
                element={
                  <Protected>
                    <ProfilePage />
                  </Protected>
                }
              />
              <Route
                path="/profile/customize"
                element={
                  <Protected>
                    <ProfileCustomizationPage />
                  </Protected>
                }
              />
              <Route
                path="/ads"
                element={
                  <Protected>
                    <AdsDashboardPage />
                  </Protected>
                }
              />
              <Route path="*" element={<Navigate to="/profile" replace />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  );
}
