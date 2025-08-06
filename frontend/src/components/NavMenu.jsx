import React from 'react';
import { Flex, Heading, Spacer, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import '../styles/NavMenu.css';
import { useAuth } from '../context/AuthContext.jsx';

export default function NavMenu() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Flex className="nav-menu" bg="teal.500" color="white" p={4} align="center">
      <Heading size="md" cursor="pointer" onClick={() => navigate('/profile')}>
        Workhouse
      </Heading>
      <Spacer />
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/profile')}>
        Profile
      </Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/tasks-workflow')}>
        Tasks
      </Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/services')}>
        Services
      </Button>
      <Button variant="outline" color="white" onClick={handleLogout}>
        Logout
      </Button>
    </Flex>
  );
}
