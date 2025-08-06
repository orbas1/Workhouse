import React from 'react';
import { Flex, Heading, Spacer, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import '../styles/NavMenu.css';
import { useAuth } from '../context/AuthContext.jsx';

function NavMenu() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Flex className="nav-menu" bg="teal.500" color="white" p={4} align="center">
      <Heading size="md">Workhouse</Heading>
      <Spacer />
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/profile')}>
        Profile
      </Button>
      {user ? (
        <>
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
          <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/services')}>
            Services
          </Button>
          {user.role === 'admin' && (
            <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/admin/users')}>
              User Mgmt
            </Button>
          )}
          <Button variant="outline" color="white" onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button variant="ghost" color="white" onClick={() => navigate('/signup')}>
            Sign Up
          </Button>
        </>
      )}
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/profile')}>
        Profile
      </Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/support')}>
        Support
      </Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/contracts/new')}>
        New Contract
      </Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/services')}>
        Services
      </Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/disputes')}>
        Disputes
      </Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/tasks')}>
        Tasks
      </Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/services')}>
        Services
      </Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/disputes/new')}>
        Dispute
      </Button>
      <Button variant="outline" color="white" onClick={handleLogout}>
        Logout
      </Button>
    </Flex>
  );
}

export default NavMenu;
