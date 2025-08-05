const {
  ChakraProvider,
  Box,
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Text,
  Progress,
  Stack,
  useToast
} = ChakraUI;
const { useState, useEffect } = React;
const { useNavigate } = ReactRouterDOM;

function SignUpPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    location: '',
    bio: '',
    expertise: ''
  });
  const [error, setError] = useState('');
  const [siteKey, setSiteKey] = useState('');
  const [recaptchaId, setRecaptchaId] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => setSiteKey(data.recaptchaSiteKey || ''));
  }, []);

  useEffect(() => {
    if (siteKey && window.grecaptcha) {
      window.grecaptcha.ready(() => {
        const id = window.grecaptcha.render('recaptcha-container', { sitekey: siteKey });
        setRecaptchaId(id);
      });
    }
  }, [siteKey]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const token = window.grecaptcha?.getResponse(recaptchaId);
    if (!token) {
      setError('Please complete the CAPTCHA');
      return;
    }
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          email: form.email,
          recaptchaToken: token
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      toast({ title: 'Registration successful', status: 'success', duration: 3000, isClosable: true });
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  }

  const isValid = form.fullName && form.email && form.password;

  return (
    <ChakraProvider>
      <Flex className="signup-container" minH="100vh" align="center" justify="center" bg="gray.50" p={4}>
        <Box w="lg" p={6} bg="white" boxShadow="md" borderRadius="md">
          <Heading mb={4}>Create Account</Heading>
          <Progress value={33} mb={4} />
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <FormControl id="fullName" isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input name="fullName" value={form.fullName} onChange={handleChange} />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input type="email" name="email" value={form.email} onChange={handleChange} />
              </FormControl>
              <FormControl id="phone">
                <FormLabel>Phone Number</FormLabel>
                <Input name="phone" value={form.phone} onChange={handleChange} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" value={form.password} onChange={handleChange} />
              </FormControl>
              <FormControl id="location">
                <FormLabel>Location</FormLabel>
                <Input name="location" value={form.location} onChange={handleChange} />
              </FormControl>
              <FormControl id="bio">
                <FormLabel>Professional Bio</FormLabel>
                <Textarea name="bio" value={form.bio} onChange={handleChange} />
              </FormControl>
              <FormControl id="expertise">
                <FormLabel>Areas of Expertise (optional)</FormLabel>
                <Input name="expertise" value={form.expertise} onChange={handleChange} />
              </FormControl>
              <Box id="recaptcha-container" mt={4}></Box>
              {error && <Text color="red.500">{error}</Text>}
              <Button colorScheme="blue" type="submit" isDisabled={!isValid}>Next</Button>
            </Stack>
          </form>
          <Text textAlign="center" my={4}>or sign up with</Text>
          <Flex justify="center" gap={2}>
            <Button colorScheme="red" variant="outline" onClick={() => alert('Google sign-up not implemented')}>Google</Button>
            <Button colorScheme="linkedin" variant="outline" onClick={() => alert('LinkedIn sign-up not implemented')}>LinkedIn</Button>
            <Button colorScheme="gray" variant="outline" onClick={() => alert('Apple sign-up not implemented')}>Apple</Button>
          </Flex>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

window.SignUpPage = SignUpPage;
