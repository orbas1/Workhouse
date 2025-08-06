import React, { useEffect, useState } from 'react';
import { Box, Heading, Spinner, Text } from '@chakra-ui/react';

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&current_weather=true');
        const data = await res.json();
        setWeather(data.current_weather);
      } catch (err) {
        console.error('Failed to load weather', err);
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, []);

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" bg="white">
      <Heading size="md" mb={2}>Weather</Heading>
      {loading ? (
        <Spinner />
      ) : weather ? (
        <>
          <Text>Temperature: {weather.temperature}°C</Text>
          <Text>Wind: {weather.windspeed} km/h</Text>
        </>
      ) : (
        <Text>Unable to load weather.</Text>
      )}
    </Box>
  );
}

