import React from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  Icon
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <Box className="landing-page" textAlign="center" py={20} px={6}>
      <VStack spacing={8}>
        <Heading size="2xl">Revolutionize Your Work Journey</Heading>
        <Text fontSize="lg">
          Connect, collaborate, and grow with the all-in-one work platform.
        </Text>
        <HStack spacing={4}>
          <Button colorScheme="teal" onClick={() => navigate('/signup')}>Get Started</Button>
          <Button variant="outline" onClick={() => navigate('/login')}>Login</Button>
        </HStack>
        <HStack spacing={8} mt={10} flexWrap="wrap" justify="center">
          <VStack>
            <Icon as={CheckCircleIcon} w={8} h={8} color="teal.500" />
            <Text>AI-Powered Matching</Text>
          </VStack>
          <VStack>
            <Icon as={CheckCircleIcon} w={8} h={8} color="teal.500" />
            <Text>Integrated Gig Management</Text>
          </VStack>
          <VStack>
            <Icon as={CheckCircleIcon} w={8} h={8} color="teal.500" />
            <Text>Real-Time Analytics</Text>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
}
