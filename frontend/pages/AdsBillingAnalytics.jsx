import { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  useToast
} from '@chakra-ui/react';
import NavMenu from '../components/NavMenu.jsx';
import {
  getBillingInfo,
  getAnalytics,
  getAdLibrary
} from '../api/ads.js';
import '../styles/AdsBillingAnalytics.css';

export default function AdsBillingAnalytics() {
  const [billing, setBilling] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    async function load() {
      try {
        const [b, a, l] = await Promise.all([
          getBillingInfo(),
          getAnalytics(),
          getAdLibrary()
        ]);
        setBilling(b);
        setAnalytics(a);
        setLibrary(l);
      } catch (err) {
        toast({ title: 'Failed to load ad billing data', status: 'error' });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [toast]);

  if (loading) {
    return (
      <ChakraProvider>
        <NavMenu />
        <Box p={4}>
          <Spinner />
        </Box>
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider>
      <NavMenu />
      <Box className="ads-billing-analytics" p={4}>
        <Heading mb={4}>Ads Billing & Analytics</Heading>

        <Box mb={6} className="billing-section">
          <Heading size="md" mb={2}>Billing</Heading>
          <Table size="sm">
            <Tbody>
              <Tr>
                <Th>Balance</Th>
                <Td isNumeric>${billing?.balance ?? 0}</Td>
              </Tr>
              <Tr>
                <Th>Total Spend</Th>
                <Td isNumeric>${billing?.spend ?? 0}</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>

        <Box mb={6} className="analytics-section">
          <Heading size="md" mb={2}>Analytics</Heading>
          <Table size="sm">
            <Tbody>
              <Tr>
                <Th>Impressions</Th>
                <Td isNumeric>{analytics?.impressions ?? 0}</Td>
              </Tr>
              <Tr>
                <Th>Clicks</Th>
                <Td isNumeric>{analytics?.clicks ?? 0}</Td>
              </Tr>
              <Tr>
                <Th>CTR</Th>
                <Td isNumeric>{analytics?.ctr ?? 0}%</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>

        <Box className="library-section">
          <Heading size="md" mb={2}>Ad Library</Heading>
          <Table variant="striped" size="sm">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {library.map((ad) => (
                <Tr key={ad.id}>
                  <Td>{ad.title}</Td>
                  <Td>{ad.status}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </ChakraProvider>
  );
}
