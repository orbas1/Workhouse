const analytics = {
  1: {
    profileViews: 120,
    documentDownloads: 15,
    responseRate: 85,
    history: [
      { date: '2024-07-01', views: 20 },
      { date: '2024-07-02', views: 25 },
      { date: '2024-07-03', views: 30 },
      { date: '2024-07-04', views: 45 }
    ]
  }
};

function getAnalytics(userId) {
  if (!analytics[userId]) {
    analytics[userId] = {
      profileViews: 0,
      documentDownloads: 0,
      responseRate: 0,
      history: []
    };
  }
  return analytics[userId];
}

module.exports = { getAnalytics };
