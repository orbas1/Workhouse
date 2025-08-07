import React, { useEffect, useState } from 'react';
import { Box, Heading, SimpleGrid, Stat, StatLabel, StatNumber, Spinner, useToast } from '@chakra-ui/react';
import { fetchModelPerformance } from '../api/machineLearning.js';
import '../styles/ModelPerformancePage.css';

export default function ModelPerformancePage() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchModelPerformance('recommendation');
        setMetrics(data);
      } catch (err) {
        toast({ title: 'Failed to load model performance', status: 'error' });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [toast]);

  if (loading) return <Spinner />;
  if (!metrics) return <Box p={4}>No model performance available.</Box>;

  return (
    <Box className="model-performance-page" p={4}>
      <Heading mb={4}>Model Performance</Heading>
      <SimpleGrid columns={[1, 2, 4]} spacing={4}>
        <Stat>
          <StatLabel>Accuracy</StatLabel>
          <StatNumber>{metrics.accuracy}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Precision</StatLabel>
          <StatNumber>{metrics.precision}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Recall</StatLabel>
          <StatNumber>{metrics.recall}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>F1 Score</StatLabel>
          <StatNumber>{metrics.f1Score}</StatNumber>
        </Stat>
      </SimpleGrid>
    </Box>
  );
}
