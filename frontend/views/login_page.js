const { ChakraProvider, Box, Flex, Heading, Input, Button, FormControl, FormLabel, Text, useToast } = ChakraUI;
const { useState } = React;
const { useNavigate } = ReactRouterDOM;

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  async function handle(action) {
    setError('');
    try {
      const res = await fetch(`/api/auth/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');
      if (action === 'login') {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        toast({ title: 'Registered! You can now log in.', status: 'success', duration: 3000, isClosable: true });
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <ChakraProvider>
      <Flex className="login-container" minH="100vh" align="center" justify="center" direction="column" bg="gray.50" p={4}>
        <Heading mb={6}>Workhouse</Heading>
        <Box w="sm" p={6} bg="white" boxShadow="md" borderRadius="md">
          <FormControl id="username" mb={4}>
            <FormLabel>Username</FormLabel>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} />
          </FormControl>
          <FormControl id="password" mb={4}>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          {error && (
            <Text color="red.500" mb={2}>{error}</Text>
          )}
          <Flex gap={3} mt={4}>
            <Button colorScheme="blue" flex="1" onClick={() => handle('login')}>Login</Button>
            <Button variant="outline" flex="1" onClick={() => handle('register')}>Register</Button>
          </Flex>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

window.LoginPage = LoginPage;
