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
  InputGroup,
  InputRightElement,
  Select,
  HStack,
  useToast
} = ChakraUI;
const { useState, useEffect } = React;
const { useNavigate } = ReactRouterDOM;

function SignUpUserInfo() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    countryCode: '+1',
    phone: '',
    password: '',
    location: '',
    bio: '',
    expertise: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

  function toggleShowPassword() {
    setShowPassword(s => !s);
  }

  function detectLocation() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        setForm(f => ({ ...f, location: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}` }));
      },
      () => {}
    );
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
      const data = await authAPI.register({
        fullName: form.fullName,
        email: form.email,
        username: form.email,
        phone: `${form.countryCode}${form.phone}`,
        password: form.password,
        location: form.location,
        bio: form.bio,
        expertise: form.expertise,
        recaptchaToken: token
      });
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
          <Heading mb={2}>Create Account</Heading>
          <Text mb={2} fontSize="sm" color="gray.600" textAlign="right">Step 1 of 3</Text>
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
                <HStack>
                  <Select name="countryCode" w="30%" value={form.countryCode} onChange={handleChange}>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+61">+61</option>
                  </Select>
                  <Input name="phone" value={form.phone} onChange={handleChange} />
                </HStack>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={toggleShowPassword}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="location">
                <FormLabel>Location</FormLabel>
                <HStack>
                  <Input name="location" value={form.location} onChange={handleChange} />
                  <Button onClick={detectLocation}>Use my location</Button>
                </HStack>
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

window.SignUpUserInfo = SignUpUserInfo;
