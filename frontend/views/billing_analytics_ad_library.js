const { Box, Tabs, TabList, TabPanels, Tab, TabPanel, Heading, Table, Thead, Tbody, Tr, Th, Td, Button, FormControl, FormLabel, Input, SimpleGrid, Stat, StatLabel, StatNumber, Text } = ChakraUI;
const { useState, useEffect } = React;

function BillingAnalyticsAdLibraryPage() {
  const [billing, setBilling] = useState({ methods: [], transactions: [] });
  const [analytics, setAnalytics] = useState({ totals: {}, campaigns: [] });
  const [library, setLibrary] = useState([]);
  const [roi, setRoi] = useState({ revenue: '', cost: '', result: null });

  useEffect(() => {
    async function loadData() {
      try {
        const billingData = await adsAPI.getBillingInfo();
        setBilling(billingData);
        const analyticsData = await adsAPI.getAnalytics();
        setAnalytics(analyticsData);
        const libraryData = await adsAPI.getAdLibrary();
        setLibrary(libraryData);
      } catch (err) {
        console.error('Failed to load ads data', err);
      }
    }
    loadData();
  }, []);

  function calculateRoi() {
    const revenue = parseFloat(roi.revenue) || 0;
    const cost = parseFloat(roi.cost) || 0;
    if (cost > 0) {
      const result = ((revenue - cost) / cost) * 100;
      setRoi({ ...roi, result: result.toFixed(2) });
    }
  }

  function exportAnalytics() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(analytics));
    const a = document.createElement('a');
    a.setAttribute('href', dataStr);
    a.setAttribute('download', 'analytics.json');
    a.click();
  }

  return (
    <Box className="billing-analytics" p={4}>
      <NavMenu />
      <Heading size="lg" mb={4}>Billing, Analytics & Ad Library</Heading>
      <Tabs colorScheme="teal">
        <TabList>
          <Tab>Billing</Tab>
          <Tab>Analytics</Tab>
          <Tab>Ad Library</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Heading size="md" mb={2}>Payment Methods</Heading>
            <Table variant="simple" mb={4}>
              <Thead><Tr><Th>Type</Th><Th>Brand</Th><Th>Last4</Th></Tr></Thead>
              <Tbody>
                {billing.methods.map(m => (
                  <Tr key={m.id}><Td>{m.type}</Td><Td>{m.brand}</Td><Td>{m.last4}</Td></Tr>
                ))}
              </Tbody>
            </Table>
            <Heading size="md" mb={2}>Transactions</Heading>
            <Table variant="simple">
              <Thead><Tr><Th>Date</Th><Th>Amount</Th><Th>Type</Th><Th>Status</Th></Tr></Thead>
              <Tbody>
                {billing.transactions.map(t => (
                  <Tr key={t.id}><Td>{t.date}</Td><Td>${t.amount}</Td><Td>{t.type}</Td><Td>{t.status}</Td></Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            <SimpleGrid columns={[1,2,4]} spacing={4} mb={4}>
              <Stat><StatLabel>Impressions</StatLabel><StatNumber>{analytics.totals.impressions || 0}</StatNumber></Stat>
              <Stat><StatLabel>Clicks</StatLabel><StatNumber>{analytics.totals.clicks || 0}</StatNumber></Stat>
              <Stat><StatLabel>CTR</StatLabel><StatNumber>{((analytics.totals.ctr || 0) *100).toFixed(2)}%</StatNumber></Stat>
              <Stat><StatLabel>Spend</StatLabel><StatNumber>${analytics.totals.spend || 0}</StatNumber></Stat>
            </SimpleGrid>
            <Heading size="sm" mb={2}>ROI Calculator</Heading>
            <FormControl mb={2}>
              <FormLabel>Revenue</FormLabel>
              <Input value={roi.revenue} onChange={e=>setRoi({...roi, revenue:e.target.value})} />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel>Cost</FormLabel>
              <Input value={roi.cost} onChange={e=>setRoi({...roi, cost:e.target.value})} />
            </FormControl>
            <Button colorScheme="teal" onClick={calculateRoi} mb={2}>Calculate ROI</Button>
            {roi.result && <Box mb={4}>ROI: {roi.result}%</Box>}
            <Button colorScheme="teal" variant="outline" onClick={exportAnalytics}>Export Analytics</Button>
          </TabPanel>
          <TabPanel>
            <SimpleGrid columns={[1,2,3]} spacing={4}>
              {library.map(c => (
                <Box key={c.id} p={4} borderWidth="1px" borderRadius="md" bg="white">
                  <Heading size="sm" mb={2}>{c.name}</Heading>
                  <Text>Impressions: {c.impressions}</Text>
                  <Text>Clicks: {c.clicks}</Text>
                  <Text>CTR: {(c.ctr * 100).toFixed(2)}%</Text>
                  <Text>Spend: ${c.spend}</Text>
                  <Button mt={2} size="sm" colorScheme="teal">Republish</Button>
                </Box>
              ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

window.BillingAnalyticsAdLibraryPage = BillingAnalyticsAdLibraryPage;
