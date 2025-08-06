import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import NavBar from './components/NavBar.jsx';
import NavMenu from './components/NavMenu.jsx';
import AdCreateEdit from './pages/AdCreateEdit';
import AdminDashboard from './pages/AdminDashboard';
import AdminUserContentPage from './pages/AdminUserContentPage.jsx';
import AdsDashboardPage from './pages/AdsDashboardPage.jsx';
import AffiliateManagementPage from './pages/AffiliateManagementPage.jsx';
import AnalyticsAuditPage from './pages/AnalyticsAuditPage.jsx';
import ArticlePage from './pages/ArticlePage.jsx';
import BillingSubscription from './pages/BillingSubscription';
import ClassroomPage from './pages/ClassroomPage.jsx';
import ConnectionManagementPage from './pages/ConnectionManagementPage.jsx';
import ContentLibraryPage from './pages/ContentLibraryPage.jsx';
import ContractFormPage from './pages/ContractFormPage.jsx';
import ContractManagementPage from './pages/ContractManagementPage.jsx';
import CreatorAnalyticsPage from './pages/CreatorAnalyticsPage.jsx';
import DisputeDashboardPage from './pages/DisputeDashboardPage.jsx';
import DisputeFormPage from './pages/DisputeFormPage.jsx';
import DisputeManagementPage from './pages/DisputeManagementPage.jsx';
import ExperienceDashboardPage from './pages/ExperienceDashboardPage.jsx';
import FileResourceManagement from './pages/FileResourceManagement.jsx';
import InSessionNetworking from './pages/InSessionNetworking.jsx';
import LivePlaybackPage from './pages/LivePlaybackPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotificationSettingsPage from './pages/NotificationSettingsPage.jsx';
import OpportunityManagement from './pages/OpportunityManagement.jsx';
import OpportunityManagementPage from './pages/OpportunityManagementPage.jsx';
import OrderManagementPage from './pages/OrderManagementPage.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import PaymentTimesheetManagement from './pages/PaymentTimesheetManagement';
import ProfileCustomizationPage from './pages/ProfileCustomizationPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ProjectManagement from './pages/ProjectManagement';
import ScheduleCalendarPage from './pages/ScheduleCalendarPage.jsx';
import SearchConnectionPage from './pages/SearchConnectionPage.jsx';
import ServiceCreationPage from './pages/ServiceCreationPage.jsx';
import ServiceDetailPage from './pages/ServiceDetailPage.jsx';
import ServiceOrderManagementPage from './pages/ServiceOrderManagementPage.jsx';
import ServiceSearchPage from './pages/ServiceSearchPage.jsx';
import SettingsPage from './pages/SettingsPage';
import SignupPage from './pages/SignupPage.jsx';
import SimDashboardPage from './pages/SimDashboardPage.jsx';
import SupportDisputePage from './pages/SupportDisputePage.jsx';
import SystemSettingsEmployeeManagement from './pages/SystemSettingsEmployeeManagement';
import TaskDashboardPage from './pages/TaskDashboardPage.jsx';
import TaskManagementPage from './pages/TaskManagementPage.jsx';
import TaskSchedulePage from './pages/TaskSchedulePage.jsx';
import TaskSearchPage from './pages/TaskSearchPage.jsx';
import TaskWorkflowPage from './pages/TaskWorkflowPage.jsx';
import VolunteerTrackingPage from './pages/VolunteerTrackingPage.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { ProfileProvider } from './context/ProfileContext.jsx';
import { TaskProvider } from './context/TaskContext.jsx';
import { AffiliateProvider } from './context/AffiliateContext.jsx';

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

