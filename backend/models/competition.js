const competitions = [
  {
    id: 'comp1',
    name: 'Starter Challenge',
    description: 'Refer 5 users to earn a $50 bonus',
    targetReferrals: 5,
    reward: 50,
    startDate: new Date(),
    endDate: null,
  },
];

function listCompetitions() {
  return competitions;
}

module.exports = {
  listCompetitions,
  competitions,
};
