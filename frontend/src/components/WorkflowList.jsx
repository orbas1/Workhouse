import React from 'react';
import { Box, Heading, List, ListItem, Text } from '@chakra-ui/react';
import '../styles/WorkflowList.css';

function WorkflowList({ workflows }) {
  if (!workflows.length) return null;

  return (
    <Box className="workflow-list" mt={6}>
      {workflows.map((wf) => (
        <Box key={wf.id} mb={4} p={3} borderWidth="1px" borderRadius="md">
          <Heading size="sm" mb={2}>
            Workflow {wf.id.slice(0, 8)}
          </Heading>
          <List spacing={1}>
            {wf.steps.map((step, idx) => (
              <ListItem key={idx}>
                <Text>{idx + 1}. {step}</Text>
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
}

export default WorkflowList;
