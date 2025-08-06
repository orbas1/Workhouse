import React from 'react';
import { Box, Progress, Text, VStack } from '@chakra-ui/react';
import '../styles/AffiliateCompetitions.css';

function AffiliateCompetitions({ competitions }) {
  return (
    <VStack className="affiliate-competitions" spacing={4} align="stretch" mb={4}>
      {competitions.map(comp => (
        <Box key={comp.id} p={4} borderWidth="1px" borderRadius="md">
          <Text fontWeight="bold">{comp.name}</Text>
          <Text mb={2}>{comp.description}</Text>
          <Progress value={comp.progress * 100} mb={2} />
          <Text>{comp.referrals}/{comp.targetReferrals} referrals</Text>
        </Box>
      ))}
    </VStack>
  );
}

export default AffiliateCompetitions;
