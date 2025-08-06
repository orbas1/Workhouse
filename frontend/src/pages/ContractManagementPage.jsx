import React, { useEffect, useState } from 'react';
import { Box, Heading, Flex, useToast } from '@chakra-ui/react';
import ContractCard from '../components/ContractCard.jsx';
import ContractDetail from '../components/ContractDetail.jsx';
import {
  getContracts,
  getContract,
  terminateContract,
  getProposals,
  getInvoices,
  submitInvoice,
  getWorkSubmissions,
  submitWork,
  approveWork,
} from '../api/contracts.js';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/ContractManagementPage.css';

export default function ContractManagementPage() {
  const [contracts, setContracts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const { user } = useAuth();
  const toast = useToast();

  useEffect(() => {
    async function load() {
      try {
        const data = await getContracts();
        setContracts(data);
      } catch (err) {
        toast({ title: 'Failed to load contracts', status: 'error' });
      }
    }
    load();
  }, [toast]);

  async function handleSelect(id) {
    try {
      const [contractData, proposalData, invoiceData, submissionData] = await Promise.all([
        getContract(id),
        getProposals(id),
        getInvoices(id),
        getWorkSubmissions(id),
      ]);
      setSelected(contractData);
      setProposals(proposalData);
      setInvoices(invoiceData);
      setSubmissions(submissionData);
    } catch (err) {
      toast({ title: 'Failed to fetch contract', status: 'error' });
    }
  }

  async function handleSubmitWork(contractId, form) {
    try {
      await submitWork(contractId, { ...form, freelancerId: user.id });
      const data = await getWorkSubmissions(contractId);
      setSubmissions(data);
      toast({ title: 'Work submitted', status: 'success' });
    } catch (err) {
      toast({ title: 'Failed to submit work', status: 'error' });
    }
  }

  async function handleSubmitInvoice(contractId, form) {
    try {
      await submitInvoice(contractId, { ...form, freelancerId: user.id });
      const data = await getInvoices(contractId);
      setInvoices(data);
      toast({ title: 'Invoice submitted', status: 'success' });
    } catch (err) {
      toast({ title: 'Failed to submit invoice', status: 'error' });
    }
  }

  async function handleApproveWork(contractId, submissionId) {
    try {
      await approveWork(contractId, submissionId);
      const data = await getWorkSubmissions(contractId);
      setSubmissions(data);
      toast({ title: 'Work approved', status: 'success' });
    } catch (err) {
      toast({ title: 'Failed to approve work', status: 'error' });
    }
  }

  async function handleTerminate(id) {
    try {
      await terminateContract(id, 'User terminated');
      const data = await getContracts();
      setContracts(data);
      setSelected(null);
      toast({ title: 'Contract terminated', status: 'success' });
    } catch (err) {
      toast({ title: 'Failed to terminate contract', status: 'error' });
    }
  }

  return (
    <Flex className="contract-management" p={4} wrap="wrap">
      <Box flex="1" minW="300px" mr={4}>
        <Heading size="md" mb={4}>Contracts</Heading>
        {contracts.map((c) => (
          <ContractCard key={c.id} contract={c} onSelect={handleSelect} />
        ))}
      </Box>
      <Box flex="2" minW="300px">
        <ContractDetail
          contract={selected}
          proposals={proposals}
          invoices={invoices}
          workSubmissions={submissions}
          onSubmitWork={handleSubmitWork}
          onSubmitInvoice={handleSubmitInvoice}
          onApproveWork={handleApproveWork}
          onTerminate={handleTerminate}
        />
      </Box>
    </Flex>
  );
}
