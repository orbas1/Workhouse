const { BrowserRouter, Routes, Route, Navigate } = ReactRouterDOM;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<Protected><HomeDashboard /></Protected>} />
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
