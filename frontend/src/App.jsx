import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import NavBar from './components/NavBar.jsx';
import NavMenu from './components/NavMenu.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ProfileCustomizationPage from './pages/ProfileCustomizationPage.jsx';
import ConnectionManagementPage from './pages/ConnectionManagementPage.jsx';
import NotificationSettingsPage from './pages/NotificationSettingsPage.jsx';
import OrderManagementPage from './pages/OrderManagementPage.jsx';
import ServiceCreationPage from './pages/ServiceCreationPage.jsx';
import ServiceDetailPage from './pages/ServiceDetailPage.jsx';
import ServiceOrderManagementPage from './pages/ServiceOrderManagementPage.jsx';
import ServiceSearchPage from './pages/ServiceSearchPage.jsx';
import ServiceEditPage from './pages/ServiceEditPage.jsx';
import GigSearchPage from './pages/GigSearchPage.jsx';
import GigDetailPage from './pages/GigDetailPage.jsx';
import TaskDashboardPage from './pages/TaskDashboardPage.jsx';
import TaskManagementPage from './pages/TaskManagementPage.jsx';
import TaskSearchPage from './pages/TaskSearchPage.jsx';
import TaskSchedulePage from './pages/TaskSchedulePage.jsx';
import TaskWorkflowPage from './pages/TaskWorkflowPage.jsx';
import ExperienceDashboardPage from './pages/ExperienceDashboardPage.jsx';
import OpportunityManagementPage from './pages/OpportunityManagementPage.jsx';
import VolunteerTrackingPage from './pages/VolunteerTrackingPage.jsx';
import OpportunitySearchPage from './pages/OpportunitySearchPage.jsx';
import ClassroomPage from './pages/ClassroomPage.jsx';
import ScheduleCalendarPage from './pages/ScheduleCalendarPage.jsx';
import EducationSchedulePage from './pages/EducationSchedulePage.jsx';
import CourseListPage from './pages/CourseListPage.jsx';
import CourseDetailPage from './pages/CourseDetailPage.jsx';
import ArticlePage from './pages/ArticlePage.jsx';
import DisputeDashboardPage from './pages/DisputeDashboardPage.jsx';
import DisputeFormPage from './pages/DisputeFormPage.jsx';
import DisputeManagementPage from './pages/DisputeManagementPage.jsx';
import SupportDisputePage from './pages/SupportDisputePage.jsx';
import ContractManagementPage from './pages/ContractManagementPage.jsx';
import ContractFormPage from './pages/ContractFormPage.jsx';
import ContentLibraryPage from './pages/ContentLibraryPage.jsx';
import CreatorAnalyticsPage from './pages/CreatorAnalyticsPage.jsx';
import LivePlaybackPage from './pages/LivePlaybackPage.jsx';
import AffiliateManagementPage from './pages/AffiliateManagementPage.jsx';
import AdsDashboardPage from './pages/AdsDashboardPage.jsx';
import AnalyticsAuditPage from './pages/AnalyticsAuditPage.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import SimDashboardPage from './pages/SimDashboardPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import InstallationWizardPage from './pages/InstallationWizardPage.jsx';
import FinancialMediaSetupPage from './pages/FinancialMediaSetupPage.jsx';
import OnboardingDocumentsPage from './pages/OnboardingDocumentsPage.jsx';
import ChatInboxPage from './pages/ChatInboxPage.jsx';
import JobListingsPage from './pages/JobListingsPage.jsx';
import FreelanceDashboardPage from './pages/FreelanceDashboardPage.jsx';
import AdminUserContentPage from './pages/AdminUserContentPage.jsx';

import DashboardPage from './pages/DashboardPage.jsx';
import LiveFeedPage from './pages/LiveFeedPage.jsx';
import EmploymentDashboardPage from './pages/EmploymentDashboardPage.jsx';
import ApplicationInterviewManagementPage from './pages/ApplicationInterviewManagementPage.jsx';
import HeadhunterDashboardPage from './pages/HeadhunterDashboardPage.jsx';

import AdCreateEdit from '../pages/AdCreateEdit.jsx';
import AdminDashboard from '../pages/AdminDashboard.jsx';
import BillingSubscription from '../pages/BillingSubscription.jsx';
import FileResourceManagement from '../pages/FileResourceManagement.jsx';
import InSessionNetworking from '../pages/InSessionNetworking.jsx';
import NetworkingSessions from '../pages/NetworkingSessions.jsx';
import ProjectManagement from '../pages/ProjectManagement.jsx';
import ProposalInvoiceManagement from '../pages/ProposalInvoiceManagement.jsx';
import SettingsPage from '../pages/SettingsPage.jsx';
import SystemSettingsEmployeeManagement from '../pages/SystemSettingsEmployeeManagement.jsx';
import PaymentTimesheetManagement from '../pages/PaymentTimesheetManagement.jsx';
import EducationDashboard from '../pages/EducationDashboard.jsx';
import WorkspaceDashboard from '../pages/WorkspaceDashboard.jsx';
import JobPostManagement from '../pages/JobPostManagement.jsx';
import VirtualInterview from '../pages/VirtualInterview.jsx';
import InterviewSession from '../pages/InterviewSession.jsx';
import VolunteerOpportunitySearchPage from './pages/VolunteerOpportunitySearchPage.jsx';

