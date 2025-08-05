const {
  ChakraProvider,
  Box,
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Text,
  Checkbox,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  useToast
} = ChakraUI;
const { ChakraProvider, Box, Flex, Heading, Input, Button, FormControl, FormLabel, Text } = ChakraUI;
const { useState } = React;
const { useNavigate } = ReactRouterDOM;

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [remember, setRemember] = useState(true);
  const [use2FA, setUse2FA] = useState(false);
  const [code, setCode] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [resetPassword, setResetPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  async function handleLogin() {
    setError('');
    try {
      const data = await apiRequest(`/auth/${action}`, {
        method: 'POST',
        body: JSON.stringify({ username, password, code })
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      });
      if (action === 'login') {
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem('token', data.token);
        navigate('/dashboard');
      }
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleReset() {
    try {
      await apiRequest('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ username, password: resetPassword })
      });
      toast({ title: 'Password updated', status: 'success', duration: 3000, isClosable: true });
      onClose();
    } catch (err) {
      toast({ title: err.message, status: 'error', duration: 3000, isClosable: true });
    }
  }

  return (
    <ChakraProvider>
      <Flex className="login-container" minH="100vh" align="center" justify="center" direction="column" bg="gray.50" p={4}>
        <Heading mb={6}>Workhouse</Heading>
        <Box w="sm" p={6} bg="white" boxShadow="md" borderRadius="md">
          <FormControl id="username" mb={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={username} onChange={(e) => setUsername(e.target.value)} />
          </FormControl>
          <FormControl id="password" mb={4}>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          {use2FA && (
            <FormControl id="code" mb={4}>
              <FormLabel>2FA Code</FormLabel>
              <Input value={code} onChange={(e) => setCode(e.target.value)} />
            </FormControl>
          )}
          <Flex justify="space-between" align="center" mb={4}>
            <Checkbox isChecked={remember} onChange={(e) => setRemember(e.target.checked)}>Remember Me</Checkbox>
            <Link color="blue.500" onClick={onOpen}>Forgot Password?</Link>
          </Flex>
          <Checkbox mb={4} isChecked={use2FA} onChange={(e) => setUse2FA(e.target.checked)}>Use 2FA</Checkbox>
          {error && (
            <Text color="red.500" mb={2}>{error}</Text>
          )}
          <Flex gap={3} mt={4}>
            <Button colorScheme="blue" flex="1" onClick={() => handle('login')}>Login</Button>
            <Button variant="outline" flex="1" onClick={() => navigate('/signup')}>Register</Button>
          </Flex>
          <Button colorScheme="blue" w="100%" mt={4} onClick={handleLogin}>Login</Button>
          <Text mt={4} textAlign="center">New here? <a href="#" onClick={(e)=>{e.preventDefault();navigate('/signup');}}>Create an account</a></Text>
        </Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reset Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>New Password</FormLabel>
              <Input type="password" value={resetPassword} onChange={(e) => setResetPassword(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleReset}>Submit</Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}

window.LoginPage = LoginPage;
