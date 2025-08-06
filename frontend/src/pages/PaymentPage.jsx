import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import PaymentForm from '../components/PaymentForm.jsx';
import '../styles/PaymentPage.css';

function PaymentPage() {
  const [params] = useSearchParams();
  const amount = params.get('amount') || '';
  return (
    <Box className="payment-page" p={4}>
      <Heading mb={4}>Payment</Heading>
      <PaymentForm defaultAmount={amount} />
    </Box>
  );
}

export default PaymentPage;