import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { ProfileProvider } from './context/ProfileContext.jsx';
import { TaskProvider } from './context/TaskContext.jsx';
import { AffiliateProvider } from './context/AffiliateContext.jsx';
import ChatWidget from './components/ChatWidget.jsx';

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" replace />;
}

function AdminProtected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return user.role === 'admin' ? children : <Navigate to="/profile" replace />;
}

function RoleProtected({ roles, children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return roles.includes(user.role) ? children : <Navigate to="/profile" replace />;
}

const PlaceholderPage = ({ title }) => <Box p={4}>{title}</Box>;

export default function App() {
  const routes = [
    // Entry & Authentication
    { path: '/', element: <LandingPage /> },
    { path: '/install', element: <InstallationWizardPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/signup', element: <SignupPage /> },
    { path: '/onboarding/documents', element: <OnboardingDocumentsPage />, protected: true },
    { path: '/setup/financial-media', element: <FinancialMediaSetupPage />, protected: true },

    // Core User Hub
    { path: '/dashboard', element: <DashboardPage />, protected: true },
    { path: '/feed', element: <LiveFeedPage />, protected: true },
    { path: '/profile', element: <ProfilePage />, protected: true },
    { path: '/profile/customize', element: <ProfileCustomizationPage />, protected: true },
    { path: '/messages', element: <ChatInboxPage />, protected: true },
    { path: '/connections', element: <ConnectionManagementPage />, protected: true },

    // Employment & Gigs
    { path: '/employment', element: <EmploymentDashboardPage />, protected: true },
    { path: '/jobs', element: <JobListingsPage />, protected: true },
    { path: '/applications-interviews', element: <ApplicationInterviewManagementPage />, protected: true },
    { path: '/headhunter/dashboard', element: <HeadhunterDashboardPage />, protected: true },
    { path: '/interviews', element: <VirtualInterview />, protected: true },
    { path: '/interviews/:interviewId', element: <InterviewSession />, protected: true },
    { path: '/job-posts', element: <JobPostManagement />, protected: true },
    { path: '/gigs', element: <PlaceholderPage title="Gigs Dashboard" />, protected: true },
    { path: '/gigs/manage', element: <PlaceholderPage title="Gig Creation & Management" />, protected: true },
    { path: '/gigs/search', element: <GigSearchPage />, protected: true },
    { path: '/gigs/:id', element: <GigDetailPage />, protected: true },
    { path: '/orders', element: <OrderManagementPage />, protected: true },
    { path: '/payments', element: <PaymentPage />, protected: true },
    { path: '/ads', element: <AdsDashboardPage />, protected: true },
    { path: '/ads/create', element: <AdCreateEdit />, protected: true },
    { path: '/ads/:adId/edit', element: <AdCreateEdit />, protected: true },

    // Contracts & Freelancing
    { path: '/freelance', element: <FreelanceDashboardPage />, protected: true },
    { path: '/contracts', element: <ContractManagementPage />, protected: true },
    { path: '/contracts/new', element: <ContractFormPage />, protected: true },
    { path: '/proposals-invoices', element: <ProposalInvoiceManagement />, protected: true },
    { path: '/services', element: <ServiceSearchPage />, protected: true },
    { path: '/services/new', element: <ServiceCreationPage />, protected: true },
    { path: '/services/:id/edit', element: <ServiceEditPage />, protected: true },
    { path: '/services/:id', element: <ServiceDetailPage />, protected: true },
    { path: '/service-orders', element: <ServiceOrderManagementPage />, protected: true },
    { path: '/payments/timesheets', element: <PaymentTimesheetManagement />, protected: true },

    // Education & Services
    { path: '/education', element: <EducationDashboard />, protected: true },
    { path: '/education/schedule', element: <EducationSchedulePage />, protected: true },
    { path: '/education/courses', element: <PlaceholderPage title="Course & Module Management" />, protected: true },
    { path: '/courses', element: <CourseListPage />, protected: true },
    { path: '/courses/:courseId', element: <CourseDetailPage />, protected: true },
    { path: '/classroom/:id', element: <ClassroomPage />, protected: true },

    // Tasks & Experiences
    { path: '/tasks', element: <TaskDashboardPage />, protected: true },
    { path: '/tasks/manage', element: <TaskManagementPage />, protected: true },
    { path: '/tasks/search', element: <TaskSearchPage />, protected: true },
    { path: '/tasks/schedule', element: <TaskSchedulePage />, protected: true },
    { path: '/tasks-workflow', element: <TaskWorkflowPage />, protected: true },
    { path: '/experience', element: <ExperienceDashboardPage />, protected: true },
    { path: '/opportunities', element: <OpportunitySearchPage />, protected: true },
    { path: '/opportunities/manage', element: <OpportunityManagementPage />, protected: true },
    { path: '/volunteer-applications', element: <VolunteerTrackingPage />, protected: true },

    // Volunteering
    { path: '/volunteering', element: <PlaceholderPage title="Volunteering Dashboard" />, protected: true },
    { path: '/volunteer/opportunities', element: <VolunteerOpportunitySearchPage />, protected: true },

    // Networking
    { path: '/networking', element: <PlaceholderPage title="Networking Dashboard" />, protected: true },
    { path: '/sessions', element: <NetworkingSessions />, protected: true },
    { path: '/networking/session/:sessionId', element: <InSessionNetworking />, protected: true },
    { path: '/session-management', element: <PlaceholderPage title="Session Management" />, protected: true },

    // Media & Advertising
    { path: '/creator/dashboard', element: <PlaceholderPage title="Creator Dashboard" />, protected: true },
    { path: '/creator/analytics', element: <CreatorAnalyticsPage />, protected: true },
    { path: '/content/manage', element: <PlaceholderPage title="Content Creation & Management" />, protected: true },
    { path: '/content-library', element: <ContentLibraryPage />, protected: true },
    { path: '/live', element: <LivePlaybackPage />, protected: true },
    { path: '/billing', element: <BillingSubscription />, protected: true },
    { path: '/analytics', element: <AnalyticsAuditPage />, protected: true },

    // Startup Ecosystem
    { path: '/startups/profile-plan', element: <PlaceholderPage title="Startup Profile & Plan" />, protected: true },

    // Workspace & Projects
    { path: '/workspace', element: <WorkspaceDashboard />, protected: true },
    { path: '/workspace/projects', element: <ProjectManagement />, protected: true },
    { path: '/workspace/files', element: <FileResourceManagement />, protected: true },
    { path: '/schedule', element: <ScheduleCalendarPage />, protected: true },
    { path: '/calendar', element: <PlaceholderPage title="Calendar" />, protected: true },

    // Settings, Billing & Analytics
    { path: '/notifications', element: <NotificationSettingsPage />, protected: true },
    { path: '/settings', element: <SettingsPage />, protected: true },
    { path: '/stats', element: <PlaceholderPage title="Stats & Analytics" />, protected: true },
    { path: '/blog', element: <PlaceholderPage title="Blog Homepage" />, protected: true },
    { path: '/articles', element: <ArticlePage /> },
    { path: '/articles/:articleId', element: <ArticlePage /> },

    // Disputes, Admin & Affiliates
    { path: '/disputes', element: <DisputeDashboardPage />, protected: true },
    { path: '/disputes/new', element: <DisputeFormPage />, protected: true },
    { path: '/disputes/:disputeId/respond', element: <DisputeFormPage />, protected: true },
    { path: '/disputes/:disputeId?', element: <DisputeManagementPage />, protected: true },
    { path: '/support', element: <SupportDisputePage />, protected: true },
    { path: '/admin', element: <AdminDashboard />, admin: true },
    { path: '/admin/analytics', element: <AnalyticsAuditPage />, admin: true },
    { path: '/admin/users-content', element: <AdminUserContentPage />, roles: ['admin', 'content-manager'] },
    { path: '/admin/system-settings', element: <SystemSettingsEmployeeManagement />, admin: true },
    { path: '/affiliates', element: <AffiliateManagementPage />, protected: true },
    { path: '/sim-dashboard', element: <SimDashboardPage />, protected: true },
    { path: '/proposal-invoices', element: <ProposalInvoiceManagement />, protected: true },

    // Fallback
    { path: '*', element: <Navigate to="/" replace /> }
  ];

  return (
    <ChakraProvider>
      <AuthProvider>
        <BrowserRouter>
          <ProfileProvider>
            <TaskProvider>
              <AffiliateProvider>
                <NavBar />
                <NavMenu />
                <Box p={4}>
                  <Routes>
                    {routes.map(({ path, element, protected: isProtected, admin, roles }, idx) => {
                      let wrapped;
                      if (roles) {
                        wrapped = <RoleProtected roles={roles}>{element}</RoleProtected>;
                      } else if (admin) {
                        wrapped = <AdminProtected>{element}</AdminProtected>;
                      } else if (isProtected) {
                        wrapped = <Protected>{element}</Protected>;
                      } else {
                        wrapped = element;
                      }
                      return <Route key={idx} path={path} element={wrapped} />;
                    })}
                  </Routes>
                </Box>
                <ChatWidget />
              </AffiliateProvider>
            </TaskProvider>
          </ProfileProvider>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  );
}

