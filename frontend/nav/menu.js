const { Flex, Heading, Spacer, Button } = ChakraUI;
const { useNavigate } = ReactRouterDOM;

function NavMenu() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <Flex className="nav-menu" bg="teal.500" color="white" p={4} align="center">
      <Heading size="md">Workhouse</Heading>
      <Spacer />
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/dashboard')}>Dashboard</Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/applications-interviews')}>Applications</Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/interview/1')}>Interview</Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/gigs/manage')}>Gigs</Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/gigs')}>Gigs</Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/jobs')}>Jobs</Button>
      <Button variant="ghost" color="white" mr={2} onClick={() => navigate('/orders')}>Orders</Button>
      <Button variant="outline" color="white" onClick={handleLogout}>Logout</Button>
    </Flex>
  );
}

window.NavMenu = NavMenu;
