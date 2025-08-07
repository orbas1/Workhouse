import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import FinanceDashboard from './FinanceDashboard.jsx';
import SupportDashboard from './SupportDashboard.jsx';
import ManagementDashboard from './ManagementDashboard.jsx';
import MarketingDashboard from './MarketingDashboard.jsx';
import HRDashboard from './HRDashboard.jsx';
import SuperAdminDashboard from './SuperAdminDashboard.jsx';

export default function AdminDashboard() {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }
  switch (user.role) {
    case 'finance':
      return <FinanceDashboard />;
    case 'support':
      return <SupportDashboard />;
    case 'management':
      return <ManagementDashboard />;
    case 'marketing':
      return <MarketingDashboard />;
    case 'hr':
      return <HRDashboard />;
    case 'superadmin':
    case 'admin':
    default:
      return <SuperAdminDashboard />;
  }
}
