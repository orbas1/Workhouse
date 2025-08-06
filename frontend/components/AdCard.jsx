import { Box, Text, Button } from '@chakra-ui/react';
import '../styles/AdCard.css';

export default function AdCard({ ad }) {
  return (
    <Box className="ad-card" borderWidth="1px" borderRadius="md" p={4}>
      <Text fontWeight="bold" mb={2}>
        {ad.title}
      </Text>
      <Text mb={4}>{ad.content}</Text>
      {ad.ctaUrl && (
        <Button
          as="a"
          href={ad.ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          colorScheme="blue"
          size="sm"
        >
          Learn More
        </Button>
      )}
    </Box>
  );
}
