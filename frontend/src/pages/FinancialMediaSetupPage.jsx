import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
  Progress,
  Text,
  HStack,
  useToast
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext.jsx';
import { saveFinancialMedia, getFinancialMedia } from '../api/userSetup.js';
import { useNavigate } from 'react-router-dom';
import '../styles/FinancialMediaSetupPage.css';

export default function FinancialMediaSetupPage() {
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    paymentMethod: '',
    taxId: '',
    vatNumber: '',
    bio: '',
    portfolioLinks: '',
    title: ''
  });
  const [profilePic, setProfilePic] = useState(null);
  const [introVideo, setIntroVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  useEffect(() => {
    if (!user?.id) return;
    getFinancialMedia(user.id)
      .then((data) => {
        if (data?.financial) {
          setForm((prev) => ({
            ...prev,
            paymentMethod: '',
            taxId: data.financial.taxId || '',
            vatNumber: data.financial.vatNumber || ''
          }));
        }
        if (data?.profile) {
          setForm((prev) => ({
            ...prev,
            bio: data.profile.bio || '',
            portfolioLinks: (data.profile.portfolioLinks || []).join(', '),
            title: data.profile.title || ''
          }));
        }
      })
      .catch(() => {});
  }, [user]);

  const handleSubmit = async () => {
    const payload = {
      paymentMethod: form.paymentMethod,
      taxId: form.taxId || undefined,
      vatNumber: form.vatNumber || undefined,
      bio: form.bio,
      portfolioLinks: form.portfolioLinks
        ? form.portfolioLinks.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      title: form.title || undefined,
    };
    if (profilePic) payload.profilePicture = await fileToBase64(profilePic);
    if (introVideo) payload.introVideo = await fileToBase64(introVideo);
    try {
      setLoading(true);
      await saveFinancialMedia(user.id, payload);
      toast({ title: 'Setup saved', status: 'success', duration: 3000, isClosable: true });
      navigate('/onboarding/documents');
    } catch (err) {
      toast({ title: 'Save failed', status: 'error', description: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="financial-media-page" maxW="xl" mx="auto" p={6}>
      <Text mb={2} textAlign="center">Step 2 of 3</Text>
      <Progress value={66} mb={6} />
      <Heading mb={6} textAlign="center">Financial & Media Setup</Heading>
      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel>Payment Method</FormLabel>
          <Input
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            placeholder="Card number"
          />
        </FormControl>
        <HStack spacing={4} align="start">
          <FormControl>
            <FormLabel>Tax ID</FormLabel>
            <Input name="taxId" value={form.taxId} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>VAT Number</FormLabel>
            <Input name="vatNumber" value={form.vatNumber} onChange={handleChange} />
          </FormControl>
        </HStack>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input name="title" value={form.title} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Bio</FormLabel>
          <Textarea name="bio" value={form.bio} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Portfolio Links (comma separated)</FormLabel>
          <Input
            name="portfolioLinks"
            value={form.portfolioLinks}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Profile Picture</FormLabel>
          <Input type="file" accept="image/*" onChange={(e) => setProfilePic(e.target.files[0])} />
        </FormControl>
        <FormControl>
          <FormLabel>Intro Video</FormLabel>
          <Input type="file" accept="video/*" onChange={(e) => setIntroVideo(e.target.files[0])} />
        </FormControl>
        <HStack justify="space-between" pt={4}>
          <Button variant="ghost" onClick={() => navigate('/onboarding/documents')}>Skip for now</Button>
          <Button colorScheme="teal" onClick={handleSubmit} isLoading={loading}>Save & Continue</Button>
        </HStack>
      </VStack>
    </Box>
  );
}
