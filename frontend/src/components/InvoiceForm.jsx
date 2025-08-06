import React, { useState } from 'react';
import { Box, Input, Textarea, Button } from '@chakra-ui/react';
import '../styles/InvoiceForm.css';
import { Box, Input, Button } from '@chakra-ui/react';
import '../../styles/InvoiceForm.css';

export default function InvoiceForm({ onSubmit }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ amount: parseFloat(amount), description });
    setAmount('');
    setDescription('');
  };

  return (
    <Box as="form" className="invoice-form" onSubmit={handleSubmit} mt={4}>
      <Input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
        step="0.01"
        mb={2}
      />
      <Textarea
      <Input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        mb={2}
      />
      <Button type="submit" colorScheme="teal" size="sm">
        Submit Invoice
      </Button>
      <Button type="submit" colorScheme="teal">Submit Invoice</Button>
    </Box>
  );
}
