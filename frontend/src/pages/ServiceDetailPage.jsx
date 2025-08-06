import React, { useEffect, useState } from 'react';
import {
  Box,
  Image,
  Text,
  Heading,
  Button,
  VStack,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import '../styles/ServiceDetailPage.css';
import { getService, requestService } from '../api/services.js';

export default function ServiceDetailPage() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getService(id);
        setService(data);
      } catch (err) {
        console.error('Failed to load service', err);
      }
    }
    load();
  }, [id]);

  async function handleRequest() {
    try {
      await requestService(id);
      setRequested(true);
    } catch (err) {
      console.error('Failed to request service', err);
    }
  }

  if (!service) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box className="service-detail-page" p={4}>
      <VStack spacing={4} align="stretch">
        <Heading>{service.name}</Heading>
        <Image src={service.image} alt={service.name} className="detail-image" />
        <Text>{service.description}</Text>
        <Text>Category: {service.category}</Text>
        <Text>Price: ${service.price}</Text>
        <Text>Rating: {service.rating}</Text>
        <Button colorScheme="teal" onClick={handleRequest} isDisabled={requested}>
          {requested ? 'Requested' : 'Book Now'}
        </Button>
      </VStack>
    </Box>
  );
}
