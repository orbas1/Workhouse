import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Stack,
  Badge
} from '@chakra-ui/react';
import '../styles/OpportunityDetailModal.css';
import { getOpportunity } from '../api/opportunities.js';

export default function OpportunityDetailModal({ opportunityId, isOpen, onClose }) {
  const [opportunity, setOpportunity] = useState(null);

  useEffect(() => {
    if (opportunityId && isOpen) {
      getOpportunity(opportunityId)
        .then(setOpportunity)
        .catch((err) => console.error('Failed to load opportunity', err));
    }
  }, [opportunityId, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent className="opportunity-detail-modal">
        <ModalHeader>{opportunity?.title || 'Opportunity Details'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {opportunity ? (
            <Stack spacing={3}>
              <Text>{opportunity.description}</Text>
              <Badge>{opportunity.location || (opportunity.remote ? 'Remote' : 'N/A')}</Badge>
              {opportunity.requirements && (
                <Text fontSize="sm">Requirements: {opportunity.requirements}</Text>
              )}
              {typeof opportunity.compensation !== 'undefined' && (
                <Text fontSize="sm">Compensation: {opportunity.compensation}</Text>
              )}
            </Stack>
          ) : (
            <Text>Loading...</Text>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
