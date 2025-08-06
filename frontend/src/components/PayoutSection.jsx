import React, { useState } from 'react';
import { Box, Button, Input, VStack, Text } from '@chakra-ui/react';
import { initiatePayout } from '../api/affiliate.js';
import '../styles/PayoutSection.css';

function PayoutSection({ affiliateId, payouts, onRefresh }) {
  const [amount, setAmount] = useState('');

  async function handlePayout() {
    if (!amount) return;
    await initiatePayout(affiliateId, parseFloat(amount));
    setAmount('');
    onRefresh();
  }

  return (
    <Box className="payout-section" p={4} borderWidth="1px" borderRadius="md" mb={4}>
      <VStack align="stretch" spacing={3}>
        <Box>
          <Input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" type="number" />
          <Button mt={2} colorScheme="teal" onClick={handlePayout}>Request Payout</Button>
        </Box>
        <Box>
          <Text fontWeight="bold" mb={2}>Payout History</Text>
          {payouts.map(p => (
            <Text key={p.id}>${p.amount} - {p.status}</Text>
          ))}
        </Box>
      </VStack>
    </Box>
  );
}

export default PayoutSection;
