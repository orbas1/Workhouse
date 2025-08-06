import React from 'react';
import {
  Flex,
  Heading,
  Spacer,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Avatar
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Flex as="header" bg="teal.500" color="white" p={4} align="center">
      <Heading size="md" cursor="pointer" onClick={() => navigate('/')}> 
        Workhouse
      </Heading>
      <Spacer />
      <InputGroup maxW="400px" mr={4}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input type="text" placeholder="Search" bg="white" color="black" />
      </InputGroup>
      {user ? (
        <>
          <IconButton
            mr={2}
            variant="ghost"
            color="white"
            icon={<Avatar size="sm" name={user.name || 'Account'} />}
            onClick={() => navigate('/profile')}
            aria-label="Account"
          />
          <Button variant="outline" color="white" onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <Button variant="outline" color="white" onClick={() => navigate('/login')}>
          Login
        </Button>
      )}
    </Flex>
  );
}
