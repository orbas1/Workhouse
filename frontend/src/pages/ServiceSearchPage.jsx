import React, { useEffect, useState } from 'react';
import {
  Box,
  Input,
  Select,
  Button,
  SimpleGrid,
  Image,
  Text,
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx';
import NavMenu from '../components/NavMenu.jsx';
import '../styles/ServiceSearchPage.css';
import { searchServices } from '../api/services.js';

export default function ServiceSearchPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState(500);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function load() {
    try {
      const data = await searchServices({ search: query, category, maxPrice });
      setServices(data);
    } catch (err) {
      console.error('Failed to load services', err);
    }
  }

  return (
    <Box className="service-search-page">
      <NavBar />
      <NavMenu />
      <Flex className="search-controls" p={4} wrap="wrap" gap={4}>
        <Input
          placeholder="Search services"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Select
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          maxW="200px"
        >
          <option value="legal">Legal</option>
          <option value="marketing">Marketing</option>
        </Select>
        <Box className="price-filter" maxW="200px">
          <Text mb={2}>Max Price: ${maxPrice}</Text>
          <Slider
            min={50}
            max={1000}
            value={maxPrice}
            onChange={setMaxPrice}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
        <Button colorScheme="teal" onClick={load}>
          Search
        </Button>
      </Flex>
      <SimpleGrid columns={[1, 2, 3]} spacing={4} p={4}>
        {services.map((svc) => (
          <Box
            key={svc.id}
            className="service-card"
            borderWidth="1px"
            borderRadius="md"
            overflow="hidden"
            onClick={() => navigate(`/gigs/${svc.id}`)}
            cursor="pointer"
          >
            <Image src={svc.image} alt={svc.name} className="service-image" />
            <Box p={3}>
              <Text className="service-title" fontWeight="bold">
                {svc.name}
              </Text>
              <Text>${svc.price}</Text>
              <Text>Rating: {svc.rating}</Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
