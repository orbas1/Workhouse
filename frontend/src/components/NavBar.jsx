import React from 'react';
import {
  Flex,
  Image,
  Spacer,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react';
import { SearchIcon, HamburgerIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import logo from '../assets/workhouse.svg';

export default function NavBar({ onMenuOpen }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Flex as="header" bg="brand.500" color="white" p={4} align="center" boxShadow="sm">
      <IconButton
        display={{ base: 'inline-flex', md: 'none' }}
        onClick={onMenuOpen}
        mr={2}
        icon={<HamburgerIcon />}
        variant="ghost"
        aria-label="Open navigation"
      />
      <Image src={logo} alt="Workhouse logo" h="32px" cursor="pointer" onClick={() => navigate('/')}/>
      <Spacer />
      <InputGroup maxW="400px" mr={4}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input type="text" placeholder="Search" bg="white" color="black" />
      </InputGroup>
      {user ? (
        <Menu>
          <MenuButton
            as={IconButton}
            mr={2}
            variant="ghost"
            color="white"
            icon={<Avatar size="sm" name={user.name || 'Account'} />}
            aria-label="Account"
          />
          <MenuList color="black">
            <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <>
          <Button mr={2} variant="outline" color="white" onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button color="teal.500" bg="white" onClick={() => navigate('/signup')}>
            Sign Up
          </Button>
        </>
      )}
    </Flex>
  );
}
