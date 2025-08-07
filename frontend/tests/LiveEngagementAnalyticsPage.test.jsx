import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import LiveEngagementAnalyticsPage from '../src/pages/LiveEngagementAnalyticsPage.jsx';

vi.mock('react-chartjs-2', () => ({ __esModule: true, Line: () => null }));
vi.mock('../src/api/startupAnalytics.js', () => ({
  fetchStartupAnalytics: () => Promise.resolve({
    profileViews: 10,
    documentDownloads: 2,
    responseRate: 50,
    history: []
  })
}));

describe('LiveEngagementAnalyticsPage', () => {
  it.skip('renders analytics stats', async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <LiveEngagementAnalyticsPage />
      </ChakraProvider>
    );
    await screen.findByText(/Live Engagement & Analytics/i);
    expect(screen.getByText(/Profile Views/i)).toBeInTheDocument();
  });
});
