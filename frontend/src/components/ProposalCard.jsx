import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import '../../styles/ProposalCard.css';

export default function ProposalCard({ proposal }) {
  return (
    <Box className="proposal-card" p={4} borderWidth="1px" borderRadius="md">
      <Text fontWeight="bold">Freelancer: {proposal.freelancerId}</Text>
      <Text>Status: {proposal.status}</Text>
      {proposal.proposalText && <Text mt={2}>{proposal.proposalText}</Text>}
    </Box>
  );
}
