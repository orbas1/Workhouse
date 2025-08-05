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
  Text,
  useToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth.js';
import { useAuth } from '../context/AuthContext.jsx';
import NavBar from '../components/NavBar.jsx';
import '../styles/LoginPage.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [use2FA, setUse2FA] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async () => {
    setError('');
    try {
      const user = await login({ username, password, code: use2FA ? code : undefined });
      setUser(user);
      toast({ title: 'Login successful', status: 'success', duration: 3000, isClosable: true });
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box>
      <NavBar />
      <Flex className="login-page">
        <Box w="sm" p={8} bg="white" boxShadow="md" borderRadius="md">
          <Heading mb={6} textAlign="center">Login</Heading>
          <FormControl id="username" mb={4} isRequired>
            <FormLabel>Username</FormLabel>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} />
          </FormControl>
          <FormControl id="password" mb={4} isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Checkbox mb={4} isChecked={use2FA} onChange={(e) => setUse2FA(e.target.checked)}>
            Use 2FA code
          </Checkbox>
          {use2FA && (
            <FormControl id="code" mb={4} isRequired>
              <FormLabel>Authentication Code</FormLabel>
              <Input value={code} onChange={(e) => setCode(e.target.value)} />
            </FormControl>
          )}
          {error && <Text color="red.500" mb={4}>{error}</Text>}
          <Button colorScheme="blue" w="100%" onClick={handleSubmit}>Login</Button>
          <Button variant="link" w="100%" mt={4} onClick={() => navigate('/signup')}>
            Create an account
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
  Link,
  Stack,
  useToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import { useAuth } from '../context/AuthContext.jsx';

function LoginPage() {
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
          </Stack>
        </form>
      </Box>
    </Flex>
  );
}

export default LoginPage;
