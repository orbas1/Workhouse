import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { convertUsd } from '../utils/currency.js';
import '../styles/EarningsTracker.css';

function EarningsTracker({ amount }) {
  const [eur, setEur] = useState(null);
  useEffect(() => {
    async function load() {
      const val = await convertUsd(amount, 'EUR');
      setEur(val);
    }
    load();
  }, [amount]);
  return (
    <Box className="earnings-tracker" p={4} borderWidth="1px" borderRadius="md">
      <Text>USD: ${amount.toFixed(2)}</Text>
      {eur !== null && <Text>EUR: €{eur.toFixed(2)}</Text>}
    </Box>
  );
}

export default EarningsTracker;
