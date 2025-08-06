import React, { useEffect, useState } from 'react';
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
import { useParams, useNavigate } from 'react-router-dom';
import { getService, updateService, deleteService } from '../api/services.js';
import '../styles/ServiceEditPage.css';

export default function ServiceEditPage() {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    tags: '',
    category: '',
  });
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const svc = await getService(id);
        setForm({
          title: svc.name || svc.title || '',
          description: svc.description || '',
          price: svc.price?.toString() || '',
          category: svc.category || '',
          tags: (svc.tags || []).join(', '),
        });
      } catch (err) {
        console.error('Failed to load service', err);
        toast({ title: 'Failed to load service', status: 'error' });
      }
    }
    load();
  }, [id, toast]);

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
      await updateService(id, payload);
      toast({ title: 'Service updated', status: 'success' });
      navigate('/service-orders');
    } catch (err) {
      console.error('Failed to update service', err);
      toast({ title: 'Failed to update service', status: 'error' });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteService(id);
      toast({ title: 'Service deleted', status: 'info' });
      navigate('/service-orders');
    } catch (err) {
      console.error('Failed to delete service', err);
      toast({ title: 'Failed to delete service', status: 'error' });
    }
  };

  return (
    <Box className="service-edit-page" maxW="600px" mx="auto">
      <Heading mb={6}>Edit Service</Heading>
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
            Save Changes
          </Button>
          <Button colorScheme="red" variant="outline" onClick={handleDelete}>
            Delete Service
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
