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

const partners = [
  {
    id: 'bbx',
    name: 'BBX UK',
    logo: 'https://img.icons8.com/ios-filled/50/handshake.png'
  },
  {
    id: 'google',
    name: 'Google',
    logo: 'https://img.icons8.com/color/48/000000/google-logo.png'
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    logo: 'https://img.icons8.com/color/48/000000/microsoft.png'
  }
];

const badges = [
  {
    id: 'ssl',
    name: 'SSL Secured',
    image: 'https://img.icons8.com/ios-filled/50/lock.png'
  },
  {
    id: 'gdpr',
    name: 'GDPR Compliant',
    image: 'https://img.icons8.com/ios-filled/50/privacy.png'
  }
];

const testimonials = [
  {
    id: 't1',
    name: 'Jane Doe',
    quote: 'Workhouse helped me land my dream role.'
  },
  {
    id: 't2',
    name: 'John Smith',
    quote: 'The integrated tools keep my workflow simple.'
  },
  {
    id: 't3',
    name: 'Alex Johnson',
    quote: 'A must-have platform for any professional.'
  }
];

function listFeatures() {
  return features;
}

function listPartners() {
  return partners;
}

function listBadges() {
  return badges;
}

function listTestimonials() {
  return testimonials;
}

module.exports = { listFeatures, listPartners, listBadges, listTestimonials };
