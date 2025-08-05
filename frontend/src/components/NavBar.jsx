import React from 'react';
import { Flex, Heading, Spacer, Button } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/NavBar.css';

export default function NavBar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <Flex className="nav-bar" bg="teal.500" color="white" p={4} align="center">
      <Heading size="md">Workhouse</Heading>
      <Spacer />
      {user ? (
        <>
          <Button as={RouterLink} to="/profile" variant="ghost" color="white" mr={2}>
            Profile
          </Button>
          <Button as={RouterLink} to="/connections" variant="ghost" color="white" mr={2}>
            Connections
          </Button>
          <Button as={RouterLink} to="/orders" variant="ghost" color="white" mr={2}>
            Orders
          </Button>
          <Button variant="outline" color="white" onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button as={RouterLink} to="/login" variant="ghost" color="white" mr={2}>
            Login
          </Button>
          <Button as={RouterLink} to="/signup" variant="outline" color="white">
            Sign Up
          </Button>
        </>
      )}
    </Flex>
  );
}
