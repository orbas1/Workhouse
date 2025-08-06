import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import NavBar from './components/NavBar.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { ProfileProvider } from './context/ProfileContext.jsx';
import NavMenu from './components/NavMenu.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ProfileCustomizationPage from './pages/ProfileCustomizationPage.jsx';
import OrderManagementPage from './pages/OrderManagementPage.jsx';
import ConnectionManagementPage from './pages/ConnectionManagementPage.jsx';
import ContractFormPage from './pages/ContractFormPage.jsx';
import ServiceCreationPage from './pages/ServiceCreationPage.jsx';
import TaskWorkflowPage from './pages/TaskWorkflowPage.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { ProfileProvider } from './context/ProfileContext.jsx';
import { TaskProvider } from './context/TaskContext.jsx';
import NotificationSettingsPage from './pages/NotificationSettingsPage.jsx';
import ArticlePage from './pages/ArticlePage.jsx';
import DisputeFormPage from './pages/DisputeFormPage.jsx';
import AdminUserContentPage from './pages/AdminUserContentPage.jsx';
import SupportDisputePage from './pages/SupportDisputePage.jsx';
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
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function AdminProtected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/profile" replace />;
  return children;
  return user ? children : <Navigate to="/login" replace />;
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
            <NavMenu />
            <Box p={4}>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route
                  path="/profile"
                  element={<Protected><ProfilePage /></Protected>}
                />
                <Route
                  path="/profile/customize"
                  element={<Protected><ProfileCustomizationPage /></Protected>}
                />
                <Route
                  path="/contracts/new"
                  element={<Protected><ContractFormPage /></Protected>}
                />
                <Route
                  path="/contracts/new"
                  element={<Protected><ContractFormPage /></Protected>}
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
                <Route
                  path="/support"
                  element={
                    <Protected>
                      <SupportDisputePage />
                    </Protected>
                  }
                />
                <Route
                  path="/disputes/new"
                  element={
                    <Protected>
                      <DisputeFormPage />
                    </Protected>
                  }
                />
                <Route
                  path="/disputes/:disputeId/respond"
                  element={
                    <Protected>
                      <DisputeFormPage />
                    </Protected>
                  }
                />
                <Route
                  path="/notifications"
                  element={
                    <Protected>
                      <NotificationSettingsPage />
                    </Protected>
                  }
                />
                <Route path="/" element={<Navigate to="/profile" replace />} />
                <Route path="*" element={<Navigate to="/profile" replace />} />
                <Route path="/articles" element={<ArticlePage />} />
                <Route path="/articles/:articleId" element={<ArticlePage />} />
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
                  path="/services/new"
                  element={<Protected><ServiceCreationPage /></Protected>}
                />
                <Route
                  path="/admin/users"
                  element={<AdminProtected><AdminUserContentPage /></AdminProtected>}
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
import CreatorAnalyticsPage from './pages/CreatorAnalyticsPage.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import ServiceOrderManagementPage from './pages/ServiceOrderManagementPage.jsx';
import TaskDashboardPage from './pages/TaskDashboardPage.jsx';
import TaskManagementPage from './pages/TaskManagementPage.jsx';
import DisputeDashboardPage from './pages/DisputeDashboardPage.jsx';
import { ProfileProvider } from './context/ProfileContext.jsx';
import SimDashboardPage from './pages/SimDashboardPage.jsx';
import ContentLibraryPage from './pages/ContentLibraryPage.jsx';
import ContractManagementPage from './pages/ContractManagementPage.jsx';
import ClassroomPage from './pages/ClassroomPage.jsx';
import ServiceSearchPage from './pages/ServiceSearchPage.jsx';
import ServiceDetailPage from './pages/ServiceDetailPage.jsx';
import { TaskProvider } from './context/TaskContext.jsx';
import AnalyticsAuditPage from './pages/AnalyticsAuditPage.jsx';

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <ProfileProvider>
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
                  path="/connections"
                  element={
                    <Protected>
                      <ConnectionManagementPage />
                    </Protected>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <Protected>
                      <OrderManagementPage />
                    </Protected>
                  }
                />
                <Route path="*" element={<Navigate to="/profile" replace />} />
              </Routes>
            </Box>
          </BrowserRouter>
          <NavBar />
          <Box p={4}>
              <Routes>
                <Route path="/" element={<Navigate to="/profile" replace />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile/customize" element={<ProfileCustomizationPage />} />
                <Route path="/creator/analytics" element={<CreatorAnalyticsPage />} />
              </Routes>
            <Routes>
              <Route path="/" element={<Navigate to="/profile" replace />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/customize" element={<ProfileCustomizationPage />} />
              <Route path="/sim-dashboard" element={<SimDashboardPage />} />
              <Route path="/content-library" element={<ContentLibraryPage />} />
              <Route path="/payments" element={<PaymentPage />} />
              <Route path="/contracts" element={<ContractManagementPage />} />
              <Route path="/classroom/:id" element={<ClassroomPage />} />
              <Route path="/service-orders" element={<ServiceOrderManagementPage />} />
              <Route path="/services" element={<ServiceSearchPage />} />
              <Route path="/services/:id" element={<ServiceDetailPage />} />
              <Route path="/tasks" element={<TaskDashboardPage />} />
              <Route path="/disputes" element={<DisputeDashboardPage />} />
              <Route path="/admin/analytics" element={<AnalyticsAuditPage />} />
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
      </AuthProvider>
    </ChakraProvider>
  );
}
