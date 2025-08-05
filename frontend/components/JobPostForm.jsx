import { Box, Button, Input, Textarea, Stack, FormControl, FormLabel } from '@chakra-ui/react';
import { useState } from 'react';
import '../styles/JobPostForm.css';

export default function JobPostForm({ onSubmit }) {
  const [form, setForm] = useState({ title: '', description: '', budget: '', deadline: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: '', description: '', budget: '', deadline: '' });
  };

  return (
    <Box as="form" onSubmit={handleSubmit} className="job-form">
      <Stack spacing={3}>
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input name="title" value={form.title} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea name="description" value={form.description} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Budget</FormLabel>
          <Input name="budget" value={form.budget} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Deadline</FormLabel>
          <Input type="date" name="deadline" value={form.deadline} onChange={handleChange} />
        </FormControl>
        <Button colorScheme="teal" type="submit">Create Job</Button>
      </Stack>
    </Box>
  );
}
