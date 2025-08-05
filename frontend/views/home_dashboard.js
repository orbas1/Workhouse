const { useEffect, useState } = React;
const { Box, Heading, Text, Button } = ChakraUI;

function HomeDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    }
    fetchUser();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <Box className="dashboard">
      <Heading size="lg" mb={2}>Dashboard</Heading>
      <Text mb={4}>Hello, {user.username}!</Text>
      <Button colorScheme="blue" onClick={() => window.location.href = '/feed'}>
        Go to Live Feed
      </Button>
    </Box>
  );
}

window.HomeDashboard = HomeDashboard;
