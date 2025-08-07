import { Heading } from '@chakra-ui/react';
import DashboardLayout from '../components/DashboardLayout.jsx';
import TicketTable from '../components/admin/TicketTable.jsx';

export default function SupportDashboard() {
  const tickets = [
    { id: 1, subject: 'Login issue', userId: 'alice', status: 'open' },
    { id: 2, subject: 'Payment missing', userId: 'bob', status: 'resolved' },
  ];

  return (
    <DashboardLayout title="Support Dashboard" requiredRole="support">
      <Heading size="md" mb={2}>
        Recent Tickets
      </Heading>
      <TicketTable items={tickets} />
    </DashboardLayout>
  );
}
