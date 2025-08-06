import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import '../styles/ContractCard.css';

export default function ContractCard({ contract, onSelect }) {
  return (
    <Box className="contract-card" borderWidth="1px" borderRadius="md" p={4} mb={4}>
      <Heading size="sm" mb={2}>{contract.title}</Heading>
      <Text>Status: {contract.status}</Text>
      <Button mt={2} colorScheme="teal" size="sm" onClick={() => onSelect(contract.id)}>
        View Details
      </Button>
    </Box>
  );
}
