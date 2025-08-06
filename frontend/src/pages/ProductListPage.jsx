import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid, Image, Text, Heading, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProductListPage.css';
import { listProducts } from '../api/products.js';

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await listProducts();
      setProducts(data);
    } catch (err) {
      console.error('Failed to load products', err);
    }
  }

  return (
    <Box className="product-list-page" p={4}>
      <Heading mb={4}>Products</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {products.map((p) => (
          <Box
            key={p.id}
            className="product-card"
            borderWidth="1px"
            borderRadius="md"
            overflow="hidden"
          >
            <Image src={p.image} alt={p.name} className="product-image" />
            <Box p={3}>
              <Text fontWeight="bold">{p.name}</Text>
              <Text>${p.price}</Text>
              <Button mt={2} colorScheme="teal" onClick={() => navigate(`/products/${p.id}`)}>
                View
              </Button>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
