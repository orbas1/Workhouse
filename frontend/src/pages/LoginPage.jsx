import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  useToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/LoginPage.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
      navigate('/profile');
    } catch (err) {
      toast({ title: 'Login failed', status: 'error', description: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Flex className="login-page" minH="100vh" align="center" justify="center" bg="gray.50">
      <Box bg="white" p={8} rounded="md" shadow="md" w="sm">
        <Heading mb={6} textAlign="center">Login</Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="username" isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={username} onChange={(e) => setUsername(e.target.value)} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Checkbox colorScheme="teal">Remember Me</Checkbox>
            <Button type="submit" colorScheme="teal" isLoading={loading} loadingText="Logging in">
              Login
            </Button>
            <Link color="teal.500" href="#">Forgot Password?</Link>
            <Link color="teal.500" onClick={() => navigate('/signup')}>Create an account</Link>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
}
