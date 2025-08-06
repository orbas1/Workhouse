import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Box, Heading, Text, Button, Spinner } from '@chakra-ui/react';
import { fetchContentDetails } from '../api/contentLibrary.js';
import '../styles/ContentDetailPage.css';

export default function ContentDetailPage() {
  const { type, id } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchContentDetails(type, id);
        setContent(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [type, id]);

  if (loading) {
    return (
      <Box p={4} textAlign="center">
        <Spinner />
      </Box>
    );
  }

  if (!content) {
    return <Box p={4}>Content not found.</Box>;
  }

  return (
    <Box className="content-detail" p={4}>
      <Heading mb={2}>{content.title}</Heading>
      {content.description && <Text mb={4}>{content.description}</Text>}
      <Button
        as={RouterLink}
        to={`/content-library/${type}/${id}/play`}
        colorScheme="teal"
      >
        {type === 'podcast' ? 'Play Podcast' : 'Join Webinar'}
      </Button>
    </Box>
  );
}
