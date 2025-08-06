import React from 'react';
import { Box, VStack, Text } from '@chakra-ui/react';
import '../styles/DisputeTimeline.css';

function DisputeTimeline({ dispute }) {
  const events = [
    { id: 'created', label: 'Dispute created', date: dispute.createdAt },
    ...(dispute.messages || []).map(m => ({ id: m.id, label: `${m.senderId}: ${m.message}`, date: m.createdAt })),
  ];
  if (dispute.resolvedAt) {
    events.push({ id: 'resolved', label: 'Dispute resolved', date: dispute.resolvedAt });
  }
  return (
    <Box className="dispute-timeline" borderWidth="1px" borderRadius="md" p={4}>
      <VStack align="stretch">
        {events.map(e => (
          <Box key={e.id} className="timeline-item">
            <Text className="timeline-date">{new Date(e.date).toLocaleString()}</Text>
            <Text>{e.label}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

export default DisputeTimeline;
