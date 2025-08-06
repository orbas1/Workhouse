import React, { useEffect } from 'react';
import { Heading, Spinner } from '@chakra-ui/react';
import AffiliateStats from '../components/AffiliateStats.jsx';
import EarningsTracker from '../components/EarningsTracker.jsx';
import PayRateSection from '../components/PayRateSection.jsx';
import PayoutSection from '../components/PayoutSection.jsx';
import AffiliateLeaderboard from '../components/AffiliateLeaderboard.jsx';
import AffiliateCompetitions from '../components/AffiliateCompetitions.jsx';
import { useAffiliate } from '../context/AffiliateContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/AffiliateManagementPage.css';

function AffiliateManagementPage() {
  const { user } = useAuth();
  const { stats, payouts, leaderboard, competitions, rates, loadDashboard, loadLeaderboard } = useAffiliate();

  useEffect(() => {
    loadDashboard();
    loadLeaderboard();
  }, [loadDashboard, loadLeaderboard]);

  if (!stats) return <Spinner />;

  return (
    <div className="affiliate-management-page">
      <Heading mb={4}>Affiliate Dashboard</Heading>
      <AffiliateStats stats={{ referrals: stats.referrals, earnings: stats.earnings }} />
      <EarningsTracker amount={stats.earnings} />
      <PayRateSection rates={rates} />
      <PayoutSection affiliateId={user.id} payouts={payouts} onRefresh={loadDashboard} />
      <AffiliateLeaderboard data={leaderboard} />
      <AffiliateCompetitions competitions={competitions} />
    </div>
  );
}

export default AffiliateManagementPage;