export default function App() {
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
                    {/* Routes from frontend/app.js */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/dashboard" element={<Protected><HomeDashboard /></Protected>} />
                    <Route path="/messages" element={<Protected><ChatInbox /></Protected>} />
                    <Route path="/employment" element={<Protected><EmploymentDashboard /></Protected>} />
                    <Route path="/messages" element={<Protected><ChatInbox /></Protected>} />
                    <Route path="/applications-interviews" element={<Protected><ApplicationInterviewManagement /></Protected>} />
                    <Route path="/opportunities" element={<Protected><OpportunitySearchPage /></Protected>} />
                    <Route path="/connections" element={<Protected><ConnectionManagementPage /></Protected>} />
                    <Route path="/sessions" element={<Protected><NetworkingSessions /></Protected>} />
                    <Route path="/volunteering" element={<Protected><VolunteeringDashboard /></Protected>} />
                    <Route path="/payments" element={<Protected><PaymentTimesheetManagement agencyId="default" /></Protected>} />
                    <Route path="/applications-interviews" element={<Protected><ApplicationInterviewManagement /></Protected>} />
                    <Route path="/payments" element={<Protected><PaymentTimesheetManagement agencyId="default" /></Protected>} />
                    <Route path="/billing" element={<Protected><BillingSubscription /></Protected>} />
                    <Route path="/applications-interviews" element={<Protected><ApplicationInterviewManagement /></Protected>} />
                    <Route path="/ads/create" element={<Protected><AdCreateEdit /></Protected>} />
                    <Route path="/ads/:adId/edit" element={<Protected><AdCreateEdit /></Protected>} />
                    <Route path="/sessions" element={<Protected><SessionManagementPage /></Protected>} />
                    <Route path="/networking" element={<Protected><NetworkingDashboard /></Protected>} />
                    <Route path="/proposals-invoices" element={<Protected><ProposalInvoiceManagement /></Protected>} />
                    <Route path="/workspace/projects" element={<Protected><ProjectManagement /></Protected>} />
                    <Route path="/education/schedule" element={<Protected><ScheduleCalendarPage /></Protected>} />
                    <Route path="/workspace/files" element={<Protected><FileResourceManagement /></Protected>} />
                    <Route path="/settings" element={<Protected><SettingsPage /></Protected>} />
                    <Route path="/admin" element={<Protected><AdminDashboard /></Protected>} />
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpUserInfo />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/dashboard" element={<Protected><HomeDashboard /></Protected>} />
                    <Route path="/employment" element={<Protected><EmploymentDashboard /></Protected>} />
                    <Route path="/onboarding/documents" element={<Protected><CvCoverLetterPage /></Protected>} />
                    <Route path="/feed" element={<Protected><LiveFeed /></Protected>} />
                    <Route path="/profile" element={<Protected><ProfilePage /></Protected>} />
                    <Route path="/jobs" element={<Protected><JobListingsPage /></Protected>} />
                    <Route path="/profile/customize" element={<Protected><ProfileCustomization /></Protected>} />
                    <Route path="/setup/financial-media" element={<Protected><FinancialMediaSetupPage /></Protected>} />
                    <Route path="/headhunter/dashboard" element={<Protected><HeadhunterDashboard /></Protected>} />
                    <Route path="/messages" element={<Protected><ChatInbox /></Protected>} />
                    <Route path="/applications-interviews" element={<Protected><ApplicationInterviewManagement /></Protected>} />
                    <Route path="/progress" element={<Protected><ProgressDashboard /></Protected>} />
                    <Route path="/interview/:id" element={<Protected><VirtualInterviewPage /></Protected>} />
                    <Route path="/gigs/manage" element={<Protected><GigManagementPage /></Protected>} />
                    <Route path="/gigs" element={<Protected><GigsDashboard /></Protected>} />
                    <Route path="/connections" element={<Protected><ConnectionManagementPage /></Protected>} />
                    <Route path="/gigs" element={<Protected><GigsDashboard /></Protected>} />
                    <Route path="/opportunities" element={<Protected><OpportunitySearchPage /></Protected>} />
                    <Route path="/ads" element={<Protected><BillingAnalyticsAdLibraryPage /></Protected>} />
                    <Route path="/sessions" element={<Protected><NetworkingSessions /></Protected>} />
                    <Route path="/startups/profile-plan" element={<Protected><StartupProfilePlanPage /></Protected>} />
                    <Route path="/content/manage" element={<Protected><ContentManager /></Protected>} />
                    <Route path="/opportunities" element={<Protected><OpportunityManagement /></Protected>} />
                    <Route path="/volunteering" element={<Protected><VolunteeringDashboard /></Protected>} />
                    <Route path="/volunteer/opportunities" element={<Protected><VolunteerOpportunitiesPage /></Protected>} />
                    <Route path="/analytics" element={<Protected><LiveEngagementAnalytics /></Protected>} />
                    <Route path="/ads/create" element={<Protected><AdCreateEdit /></Protected>} />
                    <Route path="/ads/:adId/edit" element={<Protected><AdCreateEdit /></Protected>} />
                    <Route path="/creator/dashboard" element={<Protected><CreatorDashboard /></Protected>} />
                    <Route path="/networking/session/:sessionId" element={<Protected><InSessionNetworking /></Protected>} />
                    <Route path="/sessions" element={<Protected><SessionManagementPage /></Protected>} />
                    <Route path="/networking" element={<Protected><NetworkingDashboard /></Protected>} />
                    <Route path="/proposals-invoices" element={<Protected><ProposalInvoiceManagement /></Protected>} />
                    <Route path="/payments" element={<Protected><PaymentTimesheetManagement agencyId="default" /></Protected>} />
                    <Route path="/billing" element={<Protected><BillingSubscription /></Protected>} />
                    <Route path="/education" element={<Protected><EducationDashboard /></Protected>} />
                    <Route path="/education/courses" element={<Protected><CourseModuleManagement /></Protected>} />
                    <Route path="/education/schedule" element={<Protected><ScheduleCalendarPage /></Protected>} />
                    <Route path="/courses" element={<Protected><CoursePurchasePage /></Protected>} />
                    <Route path="/calendar" element={<Protected><CalendarPage /></Protected>} />
                    <Route path="/gigs/search" element={<Protected><GigSearchPage /></Protected>} />
                    <Route path="/workspace/projects" element={<Protected><ProjectManagement /></Protected>} />
                    <Route path="/workspace/files" element={<Protected><FileResourceManagement /></Protected>} />
                    <Route path="/settings" element={<Protected><SettingsPage /></Protected>} />
                    <Route path="/stats" element={<Protected><StatsAnalyticsPage /></Protected>} />
                    <Route path="/blog" element={<Protected><BlogHome /></Protected>} />
                    <Route path="/admin" element={<Protected><AdminDashboard /></Protected>} />
                    <Route path="/admin/system-settings" element={<Protected><SystemSettingsEmployeeManagement /></Protected>} />
                    {/* Additional routes from frontend/src/App.jsx */}
                    <Route path="/contracts/new" element={<Protected><ContractFormPage /></Protected>} />
                    <Route path="/contracts/:contractId/edit" element={<Protected><ContractFormPage /></Protected>} />
                    <Route path="/services/new" element={<Protected><ServiceCreationPage /></Protected>} />
                    <Route path="/tasks" element={<Protected><TaskDashboardPage /></Protected>} />
                    <Route path="/tasks/manage" element={<Protected><TaskManagementPage /></Protected>} />
                    <Route path="/schedule" element={<Protected><ScheduleCalendarPage /></Protected>} />
                    <Route path="/tasks-workflow" element={<Protected><TaskWorkflowPage /></Protected>} />
                    <Route path="/payments" element={<Protected><PaymentPage /></Protected>} />
                    <Route path="/contracts" element={<Protected><ContractManagementPage /></Protected>} />
                    <Route path="/classroom/:id" element={<Protected><ClassroomPage /></Protected>} />
                    <Route path="/service-orders" element={<Protected><ServiceOrderManagementPage /></Protected>} />
                    <Route path="/services" element={<Protected><ServiceSearchPage /></Protected>} />
                    <Route path="/services/:id" element={<Protected><ServiceDetailPage /></Protected>} />
                    <Route path="/affiliates" element={<Protected><AffiliateManagementPage /></Protected>} />
                    <Route path="/support" element={<Protected><SupportDisputePage /></Protected>} />
                    <Route path="/disputes/new" element={<Protected><DisputeFormPage /></Protected>} />
                    <Route path="/disputes/:disputeId/respond" element={<Protected><DisputeFormPage /></Protected>} />
                    <Route path="/notifications" element={<Protected><NotificationSettingsPage /></Protected>} />
                    <Route path="/disputes/:disputeId?" element={<Protected><DisputeManagementPage /></Protected>} />
                    <Route path="/articles" element={<ArticlePage />} />
                    <Route path="/articles/:articleId" element={<ArticlePage />} />
                    <Route path="/" element={<Navigate to="/profile" replace />} />
                    <Route path="*" element={<Navigate to="/profile" replace />} />
                  </Routes>
                </Box>
              </AffiliateProvider>
            </TaskProvider>
          </ProfileProvider>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  );
}

