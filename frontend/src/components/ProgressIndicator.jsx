import React from 'react';
import { Box, Progress, Text } from '@chakra-ui/react';
import '../styles/ProgressIndicator.css';

export default function ProgressIndicator({ step, total }) {
  const percent = (step / total) * 100;
  return (
    <Box className="progress-indicator">
      <Progress value={percent} mb={2} />
      <Text className="progress-label">Step {step} of {total}</Text>
    </Box>
  );
}
