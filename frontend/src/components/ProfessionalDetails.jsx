import React from 'react';
import { Box, Heading, Wrap, WrapItem, Tag } from '@chakra-ui/react';
import '../styles/ProfessionalDetails.css';

function ProfessionalDetails({ skills = [] }) {
  return (
    <Box className="professional-details" p={4} borderWidth="1px" borderRadius="lg">
      <Heading size="sm" mb={2}>Skills</Heading>
      <Wrap>
        {skills.map((skill) => (
          <WrapItem key={skill}>
            <Tag>{skill}</Tag>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
}

export default ProfessionalDetails;
