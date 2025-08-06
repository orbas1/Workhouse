import React from 'react';
import { Box, Heading, Text, Badge, Button } from '@chakra-ui/react';
import '../styles/OpportunitySearchCard.css';

export default function OpportunitySearchCard({ opportunity, onSelect }) {
  return (
    <Box className="opportunity-search-card" borderWidth="1px" borderRadius="md" p={4} mb={4} _hover={{ boxShadow: 'md' }}>
      <Heading size="md" mb={1}>{opportunity.title}</Heading>
      <Text fontSize="sm" noOfLines={2} mb={2}>{opportunity.description}</Text>
      <Badge>{opportunity.location || (opportunity.remote ? 'Remote' : 'N/A')}</Badge>
      <Button mt={3} size="sm" colorScheme="teal" onClick={() => onSelect(opportunity.id)}>
        View Details
      </Button>
    </Box>
  );
}
