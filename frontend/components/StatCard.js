const { Box, Heading, Text } = ChakraUI;

function StatCard({ label, value }) {
  return (
    <Box className="stat-card" p={4} borderWidth="1px" borderRadius="md" bg="white">
      <Heading size="md" mb={2}>{label}</Heading>
      <Text fontSize="2xl" fontWeight="bold">{value}</Text>
    </Box>
  );
}

window.StatCard = StatCard;
