const { BrowserRouter, Routes, Route, Navigate } = ReactRouterDOM;
const { ChakraProvider } = ChakraUI;

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
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<Protected><HomeDashboard /></Protected>} />
        <Route path="/onboarding/documents" element={<Protected><CvCoverLetterPage /></Protected>} />
        <Route path="/feed" element={<Protected><LiveFeed /></Protected>} />
        <Route path="/profile/customize" element={<Protected><ProfileCustomization /></Protected>} />
        <Route path="/setup/financial-media" element={<Protected><FinancialMediaSetupPage /></Protected>} />
        <Route path="/headhunter/dashboard" element={<Protected><HeadhunterDashboard /></Protected>} />
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
