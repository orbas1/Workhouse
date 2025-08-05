import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import NavBar from './components/NavBar.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ProfileCustomizationPage from './pages/ProfileCustomizationPage.jsx';
import { ProfileProvider } from './context/ProfileContext.jsx';

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
            </Routes>
          </Box>
        </ProfileProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
