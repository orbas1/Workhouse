import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

export default function CourseMaterials() {
  return (
    <Box className="course-materials">
      <Heading size="md" mb={2}>Course Materials</Heading>
      <Box mb={2}>Upload PowerPoint presentations, share recorded videos,</Box>
      <Box>and link to self storage or platform storage locations.</Box>
    </Box>
  );
}
