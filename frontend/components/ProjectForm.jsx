import { Box, Button, Input, Textarea, Stack, FormControl, FormLabel } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import '../styles/ProjectForm.css';

export default function ProjectForm({ onSubmit, initialData }) {
  const [form, setForm] = useState({ name: '', description: '' });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: '', description: '' });
  };

  return (
    <Box as="form" onSubmit={handleSubmit} className="project-form">
      <Stack spacing={3}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input name="name" value={form.name} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea name="description" value={form.description} onChange={handleChange} />
        </FormControl>
        <Button colorScheme="teal" type="submit">
          {initialData ? 'Update Project' : 'Create Project'}
        </Button>
      </Stack>
    </Box>
  );
}
