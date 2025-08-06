import { useEffect, useState } from 'react';
import { ChakraProvider, Box, Heading, SimpleGrid, Stack, Spinner, useToast } from '@chakra-ui/react';
import NavMenu from '../components/NavMenu.jsx';
import AdCard from '../components/AdCard.jsx';
import AdPreferencesForm from '../components/AdPreferencesForm.jsx';
import { fetchAds, getAdPreferences } from '../api/ads.js';
import '../styles/SharedUserInteraction.css';

export default function SharedUserInteraction() {
  const [ads, setAds] = useState([]);
  const [prefs, setPrefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    async function load() {
      try {
        const [adsData, prefData] = await Promise.all([
          fetchAds(),
          getAdPreferences(),
        ]);
        setAds(adsData);
        setPrefs(prefData.preferences);
      } catch (err) {
        toast({ title: 'Failed to load ads', status: 'error' });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [toast]);

  if (loading) {
    return (
      <ChakraProvider>
        <NavMenu />
        <Box p={4}>
          <Spinner />
        </Box>
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider>
      <NavMenu />
      <Box className="shared-user-interaction" p={4}>
        <Heading mb={4}>Sponsored Content</Heading>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={4} align="flex-start">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} flex="1">
            {ads.map((ad) => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </SimpleGrid>
          <AdPreferencesForm initial={prefs} onSave={setPrefs} />
        </Stack>
      </Box>
    </ChakraProvider>
  );
}
