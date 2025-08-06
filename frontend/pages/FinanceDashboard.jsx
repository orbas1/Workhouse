import { Box, Heading } from '@chakra-ui/react';
import NavMenu from '../components/NavMenu.jsx';

export default function FinanceDashboard() {
  return (
    <Box p={4}>
      <NavMenu />
      <Heading mb={4}>Finance Dashboard</Heading>
      {/* TODO: Add graphs, earnings, expenses, invoices, and records */}
    </Box>
  );
}
