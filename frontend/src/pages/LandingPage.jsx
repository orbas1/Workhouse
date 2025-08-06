import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  HStack,
  Flex,
  Grid,
  Stack,
  Image
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getLandingContent } from '../api/landing.js';
import '../styles/LandingPage.css';

export default function LandingPage() {
  const [features, setFeatures] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [partners, setPartners] = useState([]);
  const [badges, setBadges] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getLandingContent()
      .then((data) => {
        setFeatures(data.features || []);
        setTestimonials(data.testimonials || []);
        setPartners(data.partners || []);
        setBadges(data.badges || []);
      })
      .catch(() => {});
  }, []);

  return (
    <Box>
      <HStack as="header" className="landing-header" justify="space-between" align="center" p={4} boxShadow="sm" position="sticky" top="0" bg="white" zIndex="1000">
        <Heading size="md">Workhouse</Heading>
        <HStack spacing={4}>
          <Button variant="ghost" onClick={() => navigate('/login')}>Login</Button>
          <Button colorScheme="teal" onClick={() => navigate('/signup')}>Sign Up</Button>
        </HStack>
      </HStack>
      <Box as="main">
        <Flex className="hero" direction="column" align="center" justify="center" textAlign="center" p={8}>
          <Heading mb={4}>Revolutionize Your Recruitment &amp; Gig Management</Heading>
          <Text mb={6}>AI-powered platform connecting talent, employers, and service providers.</Text>
          <Button colorScheme="teal" size="lg" onClick={() => navigate('/signup')}>Get Started</Button>
        </Flex>
        <Box py={16} px={8}>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
            {features.map((f) => (
              <Box key={f.id} borderWidth="1px" borderRadius="lg" p={6} textAlign="center" bg="white" className="feature-card">
                {f.icon && <Image src={f.icon} alt="" boxSize="50px" mx="auto" mb={4} />}
                <Heading size="md" mb={2}>{f.title}</Heading>
                <Text fontSize="sm" color="gray.600">{f.description}</Text>
              </Box>
            ))}
          </Grid>
        </Box>
        <Box bg="gray.50" py={16} px={8}>
          <Heading size="lg" textAlign="center" mb={8}>What People Say</Heading>
          <Stack spacing={6} align="center">
            {testimonials.map((t) => (
              <Box key={t.id} className="testimonial" textAlign="center">
                <Text fontStyle="italic" mb={2}>&ldquo;{t.quote}&rdquo;</Text>
                <Text fontWeight="bold">{t.name}</Text>
              </Box>
            ))}
          </Stack>
        </Box>
        <Box py={8} px={8}>
          <HStack spacing={8} justify="center" flexWrap="wrap">
            {partners.map((p) => (
              <Image key={p.id} src={p.logo} alt={p.name} h="50px" />
            ))}
          </HStack>
        </Box>
        <Box py={16} px={8} textAlign="center">
          <Heading mb={4}>Ready to Join?</Heading>
          <Text mb={6}>Start your journey with Workhouse today.</Text>
          <Button colorScheme="teal" size="lg" onClick={() => navigate('/signup')}>Create Account</Button>
          <HStack spacing={4} mt={8} justify="center">
            {badges.map((b) => (
              <HStack key={b.id} spacing={2}>
                <Image src={b.image} alt={b.name} boxSize="40px" />
                <Text>{b.name}</Text>
              </HStack>
            ))}
          </HStack>
        </Box>
      </Box>
      <Box as="footer" className="landing-footer" py={8} textAlign="center" bg="gray.800" color="white">
        <Stack spacing={2} align="center">
          <HStack spacing={4}>
            <a href="#">Terms &amp; Conditions</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Support Centre</a>
            <a href="#">About Us</a>
            <a href="#">For Investors</a>
          </HStack>
          <Text>&copy; {new Date().getFullYear()} Workhouse</Text>
        </Stack>
      </Box>
    </Box>
  );
}
