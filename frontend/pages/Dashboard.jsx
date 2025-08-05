import { ChakraProvider, Box, Heading, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import NavMenu from '../components/NavMenu';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <ChakraProvider>
      <NavMenu />
      <Box p={4} className="dashboard">
        <Heading mb={4}>Dashboard</Heading>
        <Button colorScheme="teal" onClick={() => navigate('/opportunities')}>
          Find Opportunities
        </Button>
      </Box>
    </ChakraProvider>
  );
}
