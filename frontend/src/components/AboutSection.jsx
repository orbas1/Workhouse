import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import '../styles/AboutSection.css';

function AboutSection({ bio }) {
  return (
    <Box className="about-section" p={4} borderWidth="1px" borderRadius="lg">
      <Heading size="sm" mb={2}>About Me</Heading>
      <Text>{bio || 'No bio provided.'}</Text>
    </Box>
  );
}

export default AboutSection;
