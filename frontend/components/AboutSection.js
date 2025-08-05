const { Box, Heading, Text } = ChakraUI;

function AboutSection({ bio }) {
  return (
    <Box className="about-section" p={4} borderWidth="1px" borderRadius="lg">
      <Heading size="sm" mb={2}>About Me</Heading>
      <Text>{bio || 'No bio provided.'}</Text>
    </Box>
  );
}

window.AboutSection = AboutSection;
