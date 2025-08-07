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
  useToast,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Text
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { loginWithProvider, resetPassword } from '../api/auth.js';
import sanitizeInput from '../utils/sanitize.js';
import '../styles/LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [remember, setRemember] = useState(true);
  const [use2FA, setUse2FA] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newPassword, setNewPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(
        sanitizeInput(email),
        sanitizeInput(password),
        use2FA ? sanitizeInput(code) : undefined,
        remember
      );
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleReset() {
    try {
      await resetPassword(sanitizeInput(email), sanitizeInput(newPassword));
      toast({ title: 'Password updated', status: 'success', duration: 3000, isClosable: true });
      setNewPassword('');
      onClose();
    } catch (err) {
      toast({ title: err.message, status: 'error', duration: 3000, isClosable: true });
    }
  }

  return (
    <Flex className="login-page" minH="100vh" align="center" justify="center" bg="gray.50">
      <Box bg="white" p={8} rounded="md" shadow="md" w="sm">
        <Heading mb={6} textAlign="center">Login</Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            {use2FA && (
              <FormControl id="code" isRequired>
                <FormLabel>2FA Code</FormLabel>
                <Input value={code} onChange={(e) => setCode(e.target.value)} />
              </FormControl>
            )}
            <Checkbox colorScheme="teal" isChecked={remember} onChange={(e) => setRemember(e.target.checked)}>
              Remember Me
            </Checkbox>
            <Checkbox colorScheme="teal" isChecked={use2FA} onChange={(e) => setUse2FA(e.target.checked)}>
              Use 2FA
            </Checkbox>
            {error && <Text color="red.500">{error}</Text>}
            <Button type="submit" colorScheme="teal" isLoading={loading} loadingText="Logging in">
              Login
            </Button>
            <Link color="teal.500" href="#">
              Forgot Password?
            </Link>
            <Divider />
            <Stack spacing={2} className="social-login-buttons">
              <Button variant="outline" onClick={() => loginWithProvider('google')}>
                Login with Google
              </Button>
              <Button variant="outline" onClick={() => loginWithProvider('linkedin')}>
                Login with LinkedIn
              </Button>
              <Button variant="outline" onClick={() => loginWithProvider('facebook')}>
                Login with Facebook
              </Button>
            </Stack>
            <Link color="teal.500" onClick={onOpen}>
              Forgot Password?
            </Link>
            <Link color="teal.500" onClick={() => navigate('/signup')}>
              Create an account
            </Link>
          </Stack>
        </form>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reset Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>New Password</FormLabel>
              <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleReset}>Submit</Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
