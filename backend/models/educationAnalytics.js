const { randomUUID } = require('crypto');

const courses = new Map();
const userEngagements = new Map();

// Seed with some sample data for demonstration
(function seed() {
  if (courses.size > 0) return;
  const course1 = {
    id: randomUUID(),
    title: 'Intro to Analytics',
    enrollments: 200,
    completions: 150,
    averageScore: 87.5,
  };
  const course2 = {
    id: randomUUID(),
    title: 'Advanced Statistics',
    enrollments: 120,
    completions: 90,
    averageScore: 91.2,
  };
  courses.set(course1.id, course1);
  courses.set(course2.id, course2);

  const user1 = {
    id: randomUUID(),
    coursesCompleted: 4,
    averageScore: 89.3,
    timeSpent: 540,
  };
  const user2 = {
    id: randomUUID(),
    coursesCompleted: 2,
    averageScore: 76.4,
    timeSpent: 320,
  };
  userEngagements.set(user1.id, user1);
  userEngagements.set(user2.id, user2);
})();

function getCoursesOverview() {
  return Array.from(courses.values());
}

function getCourseById(courseId) {
  return courses.get(courseId);
}

function getUserEngagement(userId) {
  return userEngagements.get(userId);
}

module.exports = { getCoursesOverview, getCourseById, getUserEngagement };
