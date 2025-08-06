import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { getStartupProfile, updateStartupProfile } from '../api/startups.js';
import '../styles/StartupProfilePlanPage.css';

export default function StartupProfilePlanPage() {
  const [profile, setProfile] = useState({
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
    planVisibility: 'public',
  });
  const toast = useToast();

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getStartupProfile();
        if (data) {
          setProfile({
            ...data,
            fundingLinks: (data.fundingLinks || []).join(','),
          });
        }
      } catch (err) {
        console.error('Failed to load profile', err);
      }
    }
    loadProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...profile,
        fundingLinks: profile.fundingLinks
          .split(',')
          .map((l) => l.trim())
          .filter((l) => l),
      };
      await updateStartupProfile(payload);
      toast({ title: 'Profile saved', status: 'success' });
    } catch (err) {
      console.error('Failed to save profile', err);
      toast({ title: 'Save failed', status: 'error' });
    }
  };

  return (
    <Box className="startup-profile-page" p={4}>
      <Heading mb={6}>Startup Profile & Plan</Heading>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Business Name</FormLabel>
          <Input name="businessName" value={profile.businessName} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Tagline</FormLabel>
          <Input name="tagline" value={profile.tagline} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Category</FormLabel>
          <Input name="category" value={profile.category} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Location</FormLabel>
          <Input name="location" value={profile.location} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Business Goals</FormLabel>
          <Textarea name="goals" value={profile.goals} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Logo URL</FormLabel>
          <Input name="logoUrl" value={profile.logoUrl} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Pitch Deck URL</FormLabel>
          <Input name="pitchDeckUrl" value={profile.pitchDeckUrl} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Intro Video URL</FormLabel>
          <Input name="introVideoUrl" value={profile.introVideoUrl} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>External Funding Links (comma separated)</FormLabel>
          <Input name="fundingLinks" value={profile.fundingLinks} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Mentorship Needs</FormLabel>
          <Textarea name="mentorshipNeeds" value={profile.mentorshipNeeds} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Business Plan URL</FormLabel>
          <Input name="businessPlanUrl" value={profile.businessPlanUrl} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Plan Visibility</FormLabel>
          <Select name="planVisibility" value={profile.planVisibility} onChange={handleChange}>
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="invite">Invite-Only</option>
          </Select>
        </FormControl>
        <Button alignSelf="flex-start" colorScheme="teal" onClick={handleSubmit}>
          Save Profile
        </Button>
      </Stack>
    </Box>
  );
}
