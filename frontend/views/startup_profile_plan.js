const { useState, useEffect } = React;
const { Box, Heading, FormControl, FormLabel, Input, Textarea, Button, Select, VStack, useToast, Flex } = ChakraUI;

function StartupProfilePlanPage() {
  const [form, setForm] = useState({
    businessName: '',
    tagline: '',
    category: '',
    location: '',
    goals: '',
    logoUrl: '',
    pitchDeckUrl: '',
    introVideoUrl: '',
    fundingLinks: '',
    mentorshipNeeds: '',
    businessPlanUrl: '',
    planVisibility: 'public'
  });
  const [categories, setCategories] = useState([]);
  const toast = useToast();

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await startupProfileAPI.getStartupProfile();
        if (data) {
          setForm({
            ...form,
            ...data,
            fundingLinks: (data.fundingLinks || []).join(', '),
          });
        }
      } catch (err) {
        console.error('Failed to load profile', err);
      }
    }
    async function loadCategories() {
      try {
        const res = await fetch(window.env.INDUSTRIES_API);
        const data = await res.json();
        setCategories(data.occupations || []);
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    }
    loadProfile();
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        fundingLinks: form.fundingLinks
          .split(',')
          .map((s) => s.trim())
          .filter((s) => s),
      };
      await startupProfileAPI.saveStartupProfile(payload);
      toast({ title: 'Profile saved', status: 'success', duration: 3000 });
    } catch (err) {
      toast({ title: 'Save failed', status: 'error', duration: 3000 });
    }
  }

  return (
    <Box className="startup-profile-plan-container" p={4}>
      <NavMenu />
      <Heading mb={4}>Startup Profile & Plan</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Business Name</FormLabel>
            <Input name="businessName" value={form.businessName} onChange={handleChange} required />
          </FormControl>
          <FormControl>
            <FormLabel>Tagline</FormLabel>
            <Input name="tagline" value={form.tagline} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Category</FormLabel>
            <Select name="category" value={form.category} onChange={handleChange} placeholder="Select category">
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input name="location" value={form.location} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Business Goals</FormLabel>
            <Textarea name="goals" value={form.goals} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Logo URL</FormLabel>
            <Input name="logoUrl" value={form.logoUrl} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Pitch Deck URL</FormLabel>
            <Input name="pitchDeckUrl" value={form.pitchDeckUrl} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Intro Video URL</FormLabel>
            <Input name="introVideoUrl" value={form.introVideoUrl} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Funding Links (comma separated)</FormLabel>
            <Input name="fundingLinks" value={form.fundingLinks} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Mentorship Needs</FormLabel>
            <Textarea name="mentorshipNeeds" value={form.mentorshipNeeds} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Business Plan URL</FormLabel>
            <Input name="businessPlanUrl" value={form.businessPlanUrl} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Plan Visibility</FormLabel>
            <Select name="planVisibility" value={form.planVisibility} onChange={handleChange}>
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="invite">Invite Only</option>
            </Select>
          </FormControl>
          <Flex justify="flex-end">
            <Button type="submit" colorScheme="teal">Save</Button>
          </Flex>
        </VStack>
      </form>
    </Box>
  );
}

window.StartupProfilePlanPage = StartupProfilePlanPage;
