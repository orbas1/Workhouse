import React, { useState } from 'react';
import { Box, Input, Textarea, Button } from '@chakra-ui/react';
import '../styles/WorkSubmissionForm.css';

export default function WorkSubmissionForm({ onSubmit }) {
  const [workUrl, setWorkUrl] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ workUrl, notes });
    setWorkUrl('');
    setNotes('');
  };

  return (
    <Box as="form" className="work-submission-form" onSubmit={handleSubmit} mt={4}>
      <Input
        placeholder="Work URL"
        value={workUrl}
        onChange={(e) => setWorkUrl(e.target.value)}
        mb={2}
      />
      <Textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        mb={2}
      />
      <Button type="submit" colorScheme="teal" size="sm">
        Submit Work
      </Button>
    </Box>
  );
}
