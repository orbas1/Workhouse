const { Box, Container, Heading, Text, Button } = ChakraUI;
const { useNavigate } = ReactRouterDOM;
const { useAuth } = window;

function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <Box className="home-page">
      <NavMenu />
      <Container maxW="container.md" mt={6}>
        <Heading mb={4}>Welcome {user ? user.username : 'to Workhouse'}</Heading>
        <Text mb={4}>Manage your work efficiently with our platform.</Text>
        <Button colorScheme="teal" onClick={() => navigate('/dashboard')}>
          Go to Dashboard
        </Button>
      </Container>
    </Box>
  );
}

window.HomePage = HomePage;
