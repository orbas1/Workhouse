const { ChakraProvider, Box, Flex, Heading, FormControl, FormLabel, Input, Textarea, Switch, Button, Image, Text, Stack, useToast } = ChakraUI;
const { useState, useEffect } = React;
const { useNavigate } = ReactRouterDOM;

function ProfileCustomization(){
  const [form, setForm] = useState({
    name: '',
    title: '',
    bio: '',
    contactEmail: '',
    themeColor: '#3182ce',
    bannerUrl: '',
    visibility: { portfolio: true, reviews: true, activity: true }
  });
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const user = authUtils.getUserFromToken();
    const token = localStorage.getItem('token');
    if(!user || !token){
      navigate('/login');
      return;
    }
    profileAPI.getProfile(user.id, token)
      .then(data => {
        setForm({
          name: data.name || '',
          title: data.title || '',
          bio: data.bio || '',
          contactEmail: data.contact?.email || '',
          themeColor: data.theme?.color || '#3182ce',
          bannerUrl: data.theme?.bannerUrl || '',
          visibility: {
            portfolio: data.visibility?.portfolio !== false,
            reviews: data.visibility?.reviews !== false,
            activity: data.visibility?.activity !== false
          }
        });
      })
      .catch(() => {});
  }, [navigate]);

  function handleChange(field, value){
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function handleVisibility(field, value){
    setForm(prev => ({ ...prev, visibility: { ...prev.visibility, [field]: value } }));
  }

  function handleBanner(e){
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      setForm(prev => ({ ...prev, bannerUrl: ev.target.result }));
    };
    reader.readAsDataURL(file);
  }

  async function save(){
    const user = authUtils.getUserFromToken();
    const token = localStorage.getItem('token');
    if(!user || !token) return;
    const payload = {
      name: form.name,
      title: form.title,
      bio: form.bio,
      contact: { email: form.contactEmail },
      visibility: form.visibility,
      theme: { color: form.themeColor, bannerUrl: form.bannerUrl }
    };
    try {
      await profileAPI.updateProfile(user.id, payload, token);
      toast({ title: 'Profile updated', status: 'success', duration: 3000, isClosable: true });
    } catch(err){
      toast({ title: 'Update failed', status: 'error', duration: 3000, isClosable: true });
    }
  }

  return (
    <ChakraProvider>
      <Flex className="profile-customization" p={8} direction={{ base: 'column', md: 'row' }} gap={8}>
        <Box flex="1">
          <Heading size="md" mb={4}>Profile Settings</Heading>
          <FormControl mb={3}>
            <FormLabel>Name</FormLabel>
            <Input value={form.name} onChange={e => handleChange('name', e.target.value)} />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Title</FormLabel>
            <Input value={form.title} onChange={e => handleChange('title', e.target.value)} />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Bio</FormLabel>
            <Textarea value={form.bio} onChange={e => handleChange('bio', e.target.value)} />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Contact Email</FormLabel>
            <Input value={form.contactEmail} onChange={e => handleChange('contactEmail', e.target.value)} />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Theme Color</FormLabel>
            <Input type="color" value={form.themeColor} onChange={e => handleChange('themeColor', e.target.value)} />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Banner Image</FormLabel>
            <Input type="file" accept="image/*" onChange={handleBanner} />
          </FormControl>
          <FormControl display="flex" alignItems="center" mb={3}>
            <FormLabel mb="0">Show Portfolio</FormLabel>
            <Switch isChecked={form.visibility.portfolio} onChange={e => handleVisibility('portfolio', e.target.checked)} />
          </FormControl>
          <FormControl display="flex" alignItems="center" mb={3}>
            <FormLabel mb="0">Show Reviews</FormLabel>
            <Switch isChecked={form.visibility.reviews} onChange={e => handleVisibility('reviews', e.target.checked)} />
          </FormControl>
          <FormControl display="flex" alignItems="center" mb={3}>
            <FormLabel mb="0">Show Activity</FormLabel>
            <Switch isChecked={form.visibility.activity} onChange={e => handleVisibility('activity', e.target.checked)} />
          </FormControl>
          <Button colorScheme="blue" mt={4} onClick={save}>Save Changes</Button>
        </Box>
        <Box flex="1" className="preview">
          <Heading size="md" mb={4}>Live Preview</Heading>
          {form.bannerUrl && <Image src={form.bannerUrl} alt="Banner" borderRadius="md" mb={4} />}
          <Heading size="lg" color={form.themeColor}>{form.name || 'Your Name'}</Heading>
          <Text fontWeight="medium" mb={2}>{form.title || 'Your Title'}</Text>
          <Text mb={4}>{form.bio}</Text>
          <Stack spacing={2}>
            {form.visibility.portfolio && <Box className="preview-section">Portfolio Visible</Box>}
            {form.visibility.reviews && <Box className="preview-section">Reviews Visible</Box>}
            {form.visibility.activity && <Box className="preview-section">Activity Visible</Box>}
          </Stack>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

window.ProfileCustomization = ProfileCustomization;
