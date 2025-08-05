import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import ProfilePage from './pages/ProfilePage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <ProfilePage />
    </ChakraProvider>
  </React.StrictMode>
);
