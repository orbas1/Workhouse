import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import NavBar from './components/NavBar.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ProfileCustomizationPage from './pages/ProfileCustomizationPage.jsx';
import ContractFormPage from './pages/ContractFormPage.jsx';
import ServiceCreationPage from './pages/ServiceCreationPage.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import ServiceOrderManagementPage from './pages/ServiceOrderManagementPage.jsx';
import TaskDashboardPage from './pages/TaskDashboardPage.jsx';
import TaskManagementPage from './pages/TaskManagementPage.jsx';
import ContractManagementPage from './pages/ContractManagementPage.jsx';
import ClassroomPage from './pages/ClassroomPage.jsx';
import ServiceSearchPage from './pages/ServiceSearchPage.jsx';
import ServiceDetailPage from './pages/ServiceDetailPage.jsx';
import AffiliateManagementPage from './pages/AffiliateManagementPage.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { ProfileProvider } from './context/ProfileContext.jsx';
import { TaskProvider } from './context/TaskContext.jsx';
import { AffiliateProvider } from './context/AffiliateContext.jsx';

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
          <ProfileProvider>
            <AffiliateProvider>
              <NavBar />
              <Box p={4}>
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/profile" element={<Protected><ProfilePage /></Protected>} />
                  <Route path="/profile/customize" element={<Protected><ProfileCustomizationPage /></Protected>} />
                  <Route path="/contracts/new" element={<Protected><ContractFormPage /></Protected>} />
                  <Route path="/services/new" element={<Protected><ServiceCreationPage /></Protected>} />
                  <Route path="/payments" element={<Protected><PaymentPage /></Protected>} />
                  <Route path="/contracts" element={<Protected><ContractManagementPage /></Protected>} />
                  <Route path="/classroom/:id" element={<Protected><ClassroomPage /></Protected>} />
                  <Route path="/service-orders" element={<Protected><ServiceOrderManagementPage /></Protected>} />
                  <Route path="/services" element={<Protected><ServiceSearchPage /></Protected>} />
                  <Route path="/services/:id" element={<Protected><ServiceDetailPage /></Protected>} />
                  <Route path="/tasks" element={<Protected><TaskDashboardPage /></Protected>} />
                  <Route path="/tasks/manage" element={<Protected><TaskManagementPage /></Protected>} />
                  <Route path="/affiliates" element={<Protected><AffiliateManagementPage /></Protected>} />
                  <Route path="/" element={<Navigate to="/profile" replace />} />
                  <Route path="*" element={<Navigate to="/profile" replace />} />
                </Routes>
              </Box>
            </AffiliateProvider>
            <TaskProvider>
              {/* Additional task-specific routes could be placed here */}
            </TaskProvider>
          </ProfileProvider>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  );
}
