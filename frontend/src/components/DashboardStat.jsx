import React from 'react';
import { Card, Stat, StatLabel, StatNumber } from '@chakra-ui/react';

export default function DashboardStat({ label, value, prefix = '' }) {
  return (
    <Card>
      <Stat>
        <StatLabel>{label}</StatLabel>
        <StatNumber>
          {prefix}
          {value}
        </StatNumber>
      </Stat>
    </Card>
  );
}
