import { useEffect, useState } from 'react';
import { Box, Stat, StatLabel, StatNumber } from '@chakra-ui/react';

/**
 * Displays a simple user count stat. Attempts to load data from
 * `/api/users/count` but falls back to zero if unavailable.
 */
export default function UserCountWidget() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch('/api/users/count')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setCount(data.count ?? 0))
      .catch(() => setCount(0));
  }, []);

  return (
    <Box mb={4}>
      <Stat>
        <StatLabel>Total Users</StatLabel>
        <StatNumber>{count}</StatNumber>
      </Stat>
    </Box>
  );
}
