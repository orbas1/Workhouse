const { Box, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Spinner, Text } = ChakraUI;
const { useEffect, useState } = React;

function NetworkingDashboard() {
  const [data, setData] = useState({ hosted: [], attending: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const result = await networkingAPI.getNetworkingDashboard();
        setData(result);
      } catch (err) {
        console.error('Failed to load networking data', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <Box className="networking-dashboard" p={4}>
      <NavMenu />
      <Heading mb={4}>Networking Dashboard</Heading>
      {loading ? (
        <Spinner />
      ) : (
        <Tabs variant="enclosed">
          <TabList>
            <Tab>Participant View</Tab>
            <Tab>Company View</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {data.attending.length === 0 && <Text>No sessions found.</Text>}
              {data.attending.map((s) => (
                <SessionCard key={s.id} session={s} />
              ))}
            </TabPanel>
            <TabPanel>
              {data.hosted.length === 0 && <Text>No hosted sessions.</Text>}
              {data.hosted.map((s) => (
                <SessionCard key={s.id} session={s} />
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </Box>
  );
}

window.NetworkingDashboard = NetworkingDashboard;
