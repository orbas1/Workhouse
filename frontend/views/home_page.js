const { Container, Typography, Button, AppBar, Toolbar, Box } = MaterialUI;
const { useNavigate } = ReactRouterDOM;

function HomePage() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Workhouse
          </Typography>

          <Button color="inherit" onClick={() => navigate('/')}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Workhouse
        </Typography>
        <Typography variant="body1" gutterBottom>
          Manage your work efficiently with our platform.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')}> 
          Get Started
        </Button>
      </Container>
    </Box>
  );
}

window.HomePage = HomePage;
