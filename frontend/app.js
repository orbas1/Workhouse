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
