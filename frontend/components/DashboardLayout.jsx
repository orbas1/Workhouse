import { Box, Heading } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import NavMenu from './NavMenu.jsx';
import ChatWidget from './widgets/ChatWidget.jsx';
import UserCountWidget from './widgets/UserCountWidget.jsx';
import { useAuth } from '../context/AuthContext.js';

/**
 * Standard layout for admin dashboards. Ensures global navigation,
 * theme usage and basic widgets are present. Also guards the dashboard
 * behind the admin login route.
 */
export default function DashboardLayout({ title, children, requiredRole }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <Box p={4}>
      <NavMenu />
      {title && <Heading mb={4}>{title}</Heading>}
      {children}
      <UserCountWidget />
      <ChatWidget />
    </Box>
  );
}
