import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import NavMenu from './components/NavMenu.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ProfileCustomizationPage from './pages/ProfileCustomizationPage.jsx';
import ContractFormPage from './pages/ContractFormPage.jsx';
import ServiceCreationPage from './pages/ServiceCreationPage.jsx';
import TaskWorkflowPage from './pages/TaskWorkflowPage.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { ProfileProvider } from './context/ProfileContext.jsx';
import { TaskProvider } from './context/TaskContext.jsx';

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <BrowserRouter>
          <ProfileProvider>
            <TaskProvider>
              <NavMenu />
              <Box p={4}>
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/profile" element={<Protected><ProfilePage /></Protected>} />
                  <Route path="/profile/customize" element={<Protected><ProfileCustomizationPage /></Protected>} />
                  <Route path="/contracts/new" element={<Protected><ContractFormPage /></Protected>} />
                  <Route path="/contracts/:contractId/edit" element={<Protected><ContractFormPage /></Protected>} />
                  <Route path="/services/new" element={<Protected><ServiceCreationPage /></Protected>} />
                  <Route path="/tasks-workflow" element={<Protected><TaskWorkflowPage /></Protected>} />
                  <Route path="/" element={<Navigate to="/profile" replace />} />
                  <Route path="*" element={<Navigate to="/profile" replace />} />
                </Routes>
              </Box>
            </TaskProvider>
          </ProfileProvider>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  );
}
