const {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  FormControl,
  FormLabel,
  Text,
} = ChakraUI;
const { useState, useEffect } = React;

function ApplicationInterviewManagement() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [form, setForm] = useState({ applicationId: '', applicantId: '', interviewDate: '' });
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    async function loadApplications() {
      try {
        const res = await apiFetch('/api/applications/user');
        if (res.ok) {
          const data = await res.json();
          setApplications(data);
        }
      } catch (err) {
        console.error('Failed to load applications', err);
      }
    }
    async function loadInterviews() {
      try {
        const data = user?.role === 'employer'
          ? await interviewAPI.getEmployerInterviews()
          : await interviewAPI.getUserInterviews();
        setInterviews(data);
      } catch (err) {
        console.error('Failed to load interviews', err);
      }
    }
    async function loadTime() {
      try {
        const res = await fetch(`${window.env.WORLD_TIME_API}/ip`);
        const data = await res.json();
        setCurrentTime(data.datetime);
      } catch (err) {
        console.error('Failed to load time', err);
      }
    }
    loadApplications();
    loadInterviews();
    loadTime();
  }, [user]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSchedule(e) {
    e.preventDefault();
    try {
      await interviewAPI.scheduleInterview(form);
      setForm({ applicationId: '', applicantId: '', interviewDate: '' });
      const data = await interviewAPI.getEmployerInterviews();
      setInterviews(data);
    } catch (err) {
      console.error('Failed to schedule interview', err);
    }
  }

  return (
    <Box className="application-interview" p={4}>
      <NavMenu />
      <Heading size="lg" mb={4}>Applications & Interviews</Heading>
      {currentTime && (
        <Text mb={4}>Current time: {dateUtils.formatDateTime(currentTime)}</Text>
      )}
      <Tabs>
        <TabList>
          <Tab>Applications</Tab>
          <Tab>Interviews</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Job Title</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {applications.map(app => (
                  <Tr key={app.id}>
                    <Td>{app.jobTitle || app.opportunityId}</Td>
                    <Td>{app.status}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            {user?.role === 'employer' && (
              <Box as="form" mb={4} onSubmit={handleSchedule} className="schedule-form">
                <FormControl mb={2}>
                  <FormLabel>Application ID</FormLabel>
                  <Input name="applicationId" value={form.applicationId} onChange={handleChange} required />
                </FormControl>
                <FormControl mb={2}>
                  <FormLabel>Applicant ID</FormLabel>
                  <Input name="applicantId" value={form.applicantId} onChange={handleChange} required />
                </FormControl>
                <FormControl mb={2}>
                  <FormLabel>Interview Date</FormLabel>
                  <Input type="datetime-local" name="interviewDate" value={form.interviewDate} onChange={handleChange} required />
                </FormControl>
                <Button type="submit" colorScheme="teal">Schedule Interview</Button>
              </Box>
            )}
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Application</Th>
                  <Th>Date</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {interviews.map(inv => (
                  <Tr key={inv.id}>
                    <Td>{inv.applicationId}</Td>
                    <Td>{dateUtils.formatDateTime(inv.interviewDate)}</Td>
                    <Td>{inv.status}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

window.ApplicationInterviewManagement = ApplicationInterviewManagement;
