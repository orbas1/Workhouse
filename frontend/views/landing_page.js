const { Container, TextField, Button, Typography, Box, AppBar, Toolbar } = MaterialUI;
const { useState } = React;
const { useNavigate } = ReactRouterDOM;

function LandingPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handle(action) {
    setError('');
    const url = `/api/auth/${action}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Error');
      return;
    }
    if (action === 'login') {
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } else {
      alert('Registered! You can now log in.');
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Workhouse
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Workhouse
        </Typography>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          <Button variant="contained" onClick={() => handle('login')}>
            Login
          </Button>
          <Button variant="outlined" onClick={() => handle('register')}>
            Register
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

window.LandingPage = LandingPage;
