import React from 'react';
import { ChakraProvider, Box, Heading } from '@chakra-ui/react';
import NavBar from '../components/NavBar.jsx';
import PaymentForm from '../components/PaymentForm.jsx';
import '../styles/PaymentPage.css';

function PaymentPage() {
  return (
    <ChakraProvider>
      <NavBar />
      <Box className="payment-page" p={4}>
        <Heading mb={4}>Payment</Heading>
        <PaymentForm />
      </Box>
    </ChakraProvider>
  );
}

export default PaymentPage;
