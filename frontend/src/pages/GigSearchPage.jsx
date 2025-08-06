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
  IconButton,
  Heading,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import '../styles/GigSearchPage.css';
import { searchGigs, getRecommendedGigs, toggleFavorite } from '../api/gigs.js';
import { StarIcon } from '@chakra-ui/icons';

export default function GigSearchPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState(500);
  const [gigs, setGigs] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [sort, setSort] = useState('relevance');
  const [rating, setRating] = useState('');
  const [favorites, setFavorites] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    load();
    loadRecommendations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function load() {
    try {
      const data = await searchGigs({
        search: query,
        category,
        maxPrice,
        sort,
        minRating: rating,
      });
      setGigs(data);
    } catch (err) {
      console.error('Failed to load gigs', err);
    }
  }

  async function loadRecommendations() {
    try {
      const data = await getRecommendedGigs();
      setRecommended(data);
    } catch (err) {
      console.error('Failed to load recommendations', err);
    }
  }

  async function handleFavorite(id) {
    try {
      await toggleFavorite(id);
      setFavorites(prev => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id); else next.add(id);
        return next;
      });
    } catch (err) {
      console.error('Failed to toggle favorite', err);
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
        <Select
          placeholder="Sort By"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          maxW="200px"
        >
          <option value="relevance">Most Relevant</option>
          <option value="rating">Highest Rated</option>
          <option value="newest">Newest</option>
        </Select>
        <Select
          placeholder="Min Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          maxW="160px"
        >
          <option value="5">5 Stars</option>
          <option value="4">4 Stars & Up</option>
          <option value="3">3 Stars & Up</option>
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
            position="relative"
          >
            <IconButton
              icon={<StarIcon color={favorites.has(gig.id) ? 'yellow.400' : 'gray.300'} />}
              aria-label="favorite"
              className="favorite-btn"
              onClick={(e) => { e.stopPropagation(); handleFavorite(gig.id); }}
              size="sm"
              variant="ghost"
            />
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
      {recommended.length > 0 && (
        <Box p={4}>
          <Heading size="md" mb={4}>Recommended for You</Heading>
          <SimpleGrid columns={[1, 2, 3]} spacing={4}>
            {recommended.map((gig) => (
              <Box
                key={gig.id}
                className="gig-card"
                borderWidth="1px"
                borderRadius="md"
                overflow="hidden"
                onClick={() => navigate(`/gigs/${gig.id}`)}
                cursor="pointer"
                position="relative"
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
      )}
    </Box>
  );
}
