import { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Progress,
  Stack,
} from '@chakra-ui/react';
import NavMenu from '../components/NavMenu';
import {
  fetchSubscription,
  updateSubscription,
  fetchPaymentMethods,
  addPaymentMethod,
  removePaymentMethod,
  fetchTransactions,
  downloadInvoice,
} from '../api/billing';
import '../styles/BillingSubscription.css';

export default function BillingSubscription() {
  const [subscription, setSubscription] = useState(null);
  const [methods, setMethods] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({ type: 'all', search: '' });
  const [newMethod, setNewMethod] = useState({ cardNumber: '', expiry: '', brand: '' });
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [sub, m, t] = await Promise.all([
        fetchSubscription(),
        fetchPaymentMethods(),
        fetchTransactions(),
      ]);
      setSubscription(sub);
      setMethods(m);
      setTransactions(t);
    } catch (err) {
      console.error(err);
      toast({ status: 'error', title: 'Failed to load billing data' });
    }
  }

  async function handleSubscriptionSave() {
    try {
      const updated = await updateSubscription(subscription);
      setSubscription(updated);
      toast({ status: 'success', title: 'Subscription updated' });
    } catch (err) {
      toast({ status: 'error', title: 'Update failed' });
    }
  }

  async function handleAddMethod() {
    try {
      const saved = await addPaymentMethod(newMethod);
      setMethods([...methods, saved]);
      toast({ status: 'success', title: 'Payment method added' });
      onClose();
      setNewMethod({ cardNumber: '', expiry: '', brand: '' });
    } catch (err) {
      toast({ status: 'error', title: 'Failed to add method' });
    }
  }

  async function handleRemoveMethod(id) {
    try {
      await removePaymentMethod(id);
      setMethods(methods.filter((m) => m.id !== id));
      toast({ status: 'info', title: 'Payment method removed' });
    } catch (err) {
      toast({ status: 'error', title: 'Failed to remove method' });
    }
  }

  async function handleDownload(id) {
    try {
      const blob = await downloadInvoice(id);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice_${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      toast({ status: 'error', title: 'Failed to download invoice' });
    }
  }

  const adSpend = transactions.filter((t) => t.type === 'ad').reduce((s, t) => s + t.amount, 0);
  const budget = subscription?.adBudget || 0;
  const budgetUsed = budget > 0 ? (adSpend / budget) * 100 : 0;
  const filteredTransactions = transactions.filter(
    (tr) =>
      (filters.type === 'all' || tr.type === filters.type) &&
      (filters.search === '' || (tr.description || '').toLowerCase().includes(filters.search.toLowerCase()))
  );

  return (
    <ChakraProvider>
      <NavMenu />
      <Box className="billing-page" p={4}>
        <Heading mb={4}>Billing & Subscription</Heading>

        {subscription && (
          <Box className="subscription-panel" mb={8} p={4} borderWidth="1px" borderRadius="md">
            <Heading size="md" mb={4}>
              Manage Subscription
            </Heading>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4} align="center">
              <FormControl maxW="200px">
                <FormLabel>Plan</FormLabel>
                <Select
                  value={subscription.plan}
                  onChange={(e) => setSubscription({ ...subscription, plan: e.target.value })}
                >
                  <option value="Free">Free</option>
                  <option value="Pro">Pro</option>
                  <option value="Enterprise">Enterprise</option>
                </Select>
              </FormControl>
              <FormControl display="flex" alignItems="center" maxW="200px">
                <FormLabel htmlFor="autoRenew" mb="0">
                  Auto-Renewal
                </FormLabel>
                <Switch
                  id="autoRenew"
                  isChecked={subscription.autoRenew}
                  onChange={(e) => setSubscription({ ...subscription, autoRenew: e.target.checked })}
                />
              </FormControl>
              <Button colorScheme="teal" onClick={handleSubscriptionSave}>
                Save
              </Button>
            </Stack>
          </Box>
        )}

        <Box className="payment-methods" mb={8}>
          <Heading size="md" mb={2}>
            Payment Methods
          </Heading>
          {methods.map((m) => (
            <Box key={m.id} className="payment-method" p={3} borderWidth="1px" borderRadius="md" mb={2}>
              <Text>
                {m.brand} ending in {m.last4} (exp {m.expiry})
              </Text>
              <Button size="sm" mt={2} colorScheme="red" onClick={() => handleRemoveMethod(m.id)}>
                Remove
              </Button>
            </Box>
          ))}
          <Button colorScheme="teal" mt={2} onClick={onOpen}>
            Add Payment Method
          </Button>
        </Box>

        <Box className="budget-overview" mb={8} p={4} borderWidth="1px" borderRadius="md">
          <Heading size="md" mb={2}>
            Ad Budget Overview
          </Heading>
          <Text mb={2}>
            ${adSpend} spent of ${budget} budget
          </Text>
          <Progress value={budgetUsed} colorScheme="green" />
        </Box>

        <Box className="transaction-history" mb={8}>
          <Heading size="md" mb={2}>
            Transaction History
          </Heading>
          <Stack className="filters" direction={{ base: 'column', md: 'row' }} spacing={4} mb={4}>
            <FormControl maxW="200px">
              <FormLabel>Type</FormLabel>
              <Select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              >
                <option value="all">All</option>
                <option value="ad">ad</option>
                <option value="subscription">subscription</option>
              </Select>
            </FormControl>
            <FormControl maxW="300px">
              <FormLabel>Search</FormLabel>
              <Input
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                placeholder="Search description"
              />
            </FormControl>
          </Stack>
          <Table variant="striped" size="sm">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Type</Th>
                <Th>Description</Th>
                <Th isNumeric>Amount</Th>
                <Th>Invoice</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredTransactions.map((tr) => (
                <Tr key={tr.id}>
                  <Td>{new Date(tr.date).toLocaleDateString()}</Td>
                  <Td>{tr.type}</Td>
                  <Td>{tr.description || '-'}</Td>
                  <Td isNumeric>${tr.amount}</Td>
                  <Td>
                    <Button size="xs" onClick={() => handleDownload(tr.id)}>
                      Download
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Payment Method</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Card Brand</FormLabel>
              <Input
                value={newMethod.brand}
                onChange={(e) => setNewMethod({ ...newMethod, brand: e.target.value })}
                placeholder="Visa"
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Card Number</FormLabel>
              <Input
                value={newMethod.cardNumber}
                onChange={(e) => setNewMethod({ ...newMethod, cardNumber: e.target.value })}
                placeholder="1234 5678 9012 3456"
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Expiry</FormLabel>
              <Input
                value={newMethod.expiry}
                onChange={(e) => setNewMethod({ ...newMethod, expiry: e.target.value })}
                placeholder="MM/YY"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleAddMethod}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}
