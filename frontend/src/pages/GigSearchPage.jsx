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
import '../styles/GigSearchPage.css';
import { searchGigs } from '../api/gigs.js';

export default function GigSearchPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState(500);
  const [gigs, setGigs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function load() {
    try {
      const data = await searchGigs({ search: query, category, maxPrice });
      setGigs(data);
    } catch (err) {
      console.error('Failed to load gigs', err);
    }
  }

  return (
    <Box className="gig-search-page">
      <Flex className="search-controls" p={4} wrap="wrap" gap={4}>
        <Input
          placeholder="Search gigs"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Select
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          maxW="200px"
        >
          <option value="design">Design</option>
          <option value="development">Development</option>
          <option value="writing">Writing</option>
        </Select>
        <Box className="price-filter" maxW="200px">
          <Text mb={2}>Max Price: ${maxPrice}</Text>
          <Slider min={5} max={1000} value={maxPrice} onChange={setMaxPrice}>
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
        {gigs.map((gig) => (
          <Box
            key={gig.id}
            className="gig-card"
            borderWidth="1px"
            borderRadius="md"
            overflow="hidden"
            onClick={() => navigate(`/gigs/${gig.id}`)}
            cursor="pointer"
          >
            <Image src={gig.image} alt={gig.title} className="gig-image" />
            <Box p={3}>
              <Text className="gig-title" fontWeight="bold">
                {gig.title}
              </Text>
              <Text>${gig.price}</Text>
              <Text>Rating: {gig.rating}</Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
