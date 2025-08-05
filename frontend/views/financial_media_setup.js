const {
  ChakraProvider,
  Box,
  Grid,
  GridItem,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
} = ChakraUI;
const { useState, useEffect } = React;
const { useNavigate } = ReactRouterDOM;

function FinancialMediaSetupPage() {
  const [form, setForm] = useState({
    paymentMethod: '',
    taxId: '',
    vatNumber: '',
    profilePicture: null,
    bio: '',
    introVideo: null,
    portfolioLink: '',
    title: '',
  });

  const userId = localStorage.getItem('userId');
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const data = await userSetupAPI.getFinancialMedia(userId);
        if (data.financial) {
          setForm((prev) => ({
            ...prev,
            paymentMethod: '',
            taxId: data.financial.taxId || '',
            vatNumber: data.financial.vatNumber || '',
          }));
        }
        if (data.profile) {
          setForm((prev) => ({
            ...prev,
            bio: data.profile.bio || '',
            portfolioLink: (data.profile.portfolioLinks && data.profile.portfolioLinks[0]) || '',
            title: data.profile.title || '',
          }));
        }
      } catch (err) {
        // ignore if not found
      }
    }
    if (userId) load();
  }, [userId]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e) {
    const { name, files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setForm((prev) => ({ ...prev, [name]: ev.target.result }));
      };
      reader.readAsDataURL(files[0]);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const payload = {
        paymentMethod: form.paymentMethod,
        taxId: form.taxId || undefined,
        vatNumber: form.vatNumber || undefined,
        profilePicture: form.profilePicture || undefined,
        bio: form.bio,
        introVideo: form.introVideo || undefined,
        portfolioLinks: form.portfolioLink ? [form.portfolioLink] : [],
        title: form.title || undefined,
      };
      await userSetupAPI.saveFinancialMedia(userId, payload);
      toast({ title: 'Setup saved', status: 'success', duration: 3000, isClosable: true });
      navigate('/onboarding/documents');
    } catch (err) {
      toast({ title: err.message || 'Error saving setup', status: 'error', duration: 3000, isClosable: true });
    }
  }

  return (
    <ChakraProvider>
      <Box className="financial-media-setup-container">
        <ProgressIndicator step={2} total={3} />
        <Heading size="lg" mb={4}>Financial & Media Setup</Heading>
        <form onSubmit={handleSubmit}>
          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
            <GridItem>
              <VStack spacing={4} align="stretch">
                <Heading size="md">Financial Setup</Heading>
                <FormControl isRequired>
                  <FormLabel>Payment Method</FormLabel>
                  <Input name="paymentMethod" value={form.paymentMethod} onChange={handleChange} placeholder="Card Number" />
                </FormControl>
                <FormControl>
                  <FormLabel>Tax ID</FormLabel>
                  <Input name="taxId" value={form.taxId} onChange={handleChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>VAT Number</FormLabel>
                  <Input name="vatNumber" value={form.vatNumber} onChange={handleChange} />
                </FormControl>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack spacing={4} align="stretch">
                <Heading size="md">Media Setup</Heading>
                <FormControl>
                  <FormLabel>Profile Picture</FormLabel>
                  <Input type="file" accept="image/*" name="profilePicture" onChange={handleFileChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Bio</FormLabel>
                  <Textarea name="bio" value={form.bio} onChange={handleChange} maxLength={250} />
                </FormControl>
                <FormControl>
                  <FormLabel>Introductory Video</FormLabel>
                  <Input type="file" accept="video/*" name="introVideo" onChange={handleFileChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Portfolio Link</FormLabel>
                  <Input name="portfolioLink" value={form.portfolioLink} onChange={handleChange} placeholder="https://" />
                </FormControl>
                <FormControl>
                  <FormLabel>Profile Title</FormLabel>
                  <Input name="title" value={form.title} onChange={handleChange} placeholder="e.g., Data Scientist" />
                </FormControl>
              </VStack>
            </GridItem>
          </Grid>
          <Button mt={6} colorScheme="teal" type="submit">Next</Button>
        </form>
      </Box>
    </ChakraProvider>
  );
}

window.FinancialMediaSetupPage = FinancialMediaSetupPage;
