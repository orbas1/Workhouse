import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import LiveFeedWidget from './LiveFeedWidget.jsx';
import * as api from '../api/liveFeed.js';

describe('LiveFeedWidget', () => {
  it('renders posts from the API', async () => {
    vi.spyOn(api, 'getPosts').mockResolvedValue([
      { id: 1, author: 'Alice', content: 'Hello' }
    ]);

    render(
      <ChakraProvider value={defaultSystem}>
        <LiveFeedWidget />
      </ChakraProvider>
    );

    expect(await screen.findByText(/Alice:/)).toBeInTheDocument();
  });
});
