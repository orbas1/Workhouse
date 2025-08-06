import React from 'react';
import { Flex, Heading, Spacer, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/NavMenu.css';

function NavMenu() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <Flex className="nav-menu" bg="teal.500" color="white" p={4} align="center">
      <Heading size="md">Workhouse</Heading>
      <Spacer />
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/profile')}>
        Profile
      </Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/contracts/new')}>
        New Contract
      </Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/services/new')}>
        New Service
      </Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/tasks')}>
        Tasks
      </Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/notifications')}>
        Notifications
      </Button>
      <Button variant="outline" color="white" onClick={handleLogout}>
        Logout
      </Button>
    </Flex>
  );
}

export default NavMenu;
