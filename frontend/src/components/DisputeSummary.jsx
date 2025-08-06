import React from 'react';
import { Box, Text, Badge } from '@chakra-ui/react';
import '../styles/DisputeSummary.css';

function DisputeSummary({ dispute }) {
  return (
    <Box className="dispute-summary" borderWidth="1px" borderRadius="md" p={4}>
      <Text><strong>Category:</strong> {dispute.category}</Text>
      <Text><strong>Status:</strong> {dispute.status}</Text>
      <Text><strong>Created:</strong> {new Date(dispute.createdAt).toLocaleString()}</Text>
      {dispute.resolvedAt && (
        <Text><strong>Resolved:</strong> {new Date(dispute.resolvedAt).toLocaleString()}</Text>
      )}
      <Badge mt={2} colorScheme={dispute.status === 'resolved' ? 'green' : 'orange'}>
        {dispute.status}
      </Badge>
    </Box>
  );
}

export default DisputeSummary;
