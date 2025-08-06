import React, { useEffect, useState } from 'react';
import { Box, Image, Text, Heading, Button, VStack } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/GigDetailPage.css';
import { getGig } from '../api/gigs.js';

export default function GigDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gig, setGig] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getGig(id);
        setGig(data);
      } catch (err) {
        console.error('Failed to load gig', err);
      }
    }
    load();
  }, [id]);

  if (!gig) {
    return <Box>Loading...</Box>;
  }

  function handlePurchase() {
    navigate(`/payments?gigId=${id}&amount=${gig.price}`);
  }

  return (
    <Box className="gig-detail-page" p={4}>
      <VStack spacing={4} align="stretch">
        <Heading>{gig.title}</Heading>
        <Image src={gig.image} alt={gig.title} className="detail-image" />
        <Text>{gig.description}</Text>
        <Text>Category: {gig.category}</Text>
        <Text>Price: ${gig.price}</Text>
        <Text>Rating: {gig.rating}</Text>
        <Button colorScheme="teal" onClick={handlePurchase}>
          Purchase
        </Button>
      </VStack>
    </Box>
  );
}
