import React from 'react';
import { SimpleGrid, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import '../styles/AffiliateStats.css';

function AffiliateStats({ stats }) {
  if (!stats) return null;
  const { clicks = 0, referrals = 0, conversions = 0, earnings = 0 } = stats;
  return (
    <SimpleGrid columns={[1, 2, 4]} spacing={4} className="affiliate-stats">
      <Stat><StatLabel>Clicks</StatLabel><StatNumber>{clicks}</StatNumber></Stat>
      <Stat><StatLabel>Referrals</StatLabel><StatNumber>{referrals}</StatNumber></Stat>
      <Stat><StatLabel>Conversions</StatLabel><StatNumber>{conversions}</StatNumber></Stat>
      <Stat><StatLabel>Earnings</StatLabel><StatNumber>${earnings.toFixed(2)}</StatNumber></Stat>
    </SimpleGrid>
  );
}

export default AffiliateStats;
