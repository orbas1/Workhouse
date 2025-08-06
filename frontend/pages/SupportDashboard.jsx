import { Box, Heading } from '@chakra-ui/react';
import NavMenu from '../components/NavMenu.jsx';

export default function SupportDashboard() {
  return (
    <Box p={4}>
      <NavMenu />
      <Heading mb={4}>Support Dashboard</Heading>
      {/* TODO: Add chat, tickets, dispute handling, and help centre management */}
    </Box>
  );
}
