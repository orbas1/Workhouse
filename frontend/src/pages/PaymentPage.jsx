import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import PaymentForm from '../components/PaymentForm.jsx';
import '../styles/PaymentPage.css';

function PaymentPage() {
  return (
    <Box className="payment-page" p={4}>
      <Heading mb={4}>Payment</Heading>
      <PaymentForm />
    </Box>
  );
}

export default PaymentPage;
