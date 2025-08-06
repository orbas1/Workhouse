import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Input,
  Select,
  Button,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import VolunteerOpportunityCard from '../components/VolunteerOpportunityCard.jsx';
import { listOpportunities, getOpportunity } from '../api/opportunities.js';
import { submitApplication } from '../api/applications.js';
import { getBookmarks, toggleBookmark, isBookmarked } from '../utils/bookmarks.js';
import '../styles/VolunteerOpportunitySearchPage.css';

export default function VolunteerOpportunitySearchPage() {
  const [filters, setFilters] = useState({ keyword: '', location: '', availability: '', duration: '' });
  const [opportunities, setOpportunities] = useState([]);
  const [selected, setSelected] = useState(null);
  const [bookmarks, setBookmarks] = useState(getBookmarks());

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function load() {
    try {
      const params = { keyword: filters.keyword };
      if (filters.location) params.location = filters.location;
      if (filters.availability) params.commitmentTime = filters.availability;
      if (filters.duration) params.duration = filters.duration;
      const data = await listOpportunities(params);
      setOpportunities(data.opportunities || []);
    } catch (err) {
      console.error('Failed to load opportunities', err);
    }
  }

  async function openDetails(op) {
    try {
      const data = await getOpportunity(op.id);
      setSelected(data);
    } catch (err) {
      console.error('Failed to fetch opportunity', err);
    }
  }

  async function handleApply(id) {
    try {
      await submitApplication({ opportunityId: id, message: '' });
      alert('Application submitted');
    } catch (err) {
      console.error('Failed to apply', err);
      alert('Failed to apply');
    }
  }

  function handleBookmark(opportunity) {
    const updated = toggleBookmark(opportunity);
    setBookmarks(updated);
  }

  return (
    <Box className="volunteer-opportunity-search" p={4}>
      <Flex className="search-controls" wrap="wrap" gap={4} mb={4}>
        <Input
          placeholder="Keyword"
          value={filters.keyword}
          onChange={e => setFilters(f => ({ ...f, keyword: e.target.value }))}
        />
        <Input
          placeholder="Location"
          value={filters.location}
          onChange={e => setFilters(f => ({ ...f, location: e.target.value }))}
          maxW="200px"
        />
        <Select
          placeholder="Availability"
          value={filters.availability}
          onChange={e => setFilters(f => ({ ...f, availability: e.target.value }))}
          maxW="180px"
        >
          <option value="part-time">Part-Time</option>
          <option value="full-time">Full-Time</option>
        </Select>
        <Select
          placeholder="Duration"
          value={filters.duration}
          onChange={e => setFilters(f => ({ ...f, duration: e.target.value }))}
          maxW="180px"
        >
          <option value="short">Short-Term</option>
          <option value="medium">Medium-Term</option>
          <option value="long">Long-Term</option>
        </Select>
        <Button colorScheme="teal" onClick={load}>
          Search
        </Button>
      </Flex>
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {opportunities.map(op => (
          <VolunteerOpportunityCard
            key={op.id}
            opportunity={op}
            onOpen={openDetails}
            onBookmark={handleBookmark}
            bookmarked={isBookmarked(op.id)}
          />
        ))}
      </SimpleGrid>
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selected?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selected && (
              <VStack align="stretch" spacing={3} className="opportunity-details">
                {selected.location && <Text>Location: {selected.location}</Text>}
                {selected.commitmentTime && <Text>Commitment: {selected.commitmentTime}</Text>}
                {selected.duration && <Text>Duration: {selected.duration}</Text>}
                {selected.description && <Text>{selected.description}</Text>}
                {selected.requirements && (
                  <Text>Requirements: {selected.requirements}</Text>
                )}
                <Flex gap={2} pt={2} pb={4}>
                  <Button colorScheme="teal" onClick={() => handleApply(selected.id)}>
                    Apply Now
                  </Button>
                  <Button onClick={() => handleBookmark(selected)}>
                    {isBookmarked(selected.id) ? 'Unsave' : 'Save for Later'}
                  </Button>
                </Flex>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

