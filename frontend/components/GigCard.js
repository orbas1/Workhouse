const { Box, Image, Text, Badge, Stack } = ChakraUI;

function GigCard({ gig }) {
  return (
    <Box className="gig-card" borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} bg="white">
      <Stack spacing={2}>
        <Image src={gig.thumbnail || `${window.env.GIG_PLACEHOLDER_URL}${gig.id}`}
               alt={gig.title} borderRadius="md" />
        <Text fontWeight="bold">{gig.title}</Text>
        <Text>${'{'}gig.price{'}'}</Text>
        <Badge colorScheme="teal">{gig.category}</Badge>
      </Stack>
    </Box>
  );
}

window.GigCard = GigCard;
