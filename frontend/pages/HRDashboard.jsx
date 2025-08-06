import { Box, Heading } from '@chakra-ui/react';
import NavMenu from '../components/NavMenu.jsx';

export default function HRDashboard() {
  return (
    <Box p={4}>
      <NavMenu />
      <Heading mb={4}>HR Dashboard</Heading>
      {/* TODO: Add employee management and HR tools */}
    </Box>
  );
}
