import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  useToast,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Button,
} from '@chakra-ui/react';
import CampaignForm from '../components/CampaignForm.jsx';
import { createCampaign, updateCampaign } from '../api/campaigns.js';
import { fetchAnalytics } from '../api/ads.js';
import '../styles/AdsDashboardPage.css';

export default function AdsDashboardPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [totals, setTotals] = useState({ impressions: 0, clicks: 0, ctr: 0, spend: 0 });
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchAnalytics();
        setCampaigns(data.campaigns);
        setTotals(data.totals);
      } catch (err) {
        toast({ title: 'Failed to load analytics', status: 'error' });
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

  async function handlePause(id) {
    try {
      const updated = await updateCampaign(id, { status: 'paused' });
      setCampaigns((prev) => prev.map((c) => (c.id === id ? updated : c)));
    } catch (err) {
      toast({ title: 'Update failed', status: 'error' });
    }
  }

  return (
    <Box p={4} className="ads-dashboard">
      <Heading size="lg" mb={4}>Ads Dashboard</Heading>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <SimpleGrid columns={[2, 4]} spacing={4} className="quick-stats" mb={4}>
            <Stat>
              <StatLabel>Impressions</StatLabel>
              <StatNumber>{totals.impressions}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Clicks</StatLabel>
              <StatNumber>{totals.clicks}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Spend</StatLabel>
              <StatNumber>${totals.spend}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>CTR</StatLabel>
              <StatNumber>{(totals.ctr * 100).toFixed(2)}%</StatNumber>
            </Stat>
          </SimpleGrid>
          <CampaignForm onSubmit={handleCreate} />
          <Table variant="simple" mt={4}>
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Status</Th>
                <Th isNumeric>Goal</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {campaigns.map((c) => (
                <Tr key={c.id}>
                  <Td>{c.title}</Td>
                  <Td>{c.status}</Td>
                  <Td isNumeric>{c.goalTarget}</Td>
                  <Td>
                    <Button size="sm" onClick={() => handlePause(c.id)} disabled={c.status !== 'ongoing'}>
                      Pause
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      )}
    </Box>
  );
}
