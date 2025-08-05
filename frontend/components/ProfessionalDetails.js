const { Box, Heading, Wrap, WrapItem, Tag } = ChakraUI;

function ProfessionalDetails({ skills = [] }) {
  return (
    <Box className="professional-details" p={4} borderWidth="1px" borderRadius="lg">
      <Heading size="sm" mb={2}>Skills</Heading>
      <Wrap>
        {skills.map(skill => (
          <WrapItem key={skill}>
            <Tag>{skill}</Tag>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
}

window.ProfessionalDetails = ProfessionalDetails;
