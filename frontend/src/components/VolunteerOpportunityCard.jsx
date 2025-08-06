import React from 'react';
import { Box, Heading, Text, Badge, IconButton } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import '../styles/VolunteerOpportunityCard.css';

export default function VolunteerOpportunityCard({ opportunity, onOpen, onBookmark, bookmarked }) {
  return (
    <Box
      className="volunteer-op-card"
      borderWidth="1px"
      borderRadius="md"
      p={4}
      position="relative"
      onClick={() => onOpen(opportunity)}
      cursor="pointer"
      _hover={{ boxShadow: 'md' }}
    >
      <IconButton
        aria-label="bookmark"
        icon={<StarIcon />}
        size="sm"
        className="bookmark-btn"
        colorScheme={bookmarked ? 'yellow' : 'gray'}
        variant={bookmarked ? 'solid' : 'outline'}
        onClick={(e) => {
          e.stopPropagation();
          onBookmark(opportunity);
        }}
      />
      <Heading size="md" mb={2} pr={8}>
        {opportunity.title}
      </Heading>
      {opportunity.organizationId && (
        <Text fontSize="sm" mb={1} className="org-name">
          {opportunity.organizationId}
        </Text>
      )}
      {opportunity.location && <Text fontSize="sm">{opportunity.location}</Text>}
      {opportunity.commitmentTime && (
        <Badge mt={2}>{opportunity.commitmentTime}</Badge>
      )}
    </Box>
  );
}
