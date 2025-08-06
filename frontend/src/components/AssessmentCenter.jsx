import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

export default function AssessmentCenter() {
  return (
    <Box className="assessment-center">
      <Heading size="md" mb={2}>Assessments & Grading</Heading>
      <Box mb={2}>Create quizzes and tests, manage assessments,</Box>
      <Box mb={2}>and track grades with certification badges.</Box>
      <Box>Collect reviews and testimonials from participants.</Box>
    </Box>
  );
}
