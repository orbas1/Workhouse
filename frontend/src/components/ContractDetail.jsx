import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import '../styles/ContractDetail.css';

export default function ContractDetail({ contract, onTerminate }) {
  if (!contract) {
    return <Box className="contract-detail" p={4}>Select a contract to view details.</Box>;
  }
  return (
    <Box className="contract-detail" borderWidth="1px" borderRadius="md" p={4}>
      <Heading size="md" mb={2}>{contract.title}</Heading>
      <Text mb={2}>{contract.description}</Text>
      <Text>Status: {contract.status}</Text>
      <Button mt={4} colorScheme="red" size="sm" onClick={() => onTerminate(contract.id)}>
        Terminate
      </Button>
    </Box>
  );
}
