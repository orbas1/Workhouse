import React, { useState } from 'react';
import {
  Box,
  Heading,
  Input,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast
} from '@chakra-ui/react';
import { fetchProposals, fetchInvoices, submitInvoice } from '../api/contracts.js';
import ProposalCard from '../components/ProposalCard.jsx';
import InvoiceForm from '../components/InvoiceForm.jsx';
import '../../styles/ProposalInvoiceManagement.css';

export default function ProposalInvoiceManagementPage() {
  const [contractId, setContractId] = useState('');
  const [proposals, setProposals] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const toast = useToast();

  const loadData = async () => {
    if (!contractId) return;
    try {
      const [p, i] = await Promise.all([
        fetchProposals(contractId),
        fetchInvoices(contractId)
      ]);
      setProposals(p);
      setInvoices(i);
    } catch {
      toast({ title: 'Failed to load data', status: 'error' });
    }
  };

  const handleInvoiceSubmit = async (data) => {
    try {
      await submitInvoice(contractId, data);
      toast({ title: 'Invoice submitted', status: 'success' });
      loadData();
    } catch {
      toast({ title: 'Submission failed', status: 'error' });
    }
  };

  return (
    <Box className="proposal-invoice-management" p={4}>
      <Heading mb={4}>Proposal & Invoice Management</Heading>
      <Box mb={4} display="flex" gap={2}>
        <Input placeholder="Contract ID" value={contractId} onChange={(e) => setContractId(e.target.value)} />
        <Button onClick={loadData} colorScheme="teal">Load</Button>
      </Box>
      <Tabs>
        <TabList>
          <Tab>Proposals</Tab>
          <Tab>Invoices</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {proposals.map((p) => (
              <ProposalCard key={p.id} proposal={p} />
            ))}
          </TabPanel>
          <TabPanel>
            {invoices.map((inv) => (
              <Box key={inv.id} className="invoice-item" p={3} borderWidth="1px" borderRadius="md" mb={2}>
                Amount: ${inv.amount} - {inv.status}
              </Box>
            ))}
            {contractId && <InvoiceForm onSubmit={handleInvoiceSubmit} />}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
