import React, { useEffect, useState } from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Spinner, useToast } from '@chakra-ui/react';
import CampaignForm from '../components/CampaignForm.jsx';
import { fetchCampaigns, createCampaign } from '../api/campaigns.js';
import '../styles/AdsDashboardPage.css';

export default function AdsDashboardPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchCampaigns();
        setCampaigns(data);
      } catch (err) {
        toast({ title: 'Failed to load campaigns', status: 'error' });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [toast]);

  async function handleCreate(values) {
    try {
      const newCampaign = await createCampaign(values);
      setCampaigns((prev) => [...prev, newCampaign]);
      toast({ title: 'Campaign created', status: 'success' });
    } catch (err) {
      toast({ title: 'Creation failed', status: 'error' });
    }
  }

  return (
    <Box p={4} className="ads-dashboard">
      <Heading size="lg" mb={4}>Ads Dashboard</Heading>
      <CampaignForm onSubmit={handleCreate} />
      {loading ? (
        <Spinner />
      ) : (
        <Table variant="simple" mt={4}>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Status</Th>
              <Th isNumeric>Goal</Th>
            </Tr>
          </Thead>
          <Tbody>
            {campaigns.map((c) => (
              <Tr key={c.id}>
                <Td>{c.title}</Td>
                <Td>{c.status}</Td>
                <Td isNumeric>{c.goalTarget}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
}
