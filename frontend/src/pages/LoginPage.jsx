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
