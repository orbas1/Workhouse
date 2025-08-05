import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import '../styles/StatCard.css';

export default function StatCard({ label, value }) {
  return (
    <Box className="stat-card" borderWidth="1px" borderRadius="md" p={4} textAlign="center">
      <Heading size="md" mb={2}>{value}</Heading>
      <Text fontSize="sm" color="gray.600">{label}</Text>
    </Box>
  );
}
