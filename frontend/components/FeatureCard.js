const { Box, Heading, Text, Image } = ChakraUI;

function FeatureCard({ title, description, icon }) {
  return (
    <Box className="feature-card" borderWidth="1px" borderRadius="lg" p={6} textAlign="center" bg="white">
      {icon && <Image src={icon} alt="" boxSize="50px" mx="auto" mb={4} />}
      <Heading size="md" mb={2}>{title}</Heading>
      <Text fontSize="sm" color="gray.600">{description}</Text>
    </Box>
  );
}

window.FeatureCard = FeatureCard;
