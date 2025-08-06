import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import NavBar from './components/NavBar.jsx';
import NavMenu from './components/NavMenu.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ProfileCustomizationPage from './pages/ProfileCustomizationPage.jsx';
import ContractFormPage from './pages/ContractFormPage.jsx';
import ServiceCreationPage from './pages/ServiceCreationPage.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { ProfileProvider } from './context/ProfileContext.jsx';

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <BrowserRouter>
          <ProfileProvider>
            <NavMenu />
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
                  path="/contracts/new"
                  element={
                    <Protected>
                      <ContractFormPage />
                    </Protected>
                  }
                />
                <Route
                  path="/contracts/:contractId/edit"
                  element={
                    <Protected>
                      <ContractFormPage />
                    </Protected>
                  }
                />
                <Route path="/" element={<Navigate to="/profile" replace />} />
                <Route path="*" element={<Navigate to="/profile" replace />} />
              </Routes>
            </Box>
          </ProfileProvider>
        </BrowserRouter>
      </AuthProvider>
    <ChakraProvider>
      <AuthProvider>
        <BrowserRouter>
          <ProfileProvider>
            <NavMenu />
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
                  path="/contracts/new"
                  element={
                    <Protected>
                      <ContractFormPage />
                    </Protected>
                  }
                />
                <Route
                  path="/contracts/:contractId/edit"
                  element={
                    <Protected>
                      <ContractFormPage />
                    </Protected>
                  }
                />
                <Route path="/" element={<Navigate to="/profile" replace />} />
                <Route path="*" element={<Navigate to="/profile" replace />} />
              </Routes>
            </Box>
          </ProfileProvider>
        </BrowserRouter>
      </AuthProvider>
    <ChakraProvider>
      <AuthProvider>
        <BrowserRouter>
          <ProfileProvider>
            <NavBar />
            <NavMenu />
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
                  path="/services/new"
                  element={
                    <Protected>
                      <ServiceCreationPage />
                    </Protected>
                  }
                />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </Box>
          </ProfileProvider>
        </BrowserRouter>
      </AuthProvider>
    <AuthProvider>
      <BrowserRouter>
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
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
import { ChakraProvider, Box } from '@chakra-ui/react';
import NavBar from './components/NavBar.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ProfileCustomizationPage from './pages/ProfileCustomizationPage.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import ServiceOrderManagementPage from './pages/ServiceOrderManagementPage.jsx';
import TaskDashboardPage from './pages/TaskDashboardPage.jsx';
import TaskManagementPage from './pages/TaskManagementPage.jsx';
import DisputeDashboardPage from './pages/DisputeDashboardPage.jsx';
import { ProfileProvider } from './context/ProfileContext.jsx';
import ContractManagementPage from './pages/ContractManagementPage.jsx';
import ClassroomPage from './pages/ClassroomPage.jsx';
import ServiceSearchPage from './pages/ServiceSearchPage.jsx';
import ServiceDetailPage from './pages/ServiceDetailPage.jsx';
import { TaskProvider } from './context/TaskContext.jsx';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <ProfileProvider>
          <NavBar />
          <Box p={4}>
            <Routes>
              <Route path="/" element={<Navigate to="/profile" replace />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/customize" element={<ProfileCustomizationPage />} />
              <Route path="/payments" element={<PaymentPage />} />
              <Route path="/contracts" element={<ContractManagementPage />} />
              <Route path="/classroom/:id" element={<ClassroomPage />} />
              <Route path="/service-orders" element={<ServiceOrderManagementPage />} />
              <Route path="/services" element={<ServiceSearchPage />} />
              <Route path="/services/:id" element={<ServiceDetailPage />} />
              <Route path="/tasks" element={<TaskDashboardPage />} />
              <Route path="/disputes" element={<DisputeDashboardPage />} />
            </Routes>
          </Box>
          <TaskProvider>
            <NavBar />
            <Box p={4}>
              <Routes>
                <Route path="/" element={<Navigate to="/profile" replace />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile/customize" element={<ProfileCustomizationPage />} />
                <Route path="/tasks" element={<TaskManagementPage />} />
              </Routes>
            </Box>
          </TaskProvider>
        </ProfileProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}
