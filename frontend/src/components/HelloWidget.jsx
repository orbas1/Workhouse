import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext.jsx';

export default function HelloWidget() {
  const { user } = useAuth();
  return (
    <Box p={4} borderWidth="1px" borderRadius="md" bg="white">
      <Heading size="md">Hello, {user?.name || 'there'}!</Heading>
      <Text mt={2}>Welcome back to Workhouse.</Text>
    </Box>
  );
}
