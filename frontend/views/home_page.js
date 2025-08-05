const { Box, Container, Heading, Text, Button } = ChakraUI;
const { useNavigate } = ReactRouterDOM;

function HomePage() {
  const navigate = useNavigate();
  return (
    <Box className="home-page">
      <NavMenu />
      <Container maxW="container.md" mt={6}>
        <Heading mb={4}>Welcome to Workhouse</Heading>
        <Text mb={4}>Manage your work efficiently with our platform.</Text>
        <Button colorScheme="teal" onClick={() => navigate('/dashboard')}>
          Go to Dashboard
        </Button>
      </Container>
    </Box>
  );
}

window.HomePage = HomePage;
