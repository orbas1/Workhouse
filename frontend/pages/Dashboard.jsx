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
        <Heading>Dashboard</Heading>
        <Button mt={4} colorScheme="teal" onClick={() => navigate('/classroom/WorkhouseClassroom')}>
          Enter Classroom
        </Button>
      </Box>
    </ChakraProvider>
  );
}
