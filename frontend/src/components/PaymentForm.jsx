import React, { useState, useEffect } from 'react';
import { Box, Button, Input, Select, VStack, useToast } from '@chakra-ui/react';
import { initiatePayment } from '../api/payments.js';
import '../styles/PaymentForm.css';

export default function PaymentForm({ defaultAmount = '', onSuccess }) {
  const [amount, setAmount] = useState(defaultAmount);
  const [method, setMethod] = useState('card');
  const [transactionId, setTransactionId] = useState(null);
  const toast = useToast();

  useEffect(() => {
    setAmount(defaultAmount);
  }, [defaultAmount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await initiatePayment(parseFloat(amount), method);
      setTransactionId(data.id);
      toast({ title: 'Payment initiated', status: 'success' });
      if (onSuccess) onSuccess(data);
    } catch (err) {
      toast({ title: err.message || 'Payment failed', status: 'error' });
    }
  };

  return (
    <Box as="form" className="payment-form" onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <Input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          readOnly={Boolean(defaultAmount)}
        />
        <Select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="card">Card</option>
          <option value="bank">Bank Transfer</option>
        </Select>
        <Button type="submit" colorScheme="teal">
          Pay
        </Button>
      </VStack>
      {transactionId && (
        <Box mt={4} className="payment-result">
          Transaction ID: {transactionId}
        </Box>
      )}
    </Box>
  );
}
