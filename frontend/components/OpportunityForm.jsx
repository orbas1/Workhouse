import { Box, Button, Checkbox, FormControl, FormLabel, Input, Select, Stack, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import '../styles/OpportunityForm.css';

export default function OpportunityForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    remote: false,
    commitmentTime: '',
    urgency: 'normal',
    requirements: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: '', description: '', location: '', remote: false, commitmentTime: '', urgency: 'normal', requirements: '' });
  };

  return (
    <Box as="form" onSubmit={handleSubmit} className="opportunity-form">
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
          <FormLabel>Location</FormLabel>
          <Input name="location" value={form.location} onChange={handleChange} />
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <Checkbox name="remote" isChecked={form.remote} onChange={handleChange} mr={2} />
          <FormLabel m={0}>Remote</FormLabel>
        </FormControl>
        <FormControl>
          <FormLabel>Commitment Time</FormLabel>
          <Input name="commitmentTime" value={form.commitmentTime} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Urgency</FormLabel>
          <Select name="urgency" value={form.urgency} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Requirements</FormLabel>
          <Textarea name="requirements" value={form.requirements} onChange={handleChange} />
        </FormControl>
        <Button colorScheme="teal" type="submit">Create Opportunity</Button>
      </Stack>
    </Box>
  );
}
