import { Box, Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import '../styles/InterviewForm.css';

export default function InterviewForm({ onSchedule }) {
  const [form, setForm] = useState({ candidateEmail: '', scheduledFor: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSchedule(form);
    setForm({ candidateEmail: '', scheduledFor: '' });
  };

  return (
    <Box as="form" onSubmit={handleSubmit} className="interview-form">
      <Stack spacing={3}>
        <FormControl isRequired>
          <FormLabel>Candidate Email</FormLabel>
          <Input name="candidateEmail" value={form.candidateEmail} onChange={handleChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Date &amp; Time</FormLabel>
          <Input type="datetime-local" name="scheduledFor" value={form.scheduledFor} onChange={handleChange} />
        </FormControl>
        <Button colorScheme="teal" type="submit">Schedule</Button>
      </Stack>
    </Box>
  );
}

