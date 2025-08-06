import { Box, Heading } from '@chakra-ui/react';
import NavMenu from '../components/NavMenu.jsx';

export default function MarketingDashboard() {
  return (
    <Box p={4}>
      <NavMenu />
      <Heading mb={4}>Marketing Dashboard</Heading>
      {/* TODO: Add marketing analytics and campaign tools */}
    </Box>
  );
}
