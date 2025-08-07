import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider, Theme } from '@chakra-ui/react';
import { describe, it, expect, vi } from 'vitest';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import JobSearchBar from '../src/components/JobSearchBar.jsx';

describe('JobSearchBar', () => {
  it('calls onSearch with keyword and location', () => {
    const handleSearch = vi.fn();
    render(
      <ChakraProvider theme={Theme}>
      <ChakraProvider value={defaultSystem}>
        <JobSearchBar onSearch={handleSearch} />
      </ChakraProvider>
    );
    fireEvent.change(screen.getByPlaceholderText(/keyword/i), { target: { value: 'dev' } });
    fireEvent.change(screen.getByPlaceholderText(/location/i), { target: { value: 'NY' } });
    fireEvent.click(screen.getByText(/search/i));
    expect(handleSearch).toHaveBeenCalledWith({ keyword: 'dev', location: 'NY' });
  });
});
