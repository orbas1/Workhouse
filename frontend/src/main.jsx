import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage.jsx';
import OrderManagementPage from './pages/OrderManagementPage.jsx';
import NavBar from './components/NavBar.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/orders" element={<OrderManagementPage />} />
          <Route path="*" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
);
