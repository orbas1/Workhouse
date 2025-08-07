import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Text,
  Textarea,
  Progress,
  useToast
} from '@chakra-ui/react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/auth.js';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/SignupPage.css';

export default function SignupPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    expertise: '',
    username: '',
    password: '',
    role: 'buyer'
  });
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const detectLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setForm((prev) => ({ ...prev, location: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}` }));
    });
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      await register({ ...form, recaptchaToken });
      await login(form.username, form.password);
      toast({ title: 'Account created', status: 'success', duration: 3000, isClosable: true });
      navigate('/setup/financial-media');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex className="signup-page">
      <Box w="lg" p={8} bg="white" boxShadow="md" borderRadius="md">
        <Text mb={2} textAlign="center">Step 1 of 3</Text>
        <Progress value={33} mb={6} />
        <Heading mb={6} textAlign="center">Create Your Account</Heading>
        <FormControl id="fullName" mb={4} isRequired>
          <FormLabel>Full Name</FormLabel>
          <Input name="fullName" value={form.fullName} onChange={handleChange} />
        </FormControl>
        <FormControl id="email" mb={4} isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input type="email" name="email" value={form.email} onChange={handleChange} />
        </FormControl>
        <FormControl id="phone" mb={4} isRequired>
          <FormLabel>Phone Number</FormLabel>
          <Input type="tel" name="phone" value={form.phone} onChange={handleChange} />
        </FormControl>
        <FormControl id="username" mb={4} isRequired>
          <FormLabel>Username</FormLabel>
          <Input name="username" value={form.username} onChange={handleChange} />
        </FormControl>
        <FormControl id="password" mb={4} isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" name="password" value={form.password} onChange={handleChange} />
        </FormControl>
        <FormControl id="role" mb={4} isRequired>
          <FormLabel>Account Type</FormLabel>
          <Select name="role" value={form.role} onChange={handleChange}>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </Select>
        </FormControl>
        <FormControl id="location" mb={4} isRequired>
          <FormLabel>Location</FormLabel>
          <HStack>
            <Input name="location" value={form.location} onChange={handleChange} />
            <Button onClick={detectLocation}>Use my location</Button>
          </HStack>
        </FormControl>
        <FormControl id="bio" mb={4} isRequired>
          <FormLabel>Professional Bio</FormLabel>
          <Textarea name="bio" value={form.bio} onChange={handleChange} />
        </FormControl>
        <FormControl id="expertise" mb={4}>
          <FormLabel>Expertise (Optional)</FormLabel>
          <Input name="expertise" value={form.expertise} onChange={handleChange} />
        </FormControl>
        <ReCAPTCHA
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
          onChange={setRecaptchaToken}
          className="recaptcha"
        />
        {error && <Text color="red.500" mb={4}>{error}</Text>}
        <Button colorScheme="blue" w="100%" onClick={handleSubmit} isLoading={loading} mt={4}>
          Sign Up
        </Button>
        <Button variant="link" w="100%" mt={4} onClick={() => navigate('/login')}>
          Already have an account? Login
        </Button>
      </Box>
    </Flex>
  );
}
