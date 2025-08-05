const { ChakraProvider, Box, Flex, Heading, Text, Button, Grid, Stack, Image } = ChakraUI;
const { useEffect, useState } = React;
const { useNavigate } = ReactRouterDOM;

function LandingPage() {
  const [features, setFeatures] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/landing/content')
      .then((res) => res.json())
      .then((data) => {
        setFeatures(data.features || []);
        setTestimonials(data.testimonials || []);
      })
      .catch(() => {});
  }, []);

  return (
    <ChakraProvider>
      <Flex as="header" className="landing-header" justify="space-between" align="center" p={4} boxShadow="sm" position="sticky" top="0" bg="white" zIndex="1000">
        <Heading size="md">Workhouse</Heading>
        <Stack direction="row" spacing={4}>
          <Button variant="ghost" onClick={() => navigate('/login')}>Login</Button>
          <Button colorScheme="blue" onClick={() => navigate('/login')}>Sign Up</Button>
        </Stack>
      </Flex>
      <Box as="main">
        <Flex className="hero" direction="column" align="center" justify="center" textAlign="center" p={8}>
          <Heading mb={4}>Revolutionize Your Recruitment &amp; Gig Management</Heading>
          <Text mb={6}>AI-powered platform connecting talent, employers, and service providers.</Text>
          <Button colorScheme="blue" size="lg" onClick={() => navigate('/login')}>Get Started</Button>
        </Flex>
        <Box className="features" py={16} px={8}>
          <Grid templateColumns="repeat(auto-fit, minmax(200px,1fr))" gap={6}>
            {features.map((f) => (
              <FeatureCard key={f.id} title={f.title} description={f.description} icon={f.icon} />
            ))}
          </Grid>
        </Box>
        <Box className="testimonials" bg="gray.50" py={16} px={8}>
          <Heading size="lg" textAlign="center" mb={8}>What People Say</Heading>
          <Stack spacing={6}>
            {testimonials.map((t) => (
              <Box key={t.id} className="testimonial" maxW="xl" mx="auto" textAlign="center">
                <Text fontStyle="italic">"{t.quote}"</Text>
                <Text mt={2} fontWeight="bold">- {t.name}</Text>
              </Box>
            ))}
          </Stack>
        </Box>
        <Box className="secondary-cta" py={16} px={8} textAlign="center">
          <Heading mb={4}>Ready to Join?</Heading>
          <Text mb={6}>Start your journey with Workhouse today.</Text>
          <Button colorScheme="blue" size="lg" onClick={() => navigate('/login')}>Create Account</Button>
        </Box>
      </Box>
      <Box as="footer" className="landing-footer" py={8} textAlign="center" bg="gray.800" color="white">
        <Stack spacing={2} align="center">
          <Stack direction="row" spacing={4}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Help Center</a>
          </Stack>
          <Text>&copy; {new Date().getFullYear()} Workhouse</Text>
        </Stack>
      </Box>
    </ChakraProvider>
  );
}

window.LandingPage = LandingPage;
