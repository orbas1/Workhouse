import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

export default function TeacherProfileBanner() {
  return (
    <Box className="teacher-profile-banner">
      <Heading size="md" mb={2}>Teacher Profile Banner</Heading>
      <Box mb={2}>Teachers can customize their banner profiles</Box>
      <Box>and showcase videos advertising their services.</Box>
    </Box>
  );
}
