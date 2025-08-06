import React, { useEffect, useState } from 'react';
import { Box, VStack, Heading, Spinner, useToast } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import DisputeSummary from '../components/DisputeSummary.jsx';
import DisputeTimeline from '../components/DisputeTimeline.jsx';
import DisputeChat from '../components/DisputeChat.jsx';
import { getDispute } from '../api/disputes.js';
import '../styles/DisputeManagementPage.css';

function DisputeManagementPage() {
  const { disputeId } = useParams();
  const [dispute, setDispute] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    if (!disputeId) {
      setLoading(false);
      return;
    }
    async function fetchData() {
      try {
        const data = await getDispute(disputeId);
        setDispute(data);
      } catch (err) {
        toast({ title: 'Failed to load dispute', status: 'error' });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [disputeId, toast]);

  if (loading) return <Spinner />;
  if (!disputeId) return <Box>Select a dispute from the dashboard.</Box>;
  if (!dispute) return <Box>Dispute not found.</Box>;

  return (
    <Box className="dispute-management-page">
      <Heading mb={4}>Dispute Management</Heading>
      <VStack spacing={8} align="stretch">
        <DisputeSummary dispute={dispute} />
        <DisputeTimeline dispute={dispute} />
        <DisputeChat disputeId={dispute.id} initialMessages={dispute.messages || []} />
      </VStack>
    </Box>
  );
}

export default DisputeManagementPage;
