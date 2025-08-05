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
    </Flex>
  );
}

window.NavMenu = NavMenu;
