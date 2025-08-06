import { Box, Button, Input, Stack, FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import '../styles/TimesheetForm.css';

export default function TimesheetForm({ onSubmit }) {
  const [form, setForm] = useState({ jobId: '', hours: '', date: '', notes: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, hours: Number(form.hours) });
    setForm({ jobId: '', hours: '', date: '', notes: '' });
  };

  return (
    <Box as="form" onSubmit={handleSubmit} className="timesheet-form">
      <Stack spacing={3}>
        <FormControl isRequired>
          <FormLabel>Job ID</FormLabel>
          <Input name="jobId" value={form.jobId} onChange={handleChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Hours</FormLabel>
          <Input type="number" name="hours" value={form.hours} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Date</FormLabel>
          <Input type="date" name="date" value={form.date} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Notes</FormLabel>
          <Textarea name="notes" value={form.notes} onChange={handleChange} />
        </FormControl>
        <Button colorScheme="teal" type="submit">Log Hours</Button>
      </Stack>
    </Box>
  );
}
