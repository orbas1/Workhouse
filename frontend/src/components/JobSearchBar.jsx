import React, { useState } from 'react';
import { Box, Flex, Input, Button } from '@chakra-ui/react';
import '../styles/JobSearchBar.css';

export default function JobSearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSearch({ keyword, location });
  }

  return (
    <Box as="form" onSubmit={handleSubmit} className="job-search-bar" mb={4}>
      <Flex gap={2} wrap="wrap">
        <Input
          placeholder="Keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Button type="submit" colorScheme="teal">
          Search
        </Button>
      </Flex>
    </Box>
  );
}
