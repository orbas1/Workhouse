import { Box, Heading } from '@chakra-ui/react';
import NavMenu from '../components/NavMenu.jsx';

export default function ManagementDashboard() {
  return (
    <Box p={4}>
      <NavMenu />
      <Heading mb={4}>Management Dashboard</Heading>
      {/* TODO: Add management widgets and tools */}
    </Box>
  );
}
