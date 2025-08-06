const { Flex, Heading, Spacer, Button } = ChakraUI;
const { useNavigate } = ReactRouterDOM;

function NavMenu() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <Flex className="nav-menu" bg="teal.500" color="white" p={4} align="center">
      <Heading size="md">Workhouse</Heading>
      <Spacer />
      {token ? (
        <>
          <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/dashboard')}>Dashboard</Button>
          <Button variant="outline" color="white" onClick={handleLogout}>Logout</Button>
        </>
      ) : (
        <>
          <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/login')}>Login</Button>
          <Button variant="outline" color="white" onClick={() => navigate('/signup')}>Sign Up</Button>
        </>
      )}
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/dashboard')}>
        Dashboard
      </Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/messages')}>
        Messages
      </Button>
      <Button variant="outline" color="white" onClick={handleLogout}>
        Logout
      </Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/dashboard')}>Dashboard</Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/headhunter/dashboard')}>Headhunter</Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/setup/financial-media')}>Setup</Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/onboarding/documents')}>Documents</Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/feed')}>Feed</Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/feed')}>Live Feed</Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/profile')}>Profile</Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/employment')}>Employment</Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/education/schedule')}>Schedule</Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/applications-interviews')}>Applications</Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/interview/1')}>Interview</Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/gigs/manage')}>Gigs</Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/gigs')}>Gigs</Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/calendar')}>Calendar</Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/gigs/search')}>Discover Gigs</Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/jobs')}>Jobs</Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/stats')}>Stats</Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/proposals-invoices')}>
        Proposals & Invoices
      </Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/orders')}>Orders</Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/contracts')}>Contracts</Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/classroom/WorkhouseClassroom')}>Classroom</Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/courses')}>Courses</Button>
      <Button variant="outline" color="white" onClick={handleLogout}>Logout</Button>
    </Flex>
  );
}

window.NavMenu = NavMenu;
