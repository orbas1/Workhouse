import React, { useEffect, useState } from 'react';
import { Box, Stack, Select, Input, Textarea, Button, FormControl, FormLabel } from '@chakra-ui/react';
import '../styles/ContentForm.css';

const defaultForm = {
  type: 'podcast',
  title: '',
  description: '',
  tags: '',
  categories: '',
  duration: '',
  coverImage: '',
  promoVideo: '',
  audioUrl: '',
  slidesUrl: '',
  publishAt: '',
  visibility: 'public',
  price: '',
};

export default function ContentForm({ initialData, onSubmit }) {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...defaultForm,
        ...initialData,
        tags: (initialData.tags || []).join(','),
        categories: (initialData.categories || []).join(','),
        publishAt: initialData.publishAt ? initialData.publishAt.slice(0,16) : '',
        duration: initialData.duration || '',
        price: initialData.price || '',
      });
    }
  }, [initialData]);

  function handleChange(e) {
    const { name, value, files, type } = e.target;
    if (type === 'file') {
      setForm((prev) => ({ ...prev, [name]: files[0]?.name || '' }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      categories: form.categories.split(',').map((c) => c.trim()).filter(Boolean),
      duration: form.duration ? parseInt(form.duration, 10) : 0,
      price: form.price ? parseFloat(form.price) : 0,
      publishAt: form.publishAt ? new Date(form.publishAt).toISOString() : null,
    };
    onSubmit(payload);
  }

  return (
    <Box as="form" onSubmit={handleSubmit} className="content-form" p={4} borderWidth="1px" borderRadius="md" bg="white">
      <Stack spacing={3}>
        <FormControl>
          <FormLabel>Type</FormLabel>
          <Select name="type" value={form.type} onChange={handleChange}>
            <option value="podcast">Podcast</option>
            <option value="webinar">Webinar</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input name="title" value={form.title} onChange={handleChange} required />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea name="description" value={form.description} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Tags (comma separated)</FormLabel>
          <Input name="tags" value={form.tags} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Categories (comma separated)</FormLabel>
          <Input name="categories" value={form.categories} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Duration (minutes)</FormLabel>
          <Input type="number" name="duration" value={form.duration} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Cover Image</FormLabel>
          <Input type="file" name="coverImage" onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Audio File</FormLabel>
          <Input type="file" name="audioUrl" onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Publish At</FormLabel>
          <Input type="datetime-local" name="publishAt" value={form.publishAt} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Visibility</FormLabel>
          <Select name="visibility" value={form.visibility} onChange={handleChange}>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </Select>
        </FormControl>
        {form.type === 'webinar' && (
          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input type="number" step="0.01" name="price" value={form.price} onChange={handleChange} />
          </FormControl>
        )}
        <Button type="submit" colorScheme="teal">{initialData ? 'Update' : 'Create'}</Button>
      </Stack>
    </Box>
  );
}
