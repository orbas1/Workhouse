import React, { useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
} from '@chakra-ui/react';
import { createService } from '../api/services.js';
import '../styles/ServiceCreationPage.css';
import { useNavigate } from 'react-router-dom';

export default function ServiceCreationPage() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    tags: '',
    category: '',
  });
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        category: form.category || undefined,
        tags: form.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      };
      await createService(payload);
      toast({ title: 'Service created', status: 'success' });
      navigate('/profile');
    } catch (err) {
      console.error(err);
      toast({ title: 'Failed to create service', status: 'error' });
    }
  };

  return (
    <Box className="service-creation-page" maxW="600px" mx="auto">
      <Heading mb={6}>Create Service</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input name="title" value={form.title} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea name="description" value={form.description} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Price</FormLabel>
            <Input
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Category</FormLabel>
            <Input name="category" value={form.category} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Tags (comma separated)</FormLabel>
            <Input name="tags" value={form.tags} onChange={handleChange} />
          </FormControl>
          <Button colorScheme="teal" type="submit">
            Save Service
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
