import { useState } from 'react';
import { Box, Button, Heading, Input, VStack } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext.js';

export default function AdminLogin() {
  const { setUser } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (res.ok) {
      const data = await res.json();
      setUser({ username, role: data.role, token: data.token });
    }
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Admin Login</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit">Login</Button>
        </VStack>
      </form>
    </Box>
  );
}
