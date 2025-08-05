const features = [
  {
    id: 'feature1',
    title: 'AI-Powered Matching',
    description: 'Connect with opportunities using intelligent algorithms.',
    icon: 'https://img.icons8.com/ios-filled/50/artificial-intelligence.png'
  },
  {
    id: 'feature2',
    title: 'Integrated Gig Management',
    description: 'Manage tasks, payments, and communication in one place.',
    icon: 'https://img.icons8.com/ios-filled/50/project-management.png'
  },
  {
    id: 'feature3',
    title: 'Real-Time Analytics',
    description: 'Track performance with live dashboards and insights.',
    icon: 'https://img.icons8.com/ios-filled/50/combo-chart.png'
  }
];

function listFeatures() {
  return features;
}

module.exports = { listFeatures };
