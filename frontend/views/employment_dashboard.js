const { Box, Heading, SimpleGrid, Text, Spinner } = ChakraUI;
const { useEffect, useState } = React;

function EmploymentDashboard() {
  const [overview, setOverview] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [appStats, setAppStats] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const [ov, jobList, apps] = await Promise.all([
          employmentAPI.getOverview(),
          employmentAPI.getJobs(),
          employmentAPI.getApplications(),
        ]);
        setOverview(ov);
        setJobs(jobList);
        setAppStats(apps);
      } catch (err) {
        console.error('Failed to load employment dashboard', err);
      }
    }
    load();
  }, []);

  if (!overview) {
    return (
      <Box className="employment-dashboard" p={4}>
        <NavMenu />
        <Spinner />
      </Box>
    );
  }

  return (
    <Box className="employment-dashboard" p={4}>
      <NavMenu />
      <Heading size="lg" mb={4}>Employment Overview</Heading>
      <SimpleGrid columns={[1,2,3]} spacing={4} mb={8}>
        <Box className="stat-box" p={4} borderWidth="1px" borderRadius="md">
          <Text>Total Jobs: {overview.totalJobs}</Text>
        </Box>
        <Box className="stat-box" p={4} borderWidth="1px" borderRadius="md">
          <Text>Open Jobs: {overview.openJobs}</Text>
        </Box>
        <Box className="stat-box" p={4} borderWidth="1px" borderRadius="md">
          <Text>Closed Jobs: {overview.closedJobs}</Text>
        </Box>
        <Box className="stat-box" p={4} borderWidth="1px" borderRadius="md">
          <Text>Total Applications: {overview.totalApplications}</Text>
        </Box>
        <Box className="stat-box" p={4} borderWidth="1px" borderRadius="md">
          <Text>Hired Applications: {overview.hiredApplications}</Text>
        </Box>
      </SimpleGrid>
      {appStats && (
        <Box mb={8}>
          <Heading size="md" mb={2}>Applications by Status</Heading>
          <SimpleGrid columns={[1,2,3]} spacing={4}>
            {Object.entries(appStats.byStatus).map(([status, count]) => (
              <Box key={status} p={4} borderWidth="1px" borderRadius="md">
                <Text>{status}: {count}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      )}
      <Heading size="md" mb={2}>Jobs</Heading>
      <SimpleGrid columns={[1,2]} spacing={4}>
        {jobs.map(job => (
          <Box key={job.id} className="job-card" p={4} borderWidth="1px" borderRadius="md" bg="white">
            <Heading size="sm" mb={2}>{job.title}</Heading>
            <Text>Status: {job.status}</Text>
            <Text>Views: {job.views}</Text>
            <Text>Applications: {job.applications}</Text>
            <Text>Hires: {job.hires}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

window.EmploymentDashboard = EmploymentDashboard;
