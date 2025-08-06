import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  fetchAffiliate,
  fetchCommissionHistory,
  fetchCommissionRates,
  fetchPayoutHistory,
  fetchReferrals,
  fetchLeaderboard,
  fetchCompetitions,
  fetchNotifications,
} from '../api/affiliate.js';
import { useAuth } from './AuthContext.jsx';

const AffiliateContext = createContext();

export function AffiliateProvider({ children }) {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [payouts, setPayouts] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [rates, setRates] = useState({});

  const loadDashboard = useCallback(async () => {
    if (!user) return;
    const [affiliate, commissions, ratesData, payoutHist, refs, comps, notes] = await Promise.all([
      fetchAffiliate(user.id),
      fetchCommissionHistory(user.id),
      fetchCommissionRates(),
      fetchPayoutHistory(user.id),
      fetchReferrals(user.id),
      fetchCompetitions(user.id),
      fetchNotifications(user.id),
    ]);
    const earnings = commissions.reduce((sum, c) => sum + c.amount, 0);
    setStats({ affiliate, commissions, earnings, referrals: refs.length });
    setPayouts(payoutHist);
    setRates(ratesData);
    setCompetitions(comps);
    setNotifications(notes);
  }, [user]);

  const loadLeaderboard = useCallback(async () => {
    const data = await fetchLeaderboard();
    setLeaderboard(data);
  }, []);

  return (
    <AffiliateContext.Provider value={{ stats, payouts, leaderboard, competitions, notifications, rates, loadDashboard, loadLeaderboard }}>
      {children}
    </AffiliateContext.Provider>
  );
}

export function useAffiliate() {
  return useContext(AffiliateContext);
}
