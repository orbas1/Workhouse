const { useState } = React;
const {
  ChakraProvider,
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  Button,
  useToast,
} = ChakraUI;

function ProposalInvoiceManagement() {
  const [contractId, setContractId] = useState('');
  const [proposals, setProposals] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const toast = useToast();

  async function loadData() {
    if (!contractId) return;
    try {
      const [p, i] = await Promise.all([
        contractsAPI.fetchProposals(contractId),
        contractsAPI.fetchInvoices(contractId),
      ]);
      setProposals(p);
      setInvoices(i);
    } catch (err) {
      toast({ title: 'Failed to load data', status: 'error' });
    }
  }

  async function handleInvoiceSubmit(data) {
    try {
      await contractsAPI.submitInvoice(contractId, { ...data, freelancerId: 'current' });
      toast({ title: 'Invoice submitted', status: 'success' });
      loadData();
    } catch (err) {
      toast({ title: 'Submission failed', status: 'error' });
    }
  }

  return (
    <ChakraProvider>
      <NavMenu />
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
              {proposals.map((p) => <ProposalCard key={p.id} proposal={p} />)}
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
    </ChakraProvider>
  );
}

window.ProposalInvoiceManagement = ProposalInvoiceManagement;
