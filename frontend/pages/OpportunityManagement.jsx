import { ChakraProvider, Box, Heading, SimpleGrid, Stat, StatLabel, StatNumber, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import NavMenu from '../components/NavMenu';
import OpportunityForm from '../components/OpportunityForm';
import OpportunityList from '../components/OpportunityList';
import { fetchOpportunities, createOpportunity, deleteOpportunity, fetchOpportunityDashboard } from '../api/opportunities';
import { applyToOpportunity } from '../api/applications';
import '../styles/OpportunityManagement.css';

export default function OpportunityManagement() {
  const [opportunities, setOpportunities] = useState([]);
  const [stats, setStats] = useState({ totalViews: 0, totalApplications: 0, totalMatches: 0 });
  const toast = useToast();

  const loadData = async () => {
    try {
      const [opsData, dash] = await Promise.all([
        fetchOpportunities(),
        fetchOpportunityDashboard(),
      ]);
      setOpportunities(opsData.opportunities || opsData); // API may return {opportunities:[]}
      setStats(dash.stats || stats);
    } catch (err) {
      toast({ title: 'Failed to load opportunities', status: 'error' });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (form) => {
    try {
      await createOpportunity(form);
      toast({ title: 'Opportunity created', status: 'success' });
      loadData();
    } catch (err) {
      toast({ title: 'Creation failed', status: 'error' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOpportunity(id);
      toast({ title: 'Opportunity deleted', status: 'info' });
      loadData();
    } catch (err) {
      toast({ title: 'Deletion failed', status: 'error' });
    }
  };

  const handleApply = async (id) => {
    try {
      await applyToOpportunity(id);
      toast({ title: 'Application submitted', status: 'success' });
    } catch (err) {
      toast({ title: 'Application failed', status: 'error' });
    }
  };

  return (
    <ChakraProvider>
      <NavMenu />
      <Box className="opportunity-management" p={4}>
        <Heading mb={4}>Opportunity Management</Heading>
        <SimpleGrid columns={[1, 3]} spacing={4} className="opportunity-stats" mb={4}>
          <Stat>
            <StatLabel>Views</StatLabel>
            <StatNumber>{stats.totalViews}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Applications</StatLabel>
            <StatNumber>{stats.totalApplications}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Matches</StatLabel>
            <StatNumber>{stats.totalMatches}</StatNumber>
          </Stat>
        </SimpleGrid>
        <OpportunityForm onSubmit={handleCreate} />
        <OpportunityList opportunities={opportunities} onDelete={handleDelete} onApply={handleApply} />
      </Box>
    </ChakraProvider>
  );
}
