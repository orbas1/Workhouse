const { BrowserRouter, Routes, Route, Navigate } = ReactRouterDOM;
const { ChakraProvider } = ChakraUI;
import InSessionNetworking from './pages/InSessionNetworking.jsx';

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/dashboard" element={<Protected><HomeDashboard /></Protected>} />
            <Route path="/messages" element={<Protected><ChatInbox /></Protected>} />
            <Route path="/employment" element={<Protected><EmploymentDashboard /></Protected>} />
            <Route path="/messages" element={<Protected><ChatInbox /></Protected>} />
            <Route path="/applications-interviews" element={<Protected><ApplicationInterviewManagement /></Protected>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
    <BrowserRouter>
      <Routes>
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
        <Route path="/interview/:id" element={<Protected><VirtualInterviewPage /></Protected>} />
        <Route path="/gigs/manage" element={<Protected><GigManagementPage /></Protected>} />
        <Route path="/gigs" element={<Protected><GigsDashboard /></Protected>} />
        <Route path="/networking/session/:sessionId" element={<Protected><InSessionNetworking /></Protected>} />
      </Routes>
    </BrowserRouter>
  );
}

function Protected({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
