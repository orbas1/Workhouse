import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
  useToast
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext.jsx';
import { saveFinancialMedia } from '../api/userSetup.js';
import '../styles/FinancialMediaSetupPage.css';

export default function FinancialMediaSetupPage() {
  const { user } = useAuth();
  const toast = useToast();
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

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

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
      await saveFinancialMedia(user.id, payload);
      toast({ title: 'Setup saved', status: 'success', duration: 3000, isClosable: true });
    } catch (err) {
      toast({ title: 'Save failed', status: 'error', description: err.message });
    }
  };

  return (
    <Box className="financial-media-page" maxW="xl" mx="auto" p={6}>
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
        <FormControl>
          <FormLabel>Tax ID</FormLabel>
          <Input name="taxId" value={form.taxId} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>VAT Number</FormLabel>
          <Input name="vatNumber" value={form.vatNumber} onChange={handleChange} />
        </FormControl>
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
        <Button colorScheme="teal" onClick={handleSubmit}>Save</Button>
      </VStack>
    </Box>
  );
}
