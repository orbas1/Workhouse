import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Textarea, Button } from '@chakra-ui/react';
import { setupWorkflow } from '../api/workflows.js';
import '../styles/WorkflowForm.css';

function WorkflowForm({ projectId, onCreated }) {
  const [steps, setSteps] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!projectId) return;
    setLoading(true);
    try {
      const parsed = steps
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
      await setupWorkflow({ projectId, steps: parsed });
      setSteps('');
      if (onCreated) onCreated();
    } catch (err) {
      console.error('Failed to create workflow', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box as="form" className="workflow-form" onSubmit={handleSubmit}>
      <FormControl mb={3} isRequired>
        <FormLabel>Workflow Steps (one per line)</FormLabel>
        <Textarea
          placeholder="Design\nDevelop\nTest"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />
      </FormControl>
      <Button type="submit" colorScheme="teal" isLoading={loading}>
        Create Workflow
      </Button>
    </Box>
  );
}

export default WorkflowForm;
