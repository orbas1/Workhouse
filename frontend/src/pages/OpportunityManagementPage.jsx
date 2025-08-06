import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Button,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure
} from '@chakra-ui/react';
import OpportunityCard from '../components/OpportunityCard.jsx';
import OpportunityForm from '../components/OpportunityForm.jsx';
import {
  getOpportunityDashboard,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
  duplicateOpportunity
} from '../api/opportunities.js';
import '../styles/OpportunityManagementPage.css';

export default function OpportunityManagementPage() {
  const [opportunities, setOpportunities] = useState([]);
  const [stats, setStats] = useState({});
  const [editing, setEditing] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function load() {
    try {
      const data = await getOpportunityDashboard();
      setOpportunities(data.opportunities || []);
      setStats(data.stats || {});
    } catch (err) {
      console.error('Failed to load opportunities', err);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const handleCreate = () => {
    setEditing(null);
    onOpen();
  };

  const handleEdit = (opportunity) => {
    setEditing(opportunity);
    onOpen();
  };

  async function handleSubmit(data) {
    try {
      if (editing) {
        await updateOpportunity(editing.id, data);
      } else {
        await createOpportunity(data);
      }
      onClose();
      await load();
    } catch (err) {
      console.error('Save failed', err);
    }
  }

  async function handleDelete(id) {
    await deleteOpportunity(id);
    load();
  }

  async function handleDuplicate(id) {
    await duplicateOpportunity(id);
    load();
  }

  async function handleStatusChange(opportunity, status) {
    await updateOpportunity(opportunity.id, { status });
    load();
  }

  return (
    <Box className="opportunity-management-page" p={4}>
      <Heading mb={4}>Opportunity Management</Heading>
      <Button colorScheme="teal" mb={4} onClick={handleCreate}>
        Create New Opportunity
      </Button>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={6}>
        <Stat borderWidth="1px" borderRadius="md" p={4}>
          <StatLabel>Total Views</StatLabel>
          <StatNumber>{stats.totalViews || 0}</StatNumber>
        </Stat>
        <Stat borderWidth="1px" borderRadius="md" p={4}>
          <StatLabel>Total Applications</StatLabel>
          <StatNumber>{stats.totalApplications || 0}</StatNumber>
        </Stat>
        <Stat borderWidth="1px" borderRadius="md" p={4}>
          <StatLabel>Total Matches</StatLabel>
          <StatNumber>{stats.totalMatches || 0}</StatNumber>
        </Stat>
      </SimpleGrid>
      {opportunities.map((op) => (
        <OpportunityCard
          key={op.id}
          opportunity={op}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          onStatusChange={handleStatusChange}
        />
      ))}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editing ? 'Edit Opportunity' : 'New Opportunity'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <OpportunityForm initialData={editing} onSubmit={handleSubmit} onCancel={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
