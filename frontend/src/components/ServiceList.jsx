import React from 'react';
import { Box, Stack, Text, Button } from '@chakra-ui/react';
import '../styles/ServiceList.css';

function ServiceList({ services = [], onSelect }) {
  return (
    <Stack spacing={3} className="service-list">
      {services.map((service) => (
        <Box key={service.id} className="service-item" borderWidth="1px" borderRadius="lg" p={4}>
          <Text fontWeight="bold">{service.title}</Text>
          <Text>Status: {service.status}</Text>
          <Text>Price: ${service.price}</Text>
          {onSelect && (
            <Button size="sm" mt={2} onClick={() => onSelect(service)}>
              View
            </Button>
          )}
        </Box>
      ))}
    </Stack>
  );
}

export default ServiceList;
