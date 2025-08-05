import React, { useEffect, useState } from 'react';
import {
  Box,
  VStack,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
  Button,
  Image,
  useToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import VisibilityToggle from '../components/VisibilityToggle.jsx';
import ProfileHeader from '../components/ProfileHeader.jsx';
import AboutSection from '../components/AboutSection.jsx';
import ProfessionalDetails from '../components/ProfessionalDetails.jsx';
import ActivityFeed from '../components/ActivityFeed.jsx';
import uploadImage from '../utils/imageUpload.js';
import { useProfile } from '../context/ProfileContext.jsx';
import '../styles/ProfileCustomizationPage.css';

function ProfileCustomizationPage() {
  const { profile, saveProfile } = useProfile();
  const [form, setForm] = useState({
    fullName: '',
    title: '',
    bio: '',
    location: '',
    visibility: { portfolio: true, reviews: true, activity: true },
    theme: { color: '#3182ce', bannerUrl: '', font: 'default' },
  });
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (profile) {
      setForm({
        fullName: profile.fullName || '',
        title: profile.title || '',
        bio: profile.bio || '',
        location: profile.location || '',
        visibility: { ...{ portfolio: true, reviews: true, activity: true }, ...(profile.visibility || {}) },
        theme: { ...{ color: '#3182ce', bannerUrl: '', font: 'default' }, ...(profile.theme || {}) },
      });
    }
  }, [profile]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleVisibilityChange = (section) => {
    setForm((prev) => ({
      ...prev,
      visibility: { ...prev.visibility, [section]: !prev.visibility[section] },
    }));
  };

  const handleThemeChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      theme: { ...prev.theme, [field]: value },
    }));
  };

  const handleBannerUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const url = await uploadImage(file);
      handleThemeChange('bannerUrl', url);
    } catch (err) {
      toast({ title: 'Banner upload failed', status: 'error' });
    }
  };

  const handleSave = async () => {
    try {
      await saveProfile(form);
      toast({ title: 'Profile updated', status: 'success' });
      navigate('/profile');
    } catch (err) {
      toast({ title: 'Update failed', status: 'error' });
    }
  };

  const preview = { ...profile, ...form };

  return (
    <SimpleGrid className="customization-page" columns={[1, null, 2]} spacing={6}>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Full Name</FormLabel>
          <Input value={form.fullName} onChange={(e) => handleChange('fullName', e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input value={form.title} onChange={(e) => handleChange('title', e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Location</FormLabel>
          <Input value={form.location} onChange={(e) => handleChange('location', e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Bio</FormLabel>
          <Textarea value={form.bio} onChange={(e) => handleChange('bio', e.target.value)} />
        </FormControl>
        <Box>
          <Text fontWeight="bold" mb={2}>Visibility</Text>
          <VStack spacing={2} align="stretch">
            <VisibilityToggle label="Portfolio" isChecked={form.visibility.portfolio} onChange={() => handleVisibilityChange('portfolio')} />
            <VisibilityToggle label="Reviews" isChecked={form.visibility.reviews} onChange={() => handleVisibilityChange('reviews')} />
            <VisibilityToggle label="Activity" isChecked={form.visibility.activity} onChange={() => handleVisibilityChange('activity')} />
          </VStack>
        </Box>
        <Box>
          <Text fontWeight="bold" mb={2}>Theme</Text>
          <FormControl mb={2}>
            <FormLabel>Accent Color</FormLabel>
            <Input type="color" value={form.theme.color} onChange={(e) => handleThemeChange('color', e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Banner Image</FormLabel>
            <Input type="file" accept="image/*" onChange={handleBannerUpload} />
          </FormControl>
          {form.theme.bannerUrl && <Image src={form.theme.bannerUrl} alt="Banner preview" mt={2} />}
        </Box>
        <Button colorScheme="teal" onClick={handleSave}>Save Changes</Button>
        <Button variant="outline" onClick={() => navigate('/profile')}>Cancel</Button>
      </VStack>
      <Box className="preview-pane">
        <Box className="banner-preview" bg={form.theme.color} backgroundImage={`url(${form.theme.bannerUrl})`} backgroundSize="cover" backgroundPosition="center">
          <ProfileHeader profile={preview} />
        </Box>
        {form.visibility.portfolio && <ProfessionalDetails skills={preview.skills || []} />}
        {form.visibility.reviews && <AboutSection bio={preview.bio} />}
        {form.visibility.activity && <ActivityFeed activities={preview.activities || []} />}
      </Box>
    </SimpleGrid>
  );
}

export default ProfileCustomizationPage;
