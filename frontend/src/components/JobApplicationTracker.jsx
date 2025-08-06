import React, { useState } from 'react';
import { Box, Button, Input, Text, Textarea, VStack, Progress } from '@chakra-ui/react';
import { updateApplicationProgress } from '../api/applicationProgress.js';

export default function JobApplicationTracker({ agencyId, jobId, application }) {
  const [stage, setStage] = useState(application.stage || 0);
  const [notes, setNotes] = useState(application.notes || '');
  const [feedback, setFeedback] = useState(application.feedback || '');

  async function save() {
    await updateApplicationProgress(agencyId, jobId, application.id, {
      stage,
      notes,
      feedback,
    });
  }

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} mt={2}>
      <Text mb={2}>Stage {stage + 1} of 7</Text>
      <Progress value={((stage + 1) / 7) * 100} mb={4} />
      <VStack align="stretch" spacing={2}>
        <Input
          type="number"
          min={0}
          max={6}
          value={stage}
          onChange={(e) => setStage(Number(e.target.value))}
        />
        <Textarea
          placeholder="ATS Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <Textarea
          placeholder="Interview Feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <Button colorScheme="teal" onClick={save}>Save Progress</Button>
      </VStack>
    </Box>
  );
}
