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
    <div>
      <h2>Welcome to Workhouse</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <div>
        <button onClick={() => handle('login')}>Login</button>
        <button onClick={() => handle('register')}>Register</button>
      </div>
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  );
}

window.LandingPage = LandingPage;
