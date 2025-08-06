import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import '../styles/PayRateSection.css';

function PayRateSection({ rates }) {
  if (!rates) return null;
  return (
    <Box className="pay-rate-section" p={4} borderWidth="1px" borderRadius="md" mb={4}>
      {Object.entries(rates).map(([tier, rate]) => (
        <Text key={tier}>{tier}: {rate * 100}%</Text>
      ))}
    </Box>
  );
}

export default PayRateSection;
