const { Box, Stat, StatLabel, StatNumber } = ChakraUI;
const { useState, useEffect } = React;

function UserCountWidget() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await apiFetch('/api/users/count');
        if (res.ok) {
          const data = await res.json();
          setCount(data.count);
        }
      } catch (err) {
        console.error('Failed to load user count', err);
      }
    }
    load();
  }, []);

  return (
    <Box className="user-count-widget" p={4} borderWidth="1px" borderRadius="md" bg="white">
      <Stat>
        <StatLabel>Total Users</StatLabel>
        <StatNumber>{count !== null ? count : '...'}</StatNumber>
      </Stat>
    </Box>
  );
}

window.UserCountWidget = UserCountWidget;
