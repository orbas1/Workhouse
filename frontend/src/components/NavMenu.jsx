import React from 'react';
import { Box, VStack, Link, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { menu } from '../nav/menu.js';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/NavMenu.css';

export default function NavMenu() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <Box
      as="aside"
      className="nav-menu"
      w="250px"
      p={4}
      bg="gray.50"
      h="100vh"
      overflowY="auto"
      borderRight="1px solid"
      borderColor="gray.200"
    >
      {menu.map((section) => (
        <Box key={section.heading} mb={4}>
          <Text fontWeight="bold" mb={2} className="nav-menu-heading">
            {section.heading}
          </Text>
          <VStack align="stretch" spacing={1}>
            {section.items.map((item) => (
              <Link
                key={item.path}
                as={NavLink}
                to={item.path}
                px={2}
                py={1}
                borderRadius="md"
                _hover={{ textDecoration: 'none', bg: 'gray.100' }}
              >
                {item.label}
              </Link>
            ))}
          </VStack>
        </Box>
      ))}
    </Box>
  );
}
