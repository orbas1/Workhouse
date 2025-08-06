import React from 'react';
import { Box, Stack, Text, Button, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import '../styles/ServiceList.css';

function ServiceList({ services = [] }) {
  const navigate = useNavigate();
  return (
    <Stack spacing={3} className="service-list">
      {services.map((service) => (
        <Box key={service.id} className="service-item" borderWidth="1px" borderRadius="lg" p={4}>
          <Text fontWeight="bold">{service.title || service.name}</Text>
          <Text>Status: {service.status}</Text>
          <Text>Price: ${service.price}</Text>
          <HStack mt={2} spacing={2}>
            <Button size="sm" onClick={() => navigate(`/services/${service.id}`)}>
              View
            </Button>
            <Button size="sm" colorScheme="blue" onClick={() => navigate(`/services/${service.id}/edit`)}>
              Edit
            </Button>
          </HStack>
        </Box>
      ))}
    </Stack>
  );
}

export default ServiceList;
