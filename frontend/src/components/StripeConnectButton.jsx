import React from 'react';
import { Button, Alert, AlertIcon } from '@chakra-ui/react';

const clientId = import.meta.env.VITE_STRIPE_CONNECT_CLIENT_ID;

export default function StripeConnectButton() {
  if (!clientId) {
    return (
      <Alert status="error" mb={4} borderRadius="md">
        <AlertIcon />Stripe Connect is not configured.
      </Alert>
    );
  }

  const handleConnect = () => {
    const redirect = encodeURIComponent(window.location.origin);
    const url = `https://connect.stripe.com/express/oauth/authorize?client_id=${clientId}&redirect_uri=${redirect}`;
    window.location.href = url;
  };

  return (
    <Button colorScheme="purple" onClick={handleConnect} mb={4}>
      Connect Stripe Wallet
    </Button>
  );
}
