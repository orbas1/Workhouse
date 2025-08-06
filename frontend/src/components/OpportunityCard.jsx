import React from 'react';
import { Box, Heading, Text, Flex, Badge, Button } from '@chakra-ui/react';
import '../styles/OpportunityCard.css';

export default function OpportunityCard({ opportunity, onEdit, onDelete, onDuplicate, onStatusChange }) {
  return (
    <Box className="opportunity-card" borderWidth="1px" borderRadius="md" p={4} mb={4}>
      <Flex justify="space-between" align="center" mb={2}>
        <Heading size="md">{opportunity.title}</Heading>
        <Badge colorScheme={opportunity.status === 'closed' ? 'red' : opportunity.status === 'in_progress' ? 'yellow' : 'green'}>
          {opportunity.status.replace('_', ' ')}
        </Badge>
      </Flex>
      <Text mb={4}>{opportunity.description}</Text>
      <Flex gap={2} flexWrap="wrap">
        <Button size="sm" onClick={() => onEdit(opportunity)}>Edit</Button>
        <Button size="sm" onClick={() => onStatusChange(opportunity, 'closed')}>Close</Button>
        <Button size="sm" onClick={() => onDuplicate(opportunity.id)}>Duplicate</Button>
        <Button size="sm" colorScheme="red" onClick={() => onDelete(opportunity.id)}>Delete</Button>
      </Flex>
    </Box>
  );
}
