import React, { useEffect, useState } from 'react';
import { Box, Image, Text, Heading, Button, VStack } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ProductDetailPage.css';
import { getProduct } from '../api/products.js';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (err) {
        console.error('Failed to load product', err);
      }
    }
    load();
  }, [id]);

  if (!product) {
    return <Box p={4}>Loading...</Box>;
  }

  function handleBuy() {
    navigate(`/payments?productId=${product.id}&amount=${product.price}`);
  }

  return (
    <Box className="product-detail-page" p={4}>
      <VStack spacing={4} align="stretch">
        <Heading>{product.name}</Heading>
        <Image src={product.image} alt={product.name} className="product-detail-image" />
        <Text>{product.description}</Text>
        <Text fontWeight="bold">${product.price}</Text>
        <Button colorScheme="teal" onClick={handleBuy}>Buy Now</Button>
      </VStack>
    </Box>
  );
}
